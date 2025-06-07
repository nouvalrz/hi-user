import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import LandingPageNavbar from '@/components/LandingPage/LandingPageNavbar';

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
  KeyRound: () => <div data-testid="key-icon">Key Icon</div>,
  DoorClosed: () => <div data-testid="door-icon">Door Icon</div>
}));

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <LandingPageNavbar />
    </BrowserRouter>
  );
};

describe('LandingPageNavbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders the navbar with correct content when not logged in', () => {
    renderNavbar();
    
    expect(screen.getByText('Hi Employee 👋')).toBeInTheDocument();
    
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    
    const buttons = screen.getAllByTestId('button');
    expect(buttons).toHaveLength(2);
    
    expect(buttons[0]).toHaveAttribute('data-variant', 'primary');
    expect(buttons[0]).toHaveTextContent('Login');
    expect(screen.getByTestId('key-icon')).toBeInTheDocument();
    
    expect(buttons[1]).toHaveAttribute('data-variant', 'secondary');
    expect(buttons[1]).toHaveTextContent('Register');
    expect(buttons[1]).toHaveClass('bg-white!');
  });

  it('renders the navbar with dashboard button when logged in', () => {
    localStorage.setItem('token', 'dummy-token');
    
    renderNavbar();
    
    const buttons = screen.getAllByTestId('button');
    expect(buttons).toHaveLength(1);
    
    expect(buttons[0]).toHaveAttribute('data-variant', 'primary');
    expect(buttons[0]).toHaveTextContent('Dashboard');
    expect(screen.getByTestId('door-icon')).toBeInTheDocument();
  });

  it('navigates to login page when clicking login button', () => {
    renderNavbar();
    
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('navigates to register page when clicking register button', () => {
    renderNavbar();
    
    const registerButton = screen.getByText('Register');
    fireEvent.click(registerButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });

  it('navigates to employees page when clicking dashboard button', () => {
    localStorage.setItem('token', 'dummy-token');
    
    renderNavbar();
    
    const dashboardButton = screen.getByText('Dashboard');
    fireEvent.click(dashboardButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/employees');
  });

  it('applies correct styling classes', () => {
    renderNavbar();
    
    const container = screen.getByText('Hi Employee 👋').closest('div').parentElement;
    expect(container).toHaveClass(
      'bg-sky-50',
      'border-b',
      'border-sky-100',
      'px-5',
      'py-3',
      'fixed',
      'top-0',
      'left-0',
      'w-full',
      'flex',
      'justify-between',
      'items-center'
    );
    
    const navLinks = screen.getByText('Features').closest('div');
    expect(navLinks).toHaveClass('flex', 'gap-8');
    
    const buttonsContainer = screen.getByText('Login').closest('div');
    expect(buttonsContainer).toHaveClass('flex', 'gap-3');
  });
}); 