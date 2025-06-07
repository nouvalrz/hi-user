import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToggleThemeButton from '../../components/ToggleThemeButton';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

jest.mock('lucide-react', () => ({
  Sun: () => <div data-testid="sun-icon" />,
  Moon: () => <div data-testid="moon-icon" />,
}));

describe('ToggleThemeButton Component', () => {
  const mockToggleTheme = jest.fn();
  
  const renderWithTheme = (theme = 'light') => {
    return render(
      <ThemeContext.Provider value={{ theme, toggleTheme: mockToggleTheme }}>
        <ToggleThemeButton />
      </ThemeContext.Provider>
    );
  };

  beforeEach(() => {
    mockToggleTheme.mockClear();
  });

  it('renders sun icon when theme is light', () => {
    renderWithTheme('light');
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument();
  });

  it('renders moon icon when theme is dark', () => {
    renderWithTheme('dark');
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument();
  });

  it('calls toggleTheme when clicked', () => {
    renderWithTheme('light');
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    render(
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme: mockToggleTheme }}>
        <ToggleThemeButton className={customClass} />
      </ThemeContext.Provider>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(customClass);
  });

  it('renders button with ghost variant styling', () => {
    renderWithTheme('light');
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-transparent');
    expect(button).toHaveClass('hover:bg-gray-200');
    expect(button).toHaveClass('dark:hover:text-gray-700');
  });
}); 