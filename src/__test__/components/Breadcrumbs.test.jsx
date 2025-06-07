import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import Breadcrumbs from '@/components/Breadcrumbs';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

describe('Breadcrumbs Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const renderWithRouter = (initialPath) => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="*" element={<Breadcrumbs />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders breadcrumbs for simple path', () => {
    renderWithRouter('/users');
    
    expect(screen.getByText('users')).toBeInTheDocument();
    expect(screen.getByText('users').tagName).toBe('P');
  });

  it('renders breadcrumbs for nested path', () => {
    renderWithRouter('/users/profile');
    
    expect(screen.getByText('users')).toBeInTheDocument();
    expect(screen.getByText('profile')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'users' })).toHaveAttribute('href', '/users');
  });

  it('renders numeric segments as "Detail #N"', () => {
    renderWithRouter('/users/123');
    
    expect(screen.getByText('users')).toBeInTheDocument();
    expect(screen.getByText('Detail #123')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'users' })).toHaveAttribute('href', '/users');
  });

  it('handles back button click', () => {
    renderWithRouter('/users');
    
    const backButton = screen.getByRole('button');
    fireEvent.click(backButton);
    
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('renders last segment without link', () => {
    renderWithRouter('/users/profile/settings');
    
    const lastSegment = screen.getByText('settings');
    expect(lastSegment).toBeInTheDocument();
    expect(lastSegment.tagName).toBe('P');
  });

  it('renders separators between segments', () => {
    renderWithRouter('/users/profile');
    
    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(1);
  });
}); 