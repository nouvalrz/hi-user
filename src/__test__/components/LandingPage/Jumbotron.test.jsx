import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Jumbotron from '@/components/LandingPage/Jumbotron';

jest.mock('@/components/Button', () => {
  return function MockButton({ children, variant, onClick, className }) {
    return (
      <button 
        data-testid="button"
        data-variant={variant}
        onClick={onClick}
        className={className}
      >
        {children}
      </button>
    );
  };
});

jest.mock('lucide-react', () => ({
  Zap: () => <div data-testid="zap-icon">Zap Icon</div>
}));

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

const renderJumbotron = () => {
  return render(
    <BrowserRouter>
      <Jumbotron />
    </BrowserRouter>
  );
};

describe('Jumbotron Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the jumbotron section with correct heading and description', () => {
    renderJumbotron();
    
    expect(screen.getByText('Create for Fast')).toBeInTheDocument();
    expect(screen.getByTestId('zap-icon')).toBeInTheDocument();
    
    expect(screen.getByText(/One tool to/)).toBeInTheDocument();
    expect(screen.getByText(/manage/)).toBeInTheDocument();
    expect(screen.getByText(/contracts and your team/)).toBeInTheDocument();
    
    expect(screen.getByText(/Clause helps legal teams work faster/)).toBeInTheDocument();
  });

  it('renders both buttons with correct variants', () => {
    renderJumbotron();
    
    const buttons = screen.getAllByTestId('button');
    expect(buttons).toHaveLength(2);
    
    expect(buttons[0]).toHaveAttribute('data-variant', 'primary');
    expect(buttons[0]).toHaveTextContent('Start for Free');
    
    expect(buttons[1]).toHaveAttribute('data-variant', 'secondary');
    expect(buttons[1]).toHaveTextContent('Get a Demo');
    expect(buttons[1]).toHaveClass('bg-white!');
  });

  it('navigates to register page when clicking "Start for Free" button', () => {
    renderJumbotron();
    
    const startButton = screen.getByText('Start for Free');
    fireEvent.click(startButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });

  it('applies correct styling classes', () => {
    renderJumbotron();
    
    const container = screen.getByText('Create for Fast').closest('div').parentElement;
    expect(container).toHaveClass(
      'bg-sky-50',
      'py-36',
      'flex',
      'flex-col',
      'items-center',
      'px-4'
    );
    
    const badge = screen.getByText('Create for Fast').closest('div');
    expect(badge).toHaveClass(
      'flex',
      'items-center',
      'gap-2',
      'px-3',
      'py-1',
      'bg-white',
      'border',
      'border-gray-200',
      'rounded-full',
      'text-sm'
    );
    
    const heading = screen.getByText(/One tool to/);
    expect(heading).toHaveClass(
      'text-center',
      'whitespace-pre-line',
      'text-4xl',
      'font-medium',
      'md:text-5xl',
      'leading-12',
      'md:leading-14',
      'lg:leading-16',
      'text-sky-950',
      'mt-2'
    );
  });
}); 