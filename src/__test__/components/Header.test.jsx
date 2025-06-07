import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Header from '../../components/Header';
import { ThemeContext } from '../../contexts/ThemeContext';

jest.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    handleLogout: jest.fn()
  })
}));

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate
}));

jest.mock('../../components/ToggleThemeButton', () => {
  return function MockToggleThemeButton() {
    return <button>Toggle Theme</button>;
  };
});

describe('Header Component', () => {
  const mockThemeContext = {
    theme: 'light',
    toggleTheme: jest.fn()
  };

  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <ThemeContext.Provider value={mockThemeContext}>
          <Header />
        </ThemeContext.Provider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    mockNavigate.mockClear();
    mockThemeContext.toggleTheme.mockClear();
  });

  it('renders the header with correct title', () => {
    renderHeader();
    
    expect(screen.getByText('Hi Employee 👋')).toBeInTheDocument();
  });

  it('navigates to employees page when title is clicked', () => {
    renderHeader();
    
    const title = screen.getByText('Hi Employee 👋');
    fireEvent.click(title);
    
    expect(mockNavigate).toHaveBeenCalledWith('/employees');
  });

  it('renders the logout button', () => {
    renderHeader();
    
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
  });

  it('renders the theme toggle button', () => {
    renderHeader();
    
    const themeButton = screen.getByText('Toggle Theme');
    expect(themeButton).toBeInTheDocument();
  });

  it('renders with correct styling classes', () => {
    renderHeader();
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('p-3');
    expect(header).toHaveClass('border-b');
    expect(header).toHaveClass('border-gray-200');
    expect(header).toHaveClass('dark:border-gray-600');
    expect(header).toHaveClass('backdrop-blur');
    expect(header).toHaveClass('bg-white/30');
    expect(header).toHaveClass('dark:bg-white/5');
    expect(header).toHaveClass('flex');
    expect(header).toHaveClass('flex-row');
    expect(header).toHaveClass('justify-between');
    expect(header).toHaveClass('items-center');
    expect(header).toHaveClass('fixed');
    expect(header).toHaveClass('top-0');
    expect(header).toHaveClass('w-full');
    expect(header).toHaveClass('z-50');
    expect(header).toHaveClass('dark:text-gray-200');
  });

  it('renders the title with correct styling', () => {
    renderHeader();
    
    const title = screen.getByText('Hi Employee 👋');
    expect(title).toHaveClass('text-base');
    expect(title).toHaveClass('font-medium');
    expect(title).toHaveClass('cursor-pointer');
  });

  it('renders the logout button with correct styling', () => {
    renderHeader();
    
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toHaveClass('flex');
    expect(logoutButton).toHaveClass('items-center');
  });

  it('renders the logout icon', () => {
    renderHeader();
    
    const logoutIcon = screen.getByTestId('logout-icon');
    expect(logoutIcon).toBeInTheDocument();
    expect(logoutIcon).toHaveClass('size-4');
    expect(logoutIcon).toHaveClass('mr-1');
  });
}); 