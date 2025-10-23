export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateLoginForm = (values) => {
  const errors = {};
  
  if (!validateRequired(values.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Invalid email address';
  }
  
  if (!validateRequired(values.password)) {
    errors.password = 'Password is required';
  }
  
  return errors;
};

export const validateSignUpForm = (values) => {
  const errors = {};
  
  if (!validateRequired(values.firstName)) {
    errors.firstName = 'First name is required';
  }
  
  if (!validateRequired(values.lastName)) {
    errors.lastName = 'Last name is required';
  }
  
  if (!validateRequired(values.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Invalid email address';
  }
  
  if (!validateRequired(values.company)) {
    errors.company = 'Company name is required';
  }
  
  if (!validateRequired(values.password)) {
    errors.password = 'Password is required';
  } else if (!validatePassword(values.password)) {
    errors.password = 'Password must be at least 8 characters';
  }
  
  if (!validateRequired(values.confirmPassword)) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  if (!values.agreeToTerms) {
    errors.agreeToTerms = 'You must agree to the terms';
  }
  
  return errors;
};