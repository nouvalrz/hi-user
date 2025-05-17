import { useEffect } from 'react';
import { useState } from 'react';

const useForm = (
  initialValues,
  validationCallback,
  directValidation = false
) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [allFilled, setAllFilled] = useState(true);

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    setValues({
      ...values,
      [name]: type === "file" ? URL.createObjectURL(event.target.files[0]) : value,
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

  useEffect(() => {
    const filled = Object.values(values).filter((value) => value.toString().trim());
    setAllFilled(filled.length === Object.keys(values).length)
  }, [values])

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    validate,
    customValidate,
    allFilled
  };
};

export default useForm;
