import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserItem from '../../components/UserItem';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  useNavigate: () => mockNavigate
}));

jest.mock('motion/react', () => ({
  motion: {
    div: ({ children, layout, exit, transition, ...props }) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    )
  },
  AnimatePresence: ({ children }) => <>{children}</>
}));

describe('UserItem Component', () => {
  const mockUser = {
    id: 1,
    email: 'john.doe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    avatar: 'https://example.com/avatar.jpg',
    role: 'Software Engineer',
    employment_type: 'Full-time',
    join_date: '2024-01-01',
    phone: '+1234567890'
  };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders user information correctly', () => {
    render(<UserItem user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Full-time')).toBeInTheDocument();
    expect(screen.getByText('1 Jan 2024')).toBeInTheDocument();
  });

  it('renders user avatar with provided image', () => {
    render(<UserItem user={mockUser} />);
    
    const avatar = screen.getByAltText('profile');
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('renders fallback avatar when no image provided', () => {
    const userWithoutAvatar = { ...mockUser, avatar: null };
    render(<UserItem user={userWithoutAvatar} />);
    
    const avatar = screen.getByAltText('profile');
    expect(avatar).toHaveAttribute('src', 'https://ui-avatars.com/api/?name=John+Doe');
  });

  it('navigates to user detail page when name is clicked', () => {
    render(<UserItem user={mockUser} />);
    
    const nameElement = screen.getByText('John Doe');
    fireEvent.click(nameElement);
    
    expect(mockNavigate).toHaveBeenCalledWith('/employees/1');
  });

  it('renders contact buttons with correct links', () => {
    render(<UserItem user={mockUser} />);
    
    const links = screen.getAllByRole('link');
    const phoneLink = links.find(link => link.href.includes('wa.me'));
    const emailLink = links.find(link => link.href.includes('mailto:'));
    
    expect(phoneLink).toHaveAttribute('href', 'https://wa.me/1234567890');
    expect(emailLink).toHaveAttribute('href', 'mailto:john.doe@example.com');
  });

  it('renders with correct styling classes', () => {
    render(<UserItem user={mockUser} />);
    
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('border-gray-200');
    expect(card).toHaveClass('p-5');
    expect(card).toHaveClass('flex');
    expect(card).toHaveClass('flex-col');
    expect(card).toHaveClass('items-center');
  });

  it('renders avatar with correct styling', () => {
    render(<UserItem user={mockUser} />);
    
    const avatar = screen.getByAltText('profile');
    expect(avatar).toHaveClass('w-24');
    expect(avatar).toHaveClass('h-24');
    expect(avatar).toHaveClass('object-cover');
    expect(avatar).toHaveClass('rounded-full');
  });

  it('renders name with correct styling', () => {
    render(<UserItem user={mockUser} />);
    
    const name = screen.getByText('John Doe');
    expect(name).toHaveClass('font-medium');
    expect(name).toHaveClass('mt-1');
    expect(name).toHaveClass('text-lg');
    expect(name).toHaveClass('hover:text-sky-600');
    expect(name).toHaveClass('cursor-pointer');
    expect(name).toHaveClass('hover:font-semibold');
  });

  it('renders role badge with correct styling', () => {
    render(<UserItem user={mockUser} />);
    
    const role = screen.getByText('Software Engineer');
    expect(role).toHaveClass('text-xs');
    expect(role).toHaveClass('bg-gray-100');
    expect(role).toHaveClass('px-3');
    expect(role).toHaveClass('py-1');
    expect(role).toHaveClass('rounded-full');
    expect(role).toHaveClass('my-1');
    expect(role).toHaveClass('dark:bg-gray-700');
  });

  it('renders contact buttons with correct styling', () => {
    render(<UserItem user={mockUser} />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('rounded-full');
    });
  });
}); 