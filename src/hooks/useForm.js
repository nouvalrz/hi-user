import { useState } from 'react';

const useForm = (
  initialValues,
  validationCallback,
  directValidation = false
) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });

    if (validationCallback && directValidation) {
      setErrors(validationCallback({ ...values, [name]: value }));
    }
  };

  const handleSubmit = (actionCallback) => (event) => {
    event.preventDefault();
    const validationErrors = validationCallback
      ? validationCallback(values)
      : {};
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      actionCallback();
      // setValues(initialValues);
    }
  };

  const validate = () => {
    const validationErrors = validationCallback(values);
    setErrors(validationErrors);
    return validationErrors;
  };

  const customValidate = (callback) => {
    const validationErrors = callback(values);
    setErrors(validationErrors);
    return validationErrors;
  }

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    validate,
    customValidate
  };
};

export default useForm;
