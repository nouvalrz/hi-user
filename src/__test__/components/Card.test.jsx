import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../../components/Card';

describe('Card Component', () => {
  const defaultProps = {
    children: <div>Card Content</div>,
    className: 'custom-class',
    onClick: jest.fn()
  };

  beforeEach(() => {
    defaultProps.onClick.mockClear();
  });

  it('renders children content', () => {
    render(<Card {...defaultProps} />);
    
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Card {...defaultProps} />);
    
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('custom-class');
  });

  it('calls onClick when clicked', () => {
    render(<Card {...defaultProps} />);
    
    const card = screen.getByTestId('card');
    fireEvent.click(card);
    
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('renders with default styling classes', () => {
    render(<Card {...defaultProps} />);
    
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('rounded-lg');
    expect(card).toHaveClass('shadow');
    expect(card).toHaveClass('bg-white');
    expect(card).toHaveClass('dark:bg-gray-800');
    expect(card).toHaveClass('dark:text-gray-300');
    expect(card).toHaveClass('dark:border-gray-600');
  });

  it('renders without onClick handler', () => {
    const { onClick, ...propsWithoutOnClick } = defaultProps;
    render(<Card {...propsWithoutOnClick} />);
    
    const card = screen.getByTestId('card');
    fireEvent.click(card);
  });
}); 