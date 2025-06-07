import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer Component', () => {
  it('renders footer with correct content', () => {
    render(<Footer />);
    
    expect(screen.getByText('Created by Nouval Rizky')).toBeInTheDocument();
    
    expect(screen.getByText('2025')).toBeInTheDocument();
  });

  it('renders footer with correct styling classes', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    
    expect(footer).toHaveClass('bg-sky-600');
    expect(footer).toHaveClass('text-white');
    expect(footer).toHaveClass('dark:bg-sky-700');
  });

  it('renders footer with correct layout classes', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    
    expect(footer).toHaveClass('flex');
    expect(footer).toHaveClass('flex-col');
    expect(footer).toHaveClass('justify-center');
    expect(footer).toHaveClass('items-center');
  });

  it('renders text with correct font classes', () => {
    render(<Footer />);
    
    const authorText = screen.getByText('Created by Nouval Rizky');
    expect(authorText).toHaveClass('text-sm');
    expect(authorText).toHaveClass('font-medium');
    
    const yearText = screen.getByText('2025');
    expect(yearText).toHaveClass('text-sm');
    expect(yearText).toHaveClass('font-light');
  });
}); 