import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../../components/Search';

describe('Search Component', () => {
  const defaultProps = {
    onSearchChange: jest.fn(),
    placeholder: 'Search...',
    className: 'custom-class'
  };

  beforeEach(() => {
    defaultProps.onSearchChange.mockClear();
  });

  it('renders search input with placeholder', () => {
    render(<Search {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
  });

  it('calls onSearchChange when input value changes', () => {
    render(<Search {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test search' } });
    
    expect(defaultProps.onSearchChange).toHaveBeenCalledWith('test search');
  });

  it('renders search icon', () => {
    render(<Search {...defaultProps} />);
    
    const searchIcon = screen.getByTestId('search-icon');
    expect(searchIcon).toBeInTheDocument();
  });

  it('applies custom className to container', () => {
    render(<Search {...defaultProps} />);
    
    const container = screen.getByTestId('search-container');
    expect(container).toHaveClass('custom-class');
  });

  it('renders input with correct styling classes', () => {
    render(<Search {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveClass('border');
    expect(input).toHaveClass('border-gray-300');
    expect(input).toHaveClass('dark:border-gray-500');
    expect(input).toHaveClass('rounded-full');
    expect(input).toHaveClass('pl-12');
    expect(input).toHaveClass('pr-3');
    expect(input).toHaveClass('py-2');
    expect(input).toHaveClass('focus:outline-sky-600');
    expect(input).toHaveClass('w-full');
    expect(input).toHaveClass('text-gray-700');
    expect(input).toHaveClass('text-sm');
    expect(input).toHaveClass('dark:text-white');
  });

  it('renders search icon with correct styling', () => {
    render(<Search {...defaultProps} />);
    
    const searchIcon = screen.getByTestId('search-icon');
    expect(searchIcon).toHaveClass('size-5');
    expect(searchIcon).toHaveClass('text-gray-500');
  });
}); 