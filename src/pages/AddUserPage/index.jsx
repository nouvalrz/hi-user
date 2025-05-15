import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Input from "../../components/Input";
import { useFetchData } from "../../hooks/useFetchData";
import Dropdown from "../../components/Dropdown";
import { employmentTypes, roles } from "../../utils/populateUsers";
import useForm from "../../hooks/useForm";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import Button from "../../components/Button";
import { useContext } from "react";
import { UsersContext } from "../../contexts/UsersContext";
import { User } from "lucide-react";
import { useNavigate } from "react-router";

const userInitialValues = {
  first_name: "",
  last_name: "",
  email: "",
  avatar: "",
  phone: "",
  nationality: "",
  dob: "",
  role: "",
  employment_type: "",
  join_date: "",
  working_start: "",
  working_end: "",
  supervisor_name: "",
  salary_per_month: "",
};

const formValidationStep1 = (values) => {
  const errors = {};

  if (!values.first_name.trim()) {
    errors.first_name = "First name is required";
  }

  if (!values.last_name.trim()) {
    errors.last_name = "Last name is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
    errors.email = "Invalid email format";
  }

  if (
    values.avatar &&
    !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(values.avatar)
  ) {
    errors.avatar = "Avatar must be a valid image URL";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\+?\d{9,15}$/.test(values.phone)) {
    errors.phone = "Phone number must be 9-15 digits and may start with +";
  }

  if (!values.nationality.trim()) {
    errors.nationality = "Nationality is required";
  }

  if (!values.dob.trim()) {
    errors.dob = "Date of birth is required";
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.dob)) {
    errors.dob = "Date of birth must be in YYYY-MM-DD format";
  }

  return errors;
};

const formValidationStep2 = (values) => {
  const errors = {};

  if (!values.role.trim()) {
    errors.role = "Role is required";
  }

  if (!values.employment_type.trim()) {
    errors.employment_type = "Employment type is required";
  }

  if (!values.join_date.trim()) {
    errors.join_date = "Join date is required";
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.join_date)) {
    errors.join_date = "Join date must be in YYYY-MM-DD format";
  }

  if (!values.working_start.trim()) {
    errors.working_start = "Working start time is required";
  } else if (!/^\d{2}:\d{2}$/.test(values.working_start)) {
    errors.working_start = "Start time must be in HH:mm format";
  }

  if (!values.working_end.trim()) {
    errors.working_end = "Working end time is required";
  } else if (!/^\d{2}:\d{2}$/.test(values.working_end)) {
    errors.working_end = "End time must be in HH:mm format";
  }

  if (!values.supervisor_name.trim()) {
    errors.supervisor_name = "Supervisor name is required";
  }

  if (!values.salary_per_month.trim()) {
    errors.salary_per_month = "Salary is required";
  } else if (!/^\d+(\.\d{1,2})?$/.test(values.salary_per_month)) {
    errors.salary_per_month = "Salary must be a valid number";
  }

  return errors;
};

const userFormValidation = (values) => {
  return { ...formValidationStep1(values), ...formValidationStep2(values) };
};

