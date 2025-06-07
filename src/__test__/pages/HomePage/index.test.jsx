import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import HomePage from '../../../pages/HomePage';
import { UsersContext } from '../../../contexts/UsersContext';

jest.mock('../../../constants', () => ({
  API_KEY: 'mock-api-key',
  API_URL: 'mock-api-url'
}));

jest.mock('../../../components/Pagination', () => {
  return function MockPagination({ count, current, onPageChange }) {
    return (
      <div data-testid="pagination">
        <button onClick={() => onPageChange(current - 1)}>Previous</button>
        <span>Page {current} of {count}</span>
        <button onClick={() => onPageChange(current + 1)}>Next</button>
      </div>
    );
  };
});

jest.mock('../../../components/UserItem', () => {
  return function MockUserItem({ user }) {
    return (
      <div data-testid="user-item">
        {user.first_name} {user.last_name}
      </div>
    );
  };
});

jest.mock('../../../components/UserItemPlaceholder', () => {
  return function MockUserItemPlaceholder() {
    return <div data-testid="user-item-placeholder">Loading...</div>;
  };
});

jest.mock('../../../components/Search', () => {
  return function MockSearch({ onSearchChange }) {
    return (
      <input
        data-testid="search-input"
        type="text"
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name ..."
      />
    );
  };
});

jest.mock('../../../components/EmptyDataPlaceholder', () => {
  return function MockEmptyDataPlaceholder() {
    return <div data-testid="empty-data">No data found</div>;
  };
});

jest.mock('../../../components/Button', () => {
  return function MockButton({ children, onClick }) {
    return (
      <button data-testid="button" onClick={onClick}>
        {children}
      </button>
    );
  };
});

// Mock react-router
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => jest.fn(),
  useSearchParams: () => [
    new URLSearchParams('page=1'),
    jest.fn()
  ],
}));

// Mock motion
jest.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }) => <>{children}</>
}));

const mockUsers = {
  data: [
    { id: 1, first_name: 'John', last_name: 'Doe' },
    { id: 2, first_name: 'Jane', last_name: 'Smith' },
    { id: 3, first_name: 'Bob', last_name: 'Johnson' },
  ],
  total_pages: 3
};

const mockGetUsers = jest.fn();

const renderHomePage = (loading = { getUsers: false }) => {
  return render(
    <BrowserRouter>
      <UsersContext.Provider value={{
        loading,
        getUsers: mockGetUsers,
        users: mockUsers
      }}>
        <HomePage />
      </UsersContext.Provider>
    </BrowserRouter>
  );
};

describe('HomePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders welcome message and description', () => {
    renderHomePage();
    
    expect(screen.getByText('Welcome to Hi Employee👋')).toBeInTheDocument();
    expect(screen.getByText('Manage all of employees in one app')).toBeInTheDocument();
  });

  it('renders search input and add employee button', () => {
    renderHomePage();
    
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('button')).toBeInTheDocument();
    expect(screen.getByText('Add Employee')).toBeInTheDocument();
  });

  it('renders pagination component', () => {
    renderHomePage();
    
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('renders user items when data is loaded', () => {
    renderHomePage();
    
    expect(screen.getAllByTestId('user-item')).toHaveLength(3);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('renders loading placeholders when loading', () => {
    renderHomePage({ getUsers: true });
    
    expect(screen.getAllByTestId('user-item-placeholder')).toHaveLength(6);
  });

  it('filters users based on search input', async () => {
    renderHomePage();
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'John Doe' } });
    
    await waitFor(() => {
      const userItems = screen.getAllByTestId('user-item');
      expect(userItems).toHaveLength(1);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });


  it('calls getUsers on initial render', () => {
    renderHomePage();
    expect(mockGetUsers).toHaveBeenCalledWith(1);
  });

  it('handles page change', () => {
    renderHomePage();
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    expect(mockGetUsers).toHaveBeenCalledWith(2);
  });
}); 