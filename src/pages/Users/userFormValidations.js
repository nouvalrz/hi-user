export const formValidationStep1 = (values) => {
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


  if (!values.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (
    !/^(?:\+?\d{9,15}|\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})$/.test(values.phone)
  ) {
    errors.phone =
      "Phone number must be 9-15 digits (with optional +), or like (123) 456-7890";
  }

  if (!values.nationality.trim()) {
    errors.nationality = "Nationality is required";
  }

  if (!values.dob.trim()) {
    errors.dob = "Date of birth is required";
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.dob)) {
    errors.dob = "Date of birth must be in YYYY-MM-DD format";
  }

  if (!values.avatar.trim()) {
    errors.avatar = "Profile image is required";
  }

  return errors;
};

export const formValidationStep2 = (values) => {
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

  if (!values.salary_per_month.toString().trim()) {
    errors.salary_per_month = "Salary is required";
  } else if (!/^\d+(\.\d{1,2})?$/.test(values.salary_per_month)) {
    errors.salary_per_month = "Salary must be a valid number";
  }

  return errors;
};

export const userFormValidation = (values) => {
  return { ...formValidationStep1(values), ...formValidationStep2(values) };
};