function AddUserPage() {
  const navigate = useNavigate();
  const { addUser, getUsers } = useContext(UsersContext);
  const [currentStep, setCurrentStep] = useState(1);
  const form = useForm(userInitialValues, userFormValidation);
  const totalSteps = 2;

  const handleAddUser = async () => {
    await addUser(form.values);
    navigate(-1);
  };

  const handleNextStep = () => {
    if (currentStep >= totalSteps) {
      return;
    }

    const errors = form.customValidate(formValidationStep1);

    if (Object.keys(errors).length === 0) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep <= 1) {
      return;
    }

    setCurrentStep((prev) => prev - 1);
  };

  useEffect(() => {
    getUsers(1);
  }, []);

  return (
    <div className="flex flex-col items-center mt-6">
      <h1 className="text-xl font-medium">Add Employee</h1>
      <p className="text-sm text-gray-500 mt-1">
        Create a new contract for employee
      </p>
      <div className="flex mt-8 w-full max-w-[400px] items-center">
        <button
          className={clsx(
            "px-5 py-2 rounded-full border border-gray-300 text-xs cursor-pointer",
            { "border-sky-500": currentStep === 1 }
          )}
          onClick={handlePreviousStep}
        >
          1. Basic Information
        </button>
        <hr className="flex-1 border-gray-300" />
        <button
          className={clsx(
            "px-5 py-2 rounded-full border border-gray-300 text-xs cursor-pointer",
            { "border-sky-500": currentStep === 2 }
          )}
          onClick={handleNextStep}
        >
          2. Work Details
        </button>
      </div>

      <div className="mt-6 w-full max-w-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <form onSubmit={form.handleSubmit(handleAddUser)}>
              {currentStep === 1 ? (
                <FormStep1 form={form} handleNextStep={handleNextStep} />
              ) : (
                <FormStep2
                  form={form}
                  handlePreviousStep={handlePreviousStep}
                />
              )}
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function FormStep1({ form, handleNextStep }) {
  const { values, handleChange, errors, handleSubmit, validate } = form;

  const { data: countries, loading: countriesLoading } = useFetchData({
    endpoint: "https://api.first.org/data/v1/countries?limit=500",
  });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs">Step 1</p>
        <h2 className="text-lg">Basic Information</h2>
        <hr className="border-gray-300" />
      </div>

      <Input
        label="First Name"
        name="first_name"
        placeholder="John"
        value={values.first_name}
        onChange={handleChange}
        errorMessage={errors.first_name}
      />
      <Input
        label="Last Name"
        name="last_name"
        placeholder="Doe"
        value={values.last_name}
        onChange={handleChange}
        errorMessage={errors.last_name}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="example@mail.com"
        value={values.email}
        onChange={handleChange}
        errorMessage={errors.email}
      />
      <Input
        label="Phone"
        name="phone"
        type="tel"
        placeholder="+621111118888"
        value={values.phone}
        onChange={handleChange}
        errorMessage={errors.phone}
      />
      {!countriesLoading && (
        <Dropdown
          name="nationality"
          placeholder="Select country ..."
          label="Nationality"
          options={Object.entries(countries.data).map((item) => ({
            name: item[1].country,
            value: item[1].country,
          }))}
          value={values.nationality}
          onSelectedChange={handleChange}
          errorMessage={errors.nationality}
        />
      )}
      <Input
        label="Date of Birth"
        name="dob"
        type="date"
        value={values.dob}
        onChange={handleChange}
        errorMessage={errors.dob}
      />
      <Button className="w-28 ml-auto" onClick={handleNextStep}>
        Next
      </Button>
    </div>
  );
}

function FormStep2({ form, handlePreviousStep }) {
  const { values, handleChange, errors, handleSubmit, validate } = form;
  const { loading } = useContext(UsersContext);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs">Step 2</p>
        <h2 className="text-lg">Work Details</h2>
        <hr className="border-gray-300" />
      </div>

      <Dropdown
        name="role"
        placeholder="Select role ..."
        label="Role"
        options={roles.map((item) => ({
          name: item,
          value: item,
        }))}
        value={values.role}
        onSelectedChange={handleChange}
        errorMessage={errors.role}
      />

      <Dropdown
        name="employment_type"
        placeholder="Select type ..."
        label="Employment Type"
        options={employmentTypes.map((item) => ({
          name: item,
          value: item,
        }))}
        value={values.employment_type}
        onSelectedChange={handleChange}
        errorMessage={errors.employment_type}
      />

      <Input
        label="Join Date"
        name="join_date"
        type="date"
        value={values.join_date}
        onChange={handleChange}
        errorMessage={errors.join_date}
      />
      <div className="flex gap-3">
        <Input
          label="Working Start (UTC +0)"
          name="working_start"
          type="time"
          value={values.working_start}
          onChange={handleChange}
          errorMessage={errors.working_start}
        />
        <Input
          label="Working End  (UTC +0)"
          name="working_end"
          type="time"
          value={values.working_end}
          onChange={handleChange}
          errorMessage={errors.working_end}
        />
      </div>
      <Input
        label="Supervisor Name"
        name="supervisor_name"
        placeholder="Anna Wang"
        value={values.supervisor_name}
        onChange={handleChange}
        errorMessage={errors.supervisor_name}
      />
      <Input
        value={values.salary_per_month}
        onChange={handleChange}
        label="Salary per Month"
        name="salary_per_month"
        type="number"
        placeholder="In USA Dollar"
        errorMessage={errors.salary_per_month}
      />
      <div className="flex gap-3 justify-end">
        <Button
          className="w-28 "
          variant="secondary"
          onClick={handlePreviousStep}
        >
          Back
        </Button>
        <Button className="w-28 " type="submit" loading={loading.addUser}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default AddUserPage;
