import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../../components/Pagination';

describe('Pagination Component', () => {
  const defaultProps = {
    count: 5,
    current: 1,
    onPageChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correct number of page items', () => {
    render(<Pagination {...defaultProps} />);
    
    const pageItems = screen.getAllByRole('button');
    // 5 page numbers + prev + next buttons
    expect(pageItems).toHaveLength(7);
  });

  it('renders prev and next buttons', () => {
    render(<Pagination {...defaultProps} />);
    
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('renders page numbers correctly', () => {
    render(<Pagination {...defaultProps} />);
    
    for (let i = 1; i <= defaultProps.count; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('highlights current page', () => {
    render(<Pagination {...defaultProps} current={3} />);
    
    const currentPage = screen.getByText('3');
    expect(currentPage).toHaveClass('border');
    expect(currentPage).toHaveClass('border-gray-200');
  });

  it('calls onPageChange when clicking a page number', () => {
    render(<Pagination {...defaultProps} />);
    
    const page2 = screen.getByText('2');
    fireEvent.click(page2);
    
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when clicking prev button', () => {
    render(<Pagination {...defaultProps} current={2} />);
    
    const prevButton = screen.getByText('Prev');
    fireEvent.click(prevButton);
    
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange when clicking next button', () => {
    render(<Pagination {...defaultProps} />);
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('does not call onPageChange when clicking prev on first page', () => {
    render(<Pagination {...defaultProps} current={1} />);
    
    const prevButton = screen.getByText('Prev');
    fireEvent.click(prevButton);
    
    expect(defaultProps.onPageChange).not.toHaveBeenCalled();
  });

  it('does not call onPageChange when clicking next on last page', () => {
    render(<Pagination {...defaultProps} current={5} />);
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    expect(defaultProps.onPageChange).not.toHaveBeenCalled();
  });

  it('renders with correct container styling', () => {
    render(<Pagination {...defaultProps} />);
    
    const container = screen.getByTestId('pagination');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('flex-row');
    expect(container).toHaveClass('gap-2');
  });

  it('renders prev/next buttons with correct styling', () => {
    render(<Pagination {...defaultProps} />);
    
    const prevButton = screen.getByText('Prev');
    const nextButton = screen.getByText('Next');
    
    expect(prevButton).toHaveClass('px-3');
    expect(nextButton).toHaveClass('px-3');
  });

  it('renders chevron icons', () => {
    render(<Pagination {...defaultProps} />);
    
    const chevrons = screen.getAllByTestId('chevron-icon');
    expect(chevrons).toHaveLength(2);
    expect(chevrons[0]).toHaveClass('size-5');
    expect(chevrons[1]).toHaveClass('size-5');
  });
}); 