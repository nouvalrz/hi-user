import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../../../pages/NotFoundPage';

jest.mock('lucide-react', () => ({
  TriangleAlert: () => <div data-testid="triangle-alert-icon">Triangle Alert Icon</div>
}));

describe('NotFoundPage Component', () => {
  it('renders the not found message', () => {
    render(<NotFoundPage />);
    
    expect(screen.getByText('Ups, Resource not found')).toBeInTheDocument();
  });

  it('renders the triangle alert icon', () => {
    render(<NotFoundPage />);
    
    expect(screen.getByTestId('triangle-alert-icon')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(<NotFoundPage />);
    
    const container = screen.getByText('Ups, Resource not found').parentElement;
    expect(container).toHaveClass('flex', 'flex-col', 'items-center', 'gap-4', 'dark:text-gray-200');
    
    const mainContainer = container.parentElement;
    expect(mainContainer).toHaveClass('min-h-screen', 'flex', 'justify-center', 'items-center');
  });
}); 