import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import AddUserPage from '../../../../pages/Users/AddUserPage';
import { UsersContext } from '../../../../contexts/UsersContext';

jest.mock('../../../../components/Breadcrumbs', () => {
  return function MockBreadcrumbs() {
    return <div data-testid="breadcrumbs">Breadcrumbs</div>;
  };
});

jest.mock('../../../../components/Input', () => {
  return function MockInput({ name, placeholder, onChange, value, errorMessage }) {
    return (
      <div>
        <input
          data-testid={`input-${name}`}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        {errorMessage && <span data-testid={`error-${name}`}>{errorMessage}</span>}
      </div>
    );
  };
});

jest.mock('../../../../components/Dropdown', () => {
  return function MockDropdown({ name, placeholder, onChange, value, errorMessage, options }) {
    return (
      <div>
        <select
          data-testid={`dropdown-${name}`}
          name={name}
          onChange={onChange}
          value={value}
        >
          <option value="">{placeholder}</option>
          {options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errorMessage && <span data-testid={`error-${name}`}>{errorMessage}</span>}
      </div>
    );
  };
});

jest.mock('../../../../components/Button', () => {
  return function MockButton({ children, onClick, type, disabled }) {
    return (
      <button
        data-testid="button"
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    );
  };
});

jest.mock('../../../../hooks/useForm', () => {
  return jest.fn(() => ({
    values: {
      first_name: '',
      last_name: '',
      email: '',
      avatar: '',
      phone: '',
      nationality: '',
      dob: '',
      role: '',
      employment_type: '',
      join_date: '',
      working_start: '',
      working_end: '',
      supervisor_name: '',
      salary_per_month: '',
    },
    errors: {
      first_name: '',
      last_name: '',
      email: '',
      avatar: '',
      phone: '',
      nationality: '',
      dob: '',
      role: '',
      employment_type: '',
      join_date: '',
      working_start: '',
      working_end: '',
      supervisor_name: '',
      salary_per_month: '',
    },
    handleChange: jest.fn(),
    handleSubmit: (fn) => (e) => {
      e.preventDefault();
      fn();
    },
    customValidate: jest.fn().mockReturnValue({ first_name: 'Required' }),
  }));
});

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => jest.fn(),
}));

jest.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }) => <>{children}</>
}));

jest.mock('../../../../pages/Users/FormStep1', () => ({
  FormStep1: ({ form, handleNextStep }) => (
    <div data-testid="form-step-1">
      <button onClick={handleNextStep}>Next</button>
    </div>
  ),
}));

jest.mock('../../../../pages/Users/FormStep2', () => ({
  FormStep2: ({ form, handlePreviousStep }) => (
    <div data-testid="form-step-2">
      <button onClick={handlePreviousStep}>Previous</button>
    </div>
  ),
}));

const mockAddUser = jest.fn();
const mockGetUsers = jest.fn();
const mockNavigate = jest.fn();

const renderAddUserPage = () => {
  return render(
    <BrowserRouter>
      <UsersContext.Provider value={{
        addUser: mockAddUser,
        getUsers: mockGetUsers,
      }}>
        <AddUserPage />
      </UsersContext.Provider>
    </BrowserRouter>
  );
};

describe('AddUserPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page title and description', () => {
    renderAddUserPage();
    
    expect(screen.getByText('Add Employee')).toBeInTheDocument();
    expect(screen.getByText('Create a new contract for employee')).toBeInTheDocument();
  });

  it('renders breadcrumbs', () => {
    renderAddUserPage();
    
    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
  });

  it('renders step indicators', () => {
    renderAddUserPage();
    
    expect(screen.getByText('1. Basic Information')).toBeInTheDocument();
    expect(screen.getByText('2. Work Details')).toBeInTheDocument();
  });

  it('shows step 1 form initially', () => {
    renderAddUserPage();
    
    expect(screen.getByText('1. Basic Information')).toHaveClass('border-sky-500');
    expect(screen.getByText('2. Work Details')).not.toHaveClass('border-sky-500');
    expect(screen.getByTestId('form-step-1')).toBeInTheDocument();
  });

  it('calls getUsers on initial render', () => {
    renderAddUserPage();
    expect(mockGetUsers).toHaveBeenCalledWith(1);
  });

  it('handles form submission', async () => {
    renderAddUserPage();
    
    const form = screen.getByTestId('form-step-1').closest('form');
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(mockAddUser).toHaveBeenCalled();
    });
  });

  it('validates form before moving to next step', () => {
    renderAddUserPage();
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    expect(screen.getByText('1. Basic Information')).toHaveClass('border-sky-500');
    expect(screen.getByTestId('form-step-1')).toBeInTheDocument();
  });

  it('allows going back to previous step', async () => {
    const useFormMock = require('../../../../hooks/useForm');
    useFormMock.mockImplementation(() => ({
      values: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        avatar: '',
        phone: '',
        nationality: '',
        dob: '',
        role: '',
        employment_type: '',
        join_date: '',
        working_start: '',
        working_end: '',
        supervisor_name: '',
        salary_per_month: '',
      },
      errors: {},
      handleChange: jest.fn(),
      handleSubmit: (fn) => (e) => {
        e.preventDefault();
        fn();
      },
      customValidate: jest.fn().mockReturnValue({}),
    }));

    renderAddUserPage();
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('form-step-2')).toBeInTheDocument();
    });
    
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);
    
    expect(screen.getByText('1. Basic Information')).toHaveClass('border-sky-500');
    expect(screen.getByTestId('form-step-1')).toBeInTheDocument();
  });
}); 