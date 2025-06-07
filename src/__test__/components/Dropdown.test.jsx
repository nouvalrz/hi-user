import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '../../components/Dropdown';

describe('Dropdown Component', () => {
  const defaultProps = {
    options: [
      { value: '1', name: 'Option 1' },
      { value: '2', name: 'Option 2' },
      { value: '3', name: 'Option 3' }
    ],
    placeholder: 'Select an option',
    label: 'Test Label',
    onSelectedChange: jest.fn(),
    className: 'custom-class',
    value: '',
    name: 'test-dropdown',
    errorMessage: ''
  };

  beforeEach(() => {
    defaultProps.onSelectedChange.mockClear();
  });

  it('renders label when provided', () => {
    render(<Dropdown {...defaultProps} />);
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('does not render label when not provided', () => {
    const { label, ...propsWithoutLabel } = defaultProps;
    render(<Dropdown {...propsWithoutLabel} />);
    
    expect(screen.queryByText('Test Label')).not.toBeInTheDocument();
  });

  it('renders placeholder option', () => {
    render(<Dropdown {...defaultProps} />);
    
    const placeholder = screen.getByText('Select an option');
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toBeDisabled();
  });

  it('renders all options', () => {
    render(<Dropdown {...defaultProps} />);
    
    defaultProps.options.forEach(option => {
      expect(screen.getByText(option.name)).toBeInTheDocument();
    });
  });

  it('calls onSelectedChange when selection changes', () => {
    render(<Dropdown {...defaultProps} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '2' } });
    
    expect(defaultProps.onSelectedChange).toHaveBeenCalledTimes(1);
  });

  it('renders error message when provided', () => {
    const errorMessage = 'This field is required';
    render(<Dropdown {...defaultProps} errorMessage={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('does not render error message when not provided', () => {
    render(<Dropdown {...defaultProps} />);
    
    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Dropdown {...defaultProps} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('custom-class');
  });

  it('renders with default styling classes', () => {
    render(<Dropdown {...defaultProps} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('mt-1');
    expect(select).toHaveClass('w-full');
    expect(select).toHaveClass('py-2');
    expect(select).toHaveClass('px-3');
    expect(select).toHaveClass('rounded');
    expect(select).toHaveClass('shadow-2xs');
    expect(select).toHaveClass('border');
    expect(select).toHaveClass('border-gray-300');
    expect(select).toHaveClass('focus:outline-sky-600');
    expect(select).toHaveClass('text-sm');
    expect(select).toHaveClass('dark:bg-transparent');
    expect(select).toHaveClass('dark:border-gray-500');
  });

  it('renders label with correct styling', () => {
    render(<Dropdown {...defaultProps} />);
    
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('text-sm');
    expect(label).toHaveClass('text-gray-600');
  });

  it('renders error message with correct styling', () => {
    const errorMessage = 'This field is required';
    render(<Dropdown {...defaultProps} errorMessage={errorMessage} />);
    
    const error = screen.getByText(errorMessage);
    expect(error).toHaveClass('text-xs');
    expect(error).toHaveClass('mt-1');
    expect(error).toHaveClass('text-red-600');
  });
}); 