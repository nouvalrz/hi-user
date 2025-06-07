import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../components/Input';

describe('Input Component', () => {
  const defaultProps = {
    name: 'test-input',
    placeholder: 'Enter text',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input with default props', () => {
    render(<Input {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', 'test-input');
  });

  it('renders label when provided', () => {
    const label = 'Test Label';
    render(<Input {...defaultProps} label={label} />);
    
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(label)).toHaveAttribute('for');
  });

  it('does not render label when not provided', () => {
    render(<Input {...defaultProps} />);
    
    const label = screen.queryByRole('label');
    expect(label).not.toBeInTheDocument();
  });

  it('renders error message when provided', () => {
    const errorMessage = 'This field is required';
    render(<Input {...defaultProps} errorMessage={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toHaveClass('text-red-600');
  });

  it('does not render error message when not provided', () => {
    render(<Input {...defaultProps} />);
    
    const errorMessage = screen.queryByText(/error/i);
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    render(<Input {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Enter text');
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when input loses focus', () => {
    render(<Input {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Enter text');
    fireEvent.blur(input);
    
    expect(defaultProps.onBlur).toHaveBeenCalledTimes(1);
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    render(<Input {...defaultProps} className={customClass} />);
    
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveClass(customClass);
  });

  it('renders with default styling classes', () => {
    render(<Input {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveClass('mt-1');
    expect(input).toHaveClass('w-full');
    expect(input).toHaveClass('py-2');
    expect(input).toHaveClass('px-3');
    expect(input).toHaveClass('rounded');
    expect(input).toHaveClass('shadow-2xs');
    expect(input).toHaveClass('border');
    expect(input).toHaveClass('border-gray-300');
    expect(input).toHaveClass('focus:outline-sky-600');
    expect(input).toHaveClass('text-sm');
    expect(input).toHaveClass('dark:bg-transparent');
    expect(input).toHaveClass('dark:border-gray-500');
  });

  it('renders label with correct styling', () => {
    render(<Input {...defaultProps} label="Test Label" />);
    
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('text-sm');
    expect(label).toHaveClass('text-gray-600');
  });

  it('renders with different input type', () => {
    render(<Input {...defaultProps} type="email" />);
    
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveAttribute('type', 'email');
  });
}); 