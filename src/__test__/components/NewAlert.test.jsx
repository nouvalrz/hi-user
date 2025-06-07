import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewAlert from '../../components/NewAlert';
import { AlertContext, AlertType } from '../../contexts/AlertContext';

jest.mock('motion/react', () => ({
  AnimatePresence: ({ children }) => <div>{children}</div>,
  motion: {
    div: ({ children, className, layout, ...props }) => (
      <div className={className} {...props}>{children}</div>
    ),
  },
}));

describe('NewAlert Component', () => {
  const mockAlerts = [
    {
      id: 1,
      type: AlertType.success,
      title: 'Success Title',
      message: 'Success message',
    },
    {
      id: 2,
      type: AlertType.error,
      title: 'Error Title',
      message: 'Error message',
    },
    {
      id: 3,
      type: AlertType.info,
      title: 'Info Title',
      message: 'Info message',
    },
  ];

  const mockClose = jest.fn();

  const renderWithContext = (alerts = mockAlerts) => {
    return render(
      <AlertContext.Provider value={{ alerts, close: mockClose }}>
        <NewAlert />
      </AlertContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all alerts', () => {
    renderWithContext();
    
    expect(screen.getByText('Success Title')).toBeInTheDocument();
    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Error Title')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByText('Info Title')).toBeInTheDocument();
    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  it('renders success alert with correct styling', () => {
    renderWithContext([mockAlerts[0]]);
    
    const alert = screen.getByText('Success Title').closest('[class*="bg-green-600"]');
    expect(alert).toBeInTheDocument();
    expect(alert.className).toContain('text-white!');
  });

  it('renders error alert with correct styling', () => {
    renderWithContext([mockAlerts[1]]);
    
    const alert = screen.getByText('Error Title').closest('[class*="bg-red-600"]');
    expect(alert).toBeInTheDocument();
    expect(alert.className).toContain('text-white!');
  });

  it('renders info alert with correct styling', () => {
    renderWithContext([mockAlerts[2]]);
    
    const alert = screen.getByText('Info Title').closest('[class*="bg-white"]');
    expect(alert).toBeInTheDocument();
    expect(alert.className).toContain('text-gray-800!');
  });

  it('calls close function when close button is clicked', () => {
    renderWithContext([mockAlerts[0]]);
    
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    
    expect(mockClose).toHaveBeenCalledWith(1);
  });

  it('renders correct icons for each alert type', () => {
    renderWithContext();
    
    expect(screen.getByTestId('circle-check-big')).toBeInTheDocument();
    expect(screen.getByTestId('triangle-alert')).toBeInTheDocument();
    expect(screen.getByTestId('info')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(
      <AlertContext.Provider value={{ alerts: mockAlerts, close: mockClose }}>
        <NewAlert className={customClass} />
      </AlertContext.Provider>
    );
    
    const alert = screen.getByText('Success Title').closest('.custom-class');
    expect(alert).toBeInTheDocument();
  });

  it('renders with correct container styling', () => {
    renderWithContext();
    
    const container = screen.getByText('Success Title').closest('.fixed');
    expect(container).toHaveClass('bottom-5');
    expect(container).toHaveClass('right-5');
    expect(container).toHaveClass('w-[400px]');
    expect(container).toHaveClass('z-[100]');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('flex-col');
    expect(container).toHaveClass('gap-2');
  });
}); 