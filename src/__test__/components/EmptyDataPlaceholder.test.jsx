import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyDataPlaceholder from '../../components/EmptyDataPlaceholder';

describe('EmptyDataPlaceholder Component', () => {
  it('renders the placeholder message', () => {
    render(<EmptyDataPlaceholder />);
    
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('renders the Info icon', () => {
    render(<EmptyDataPlaceholder />);
    
    const icon = screen.getByTestId('info-icon');
    expect(icon).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    render(<EmptyDataPlaceholder className={customClass} />);
    
    const container = screen.getByTestId('empty-placeholder');
    expect(container).toHaveClass(customClass);
  });

  it('renders with default styling classes', () => {
    render(<EmptyDataPlaceholder />);
    
    const container = screen.getByTestId('empty-placeholder');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('flex-col');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('justify-center');
    expect(container).toHaveClass('w-full');
    expect(container).toHaveClass('flex-1');
    expect(container).toHaveClass('text-gray-600');
  });

  it('renders message with correct styling', () => {
    render(<EmptyDataPlaceholder />);
    
    const message = screen.getByText('No users found');
    expect(message).toHaveClass('text-sm');
    expect(message).toHaveClass('text-gray-600');
    expect(message).toHaveClass('mt-1');
    expect(message).toHaveClass('dark:text-gray-400');
  });
});