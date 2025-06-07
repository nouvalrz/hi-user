import React from 'react';
import { render, screen } from '@testing-library/react';
import GuestRoute from '../../components/GuestRoute';
import { Navigate, Outlet } from 'react-router';

// Mock react-router components
jest.mock('react-router', () => ({
  Navigate: jest.fn(({ to }) => <div data-testid="navigate" data-to={to} />),
  Outlet: jest.fn(() => <div data-testid="outlet" />),
}));

describe('GuestRoute Component', () => {
  const mockChildren = <div data-testid="children">Test Children</div>;

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders children when user is not authenticated', () => {
    render(<GuestRoute>{mockChildren}</GuestRoute>);
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('renders Outlet when no children provided and user is not authenticated', () => {
    render(<GuestRoute />);
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  it('redirects to home when user is authenticated', () => {
    localStorage.setItem('token', 'fake-token');
    
    render(<GuestRoute>{mockChildren}</GuestRoute>);
    
    const navigate = screen.getByTestId('navigate');
    expect(navigate).toBeInTheDocument();
    expect(navigate).toHaveAttribute('data-to', '/');
  });

  it('redirects to home when user is authenticated and no children provided', () => {
    localStorage.setItem('token', 'fake-token');
    
    render(<GuestRoute />);
    
    const navigate = screen.getByTestId('navigate');
    expect(navigate).toBeInTheDocument();
    expect(navigate).toHaveAttribute('data-to', '/');
  });

  it('does not render children when user is authenticated', () => {
    localStorage.setItem('token', 'fake-token');
    
    render(<GuestRoute>{mockChildren}</GuestRoute>);
    
    expect(screen.queryByTestId('children')).not.toBeInTheDocument();
  });

  it('does not render Outlet when user is authenticated', () => {
    localStorage.setItem('token', 'fake-token');
    
    render(<GuestRoute />);
    
    expect(screen.queryByTestId('outlet')).not.toBeInTheDocument();
  });
}); 