import React from 'react';
import { render, screen } from '@testing-library/react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { Navigate, Outlet } from 'react-router';

jest.mock('react-router', () => ({
  Navigate: jest.fn(({ to }) => <div data-testid="navigate" data-to={to} />),
  Outlet: jest.fn(() => <div data-testid="outlet" />),
}));

describe('ProtectedRoute Component', () => {
  const mockChildren = <div data-testid="children">Test Children</div>;

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders children when user is authenticated', () => {
    localStorage.setItem('token', 'fake-token');
    
    render(<ProtectedRoute>{mockChildren}</ProtectedRoute>);
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('renders Outlet when no children provided and user is authenticated', () => {
    localStorage.setItem('token', 'fake-token');
    
    render(<ProtectedRoute />);
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  it('redirects to login when user is not authenticated', () => {
    render(<ProtectedRoute>{mockChildren}</ProtectedRoute>);
    
    const navigate = screen.getByTestId('navigate');
    expect(navigate).toBeInTheDocument();
    expect(navigate).toHaveAttribute('data-to', '/login');
  });

  it('redirects to login when user is not authenticated and no children provided', () => {
    render(<ProtectedRoute />);
    
    const navigate = screen.getByTestId('navigate');
    expect(navigate).toBeInTheDocument();
    expect(navigate).toHaveAttribute('data-to', '/login');
  });

  it('does not render children when user is not authenticated', () => {
    render(<ProtectedRoute>{mockChildren}</ProtectedRoute>);
    
    expect(screen.queryByTestId('children')).not.toBeInTheDocument();
  });

  it('does not render Outlet when user is not authenticated', () => {
    render(<ProtectedRoute />);
    
    expect(screen.queryByTestId('outlet')).not.toBeInTheDocument();
  });

  it('handles empty token string', () => {
    localStorage.setItem('token', '');
    
    render(<ProtectedRoute>{mockChildren}</ProtectedRoute>);
    
    const navigate = screen.getByTestId('navigate');
    expect(navigate).toBeInTheDocument();
    expect(navigate).toHaveAttribute('data-to', '/login');
  });

  it('handles undefined token', () => {
    render(<ProtectedRoute>{mockChildren}</ProtectedRoute>);
    
    const navigate = screen.getByTestId('navigate');
    expect(navigate).toBeInTheDocument();
    expect(navigate).toHaveAttribute('data-to', '/login');
  });

  it('handles invalid token', () => {
    localStorage.setItem('token', 'invalid-token');
    localStorage.removeItem('token');
    
    render(<ProtectedRoute>{mockChildren}</ProtectedRoute>);
    
    const navigate = screen.getByTestId('navigate');
    expect(navigate).toBeInTheDocument();
    expect(navigate).toHaveAttribute('data-to', '/login');
  });
}); 