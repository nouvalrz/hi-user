import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginationItem from '../../components/PaginationItem';

describe('PaginationItem Component', () => {
  const defaultProps = {
    children: '1',
    onClick: jest.fn(),
    active: false,
    className: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children correctly', () => {
    render(<PaginationItem {...defaultProps} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<PaginationItem {...defaultProps} className={customClass} />);
    const button = screen.getByText('1');
    expect(button).toHaveClass(customClass);
  });

  it('calls onClick when clicked', () => {
    render(<PaginationItem {...defaultProps} />);
    const button = screen.getByText('1');
    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('applies active styling when active prop is true', () => {
    render(<PaginationItem {...defaultProps} active={true} />);
    const button = screen.getByText('1');
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('border-gray-200');
  });

  it('does not apply active styling when active prop is false', () => {
    render(<PaginationItem {...defaultProps} active={false} />);
    const button = screen.getByText('1');
    expect(button).not.toHaveClass('border');
    expect(button).not.toHaveClass('border-gray-200');
  });

  it('renders with default styling classes', () => {
    render(<PaginationItem {...defaultProps} />);
    const button = screen.getByText('1');
    expect(button).toHaveClass('min-h-[36px]');
    expect(button).toHaveClass('min-w-[36px]');
    expect(button).toHaveClass('rounded');
    expect(button).toHaveClass('cursor-pointer');
    expect(button).toHaveClass('text-sm');
    expect(button).toHaveClass('flex');
    expect(button).toHaveClass('flex-row');
    expect(button).toHaveClass('gap-1');
    expect(button).toHaveClass('items-center');
    expect(button).toHaveClass('justify-center');
  });

  it('renders with dark mode classes', () => {
    render(<PaginationItem {...defaultProps} />);
    const button = screen.getByText('1');
    expect(button).toHaveClass('dark:hover:bg-gray-700');
    expect(button).toHaveClass('dark:text-gray-300');
  });

  it('renders with dark mode active styling', () => {
    render(<PaginationItem {...defaultProps} active={true} />);
    const button = screen.getByText('1');
    expect(button).toHaveClass('dark:border-gray-500');
  });
}); 