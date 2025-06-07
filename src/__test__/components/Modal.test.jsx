import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../../components/Modal';

jest.mock('motion/react', () => ({
  motion: {
    div: ({ children, className, onClick, ...props }) => (
      <div className={className} onClick={onClick} {...props}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

describe('Modal Component', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    title: 'Test Modal',
    isOpen: true,
    onClose: mockOnClose,
    children: <div>Modal Content</div>,
  };

  beforeEach(() => {
    mockOnClose.mockClear();
    document.body.style.overflow = '';
  });

  it('renders modal when isOpen is true', () => {
    render(<Modal {...defaultProps} />);
    
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render modal when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls onClose when clicking close button', () => {
    render(<Modal {...defaultProps} />);
    
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking overlay', () => {
    render(<Modal {...defaultProps} />);
    
    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking modal content', () => {
    render(<Modal {...defaultProps} />);
    
    const modalContent = screen.getByTestId('modal-content');
    fireEvent.click(modalContent);
    
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('sets body overflow to hidden when modal is open', () => {
    render(<Modal {...defaultProps} />);
    
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('resets body overflow when modal is closed', () => {
    const { rerender } = render(<Modal {...defaultProps} />);
    
    expect(document.body.style.overflow).toBe('hidden');
    
    rerender(<Modal {...defaultProps} isOpen={false} />);
    expect(document.body.style.overflow).toBe('');
  });

  it('renders with correct styling classes', () => {
    render(<Modal {...defaultProps} />);
    
    const modal = screen.getByTestId('modal-container');
    expect(modal).toHaveClass('fixed');
    expect(modal).toHaveClass('inset-0');
    expect(modal).toHaveClass('z-[500]');
    expect(modal).toHaveClass('flex');
    expect(modal).toHaveClass('items-center');
    expect(modal).toHaveClass('justify-center');
  });

  it('renders title with correct styling', () => {
    render(<Modal {...defaultProps} />);
    
    const title = screen.getByText('Test Modal');
    expect(title).toHaveClass('text-sm');
    expect(title).toHaveClass('font-medium');
  });
}); 