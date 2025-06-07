import React from 'react';
import { render, screen } from '@testing-library/react';
import Features from '@/components/LandingPage/Features';

jest.mock('@/components/Button', () => {
  return function MockButton({ children, className }) {
    return (
      <button className={className} data-testid="button">
        {children}
      </button>
    );
  };
});

jest.mock('lucide-react', () => ({
  Layers: () => <div data-testid="layers-icon">Layers Icon</div>
}));

describe('Features Component', () => {
  it('renders the features section with correct heading and description', () => {
    render(<Features />);
    
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByTestId('layers-icon')).toBeInTheDocument();
    
    expect(screen.getByText('Latest advance technologies to ensure everything you needs')).toBeInTheDocument();
    

    expect(screen.getByText(/Maximize your team's productivity and security with our affordable/)).toBeInTheDocument();
  });

  it('renders the dynamic dashboard section', () => {
    render(<Features />);
    
    expect(screen.getByText('Dynamic Dashboard')).toBeInTheDocument();
    expect(screen.getByText(/Hi Employee helps legal teams work faster/)).toBeInTheDocument();
    expect(screen.getByTestId('button')).toHaveTextContent('Explore All');
    
    const dashboardImage = screen.getByAltText('Dashboard');
    expect(dashboardImage).toBeInTheDocument();
    expect(dashboardImage).toHaveAttribute('src', './dashboard.webp');
  });

  it('renders the activity tracker section', () => {
    render(<Features />);
    
    expect(screen.getByText('Activity Tracker')).toBeInTheDocument();
    expect(screen.getByText(/Hi Employee empowers legal teams to stay informed/)).toBeInTheDocument();
    
    const activityImage = screen.getByAltText('Activity Tracker');
    expect(activityImage).toBeInTheDocument();
    expect(activityImage).toHaveAttribute('src', './key-selling1.webp');
  });

  it('renders the biodata management section', () => {
    render(<Features />);
    
    expect(screen.getByText('Biodata Management')).toBeInTheDocument();
    expect(screen.getByText(/Hi Employee simplifies the management of employee/)).toBeInTheDocument();
    
    const biodataImage = screen.getByAltText('Biodata Management');
    expect(biodataImage).toBeInTheDocument();
    expect(biodataImage).toHaveAttribute('src', './key-selling2.webp');
  });

  it('applies correct styling classes', () => {
    render(<Features />);
    
    const container = screen.getByText('Features').closest('div').parentElement;
    expect(container).toHaveClass('container', 'mx-auto', 'px-4', 'py-24');
    
    const featuresBadge = screen.getByText('Features').closest('div');
    expect(featuresBadge).toHaveClass('flex', 'items-center', 'gap-2', 'px-3', 'py-1', 'bg-white', 'border', 'border-gray-200', 'rounded-full', 'text-sm');
    
    const dashboardSection = screen.getByText('Dynamic Dashboard').closest('div').parentElement;
    expect(dashboardSection).toHaveClass('bg-sky-50', 'p-6', 'md:p-8', 'lg:p-10', 'w-full', 'rounded-lg', 'flex', 'md:flex-row', 'flex-col', 'justify-between', 'gap-8', 'md:gap-18', 'border', 'border-sky-100');
  });
}); 