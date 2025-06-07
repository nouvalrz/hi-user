import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import EditUserPage from '../../../../pages/Users/EditUserPage';
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
      id: '1',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      avatar: '',
      phone: '',
      nationality: '',
      dob: '1990-01-01',
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
    customValidate: jest.fn().mockReturnValue({}),
  }));
});

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => jest.fn(),
  useParams: () => ({ id: '1' }),
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

const mockGetUserById = jest.fn();
const mockUpdateUser = jest.fn();
const mockUserDetail = {
  id: '1',
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  avatar: '',
  phone: '',
  nationality: '',
  dob: '1990-01-01',
  role: '',
  employment_type: '',
  join_date: '',
  working_start: '',
  working_end: '',
  supervisor_name: '',
  salary_per_month: '',
};

const renderEditUserPage = () => {
  return render(
    <BrowserRouter>
      <UsersContext.Provider value={{
        getUserById: mockGetUserById,
        updateUser: mockUpdateUser,
        loading: { getUserById: false },
        userDetail: mockUserDetail,
      }}>
        <EditUserPage />
      </UsersContext.Provider>
    </BrowserRouter>
  );
};

describe('EditUserPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    render(
      <BrowserRouter>
        <UsersContext.Provider value={{
          getUserById: mockGetUserById,
          updateUser: mockUpdateUser,
          loading: { getUserById: true },
          userDetail: mockUserDetail,
        }}>
          <EditUserPage />
        </UsersContext.Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the page title and description', () => {
    renderEditUserPage();
    
    expect(screen.getByText('Edit Employee')).toBeInTheDocument();
    expect(screen.getByText('Edit employee data')).toBeInTheDocument();
  });

  it('renders breadcrumbs', () => {
    renderEditUserPage();
    
    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
  });

  it('renders step indicators', () => {
    renderEditUserPage();
    
    expect(screen.getByText('1. Basic Information')).toBeInTheDocument();
    expect(screen.getByText('2. Work Details')).toBeInTheDocument();
  });

  it('shows step 1 form initially', () => {
    renderEditUserPage();
    
    expect(screen.getByText('1. Basic Information')).toHaveClass('border-sky-500');
    expect(screen.getByText('2. Work Details')).not.toHaveClass('border-sky-500');
    expect(screen.getByTestId('form-step-1')).toBeInTheDocument();
  });

  it('calls getUserById on initial render', () => {
    renderEditUserPage();
    expect(mockGetUserById).toHaveBeenCalledWith('1');
  });

  it('handles form submission', async () => {
    renderEditUserPage();
    
    const form = screen.getByTestId('form-step-1').closest('form');
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        id: '1',
        userUpdate: expect.any(Object)
      });
    });
  });

  it('validates form before moving to next step', () => {
    const useFormMock = require('../../../../hooks/useForm');
    useFormMock.mockImplementation(() => ({
      values: mockUserDetail,
      errors: {},
      handleChange: jest.fn(),
      handleSubmit: (fn) => (e) => {
        e.preventDefault();
        fn();
      },
      customValidate: jest.fn().mockReturnValue({ first_name: 'Required' }),
    }));

    renderEditUserPage();
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    expect(screen.getByText('1. Basic Information')).toHaveClass('border-sky-500');
    expect(screen.getByTestId('form-step-1')).toBeInTheDocument();
  });

  it('allows going back to previous step', async () => {
    const useFormMock = require('../../../../hooks/useForm');
    useFormMock.mockImplementation(() => ({
      values: mockUserDetail,
      errors: {},
      handleChange: jest.fn(),
      handleSubmit: (fn) => (e) => {
        e.preventDefault();
        fn();
      },
      customValidate: jest.fn().mockReturnValue({}), 
    }));

    renderEditUserPage();
    

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    

    await waitFor(() => {
      expect(screen.getByTestId('form-step-2')).toBeInTheDocument();
    }, { timeout: 3000 });
    

    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);
    
    expect(screen.getByText('1. Basic Information')).toHaveClass('border-sky-500');
    expect(screen.getByTestId('form-step-1')).toBeInTheDocument();
  });
}); 