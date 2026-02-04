import { useState, useCallback } from 'react';

/**
 * Custom hook for form state management
 * @param {Object} initialValues - Initial form values
 * @returns {Object} { values, handleChange, handleSubmit, resetForm, setValues }
 */
export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleSubmit = useCallback((callback) => {
    return (e) => {
      e.preventDefault();
      callback(values);
    };
  }, [values]);

  return {
    values,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
  };
};
