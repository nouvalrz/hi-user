import React from 'react';
import { render, screen } from '@testing-library/react';
import UserDetail from '../../components/UserDetail';

describe('UserDetail Component', () => {
  const mockUser = {
    email: 'john.doe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    avatar: 'https://example.com/avatar.jpg'
  };

  it('renders user information correctly', () => {
    render(<UserDetail user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('renders user avatar with correct attributes', () => {
    render(<UserDetail user={mockUser} />);
    
    const avatar = screen.getByAltText('profile');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('renders with correct container styling', () => {
    render(<UserDetail user={mockUser} />);
    
    const container = screen.getByTestId('user-detail');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('flex-col');
    expect(container).toHaveClass('items-center');
  });

  it('renders avatar with correct styling', () => {
    render(<UserDetail user={mockUser} />);
    
    const avatar = screen.getByAltText('profile');
    expect(avatar).toHaveClass('rounded-full');
    expect(avatar).toHaveClass('w-62');
  });

  it('renders name with correct styling', () => {
    render(<UserDetail user={mockUser} />);
    
    const name = screen.getByText('John Doe');
    expect(name).toHaveClass('text-base');
    expect(name).toHaveClass('font-medium');
    expect(name).toHaveClass('mt-4');
    expect(name).toHaveClass('dark:text-gray-300');
  });

  it('renders email with correct styling', () => {
    render(<UserDetail user={mockUser} />);
    
    const email = screen.getByText('john.doe@example.com');
    expect(email).toHaveClass('text-sm');
    expect(email).toHaveClass('text-gray-500');
  });
}); 