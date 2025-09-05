import { PASSWORD_REGEX } from './constants';

export const validateName = (name) => {
  if (name.length < 20) return 'Name must be at least 20 characters long';
  if (name.length > 60) return 'Name must be less than 60 characters long';
  return '';
};

export const validateAddress = (address) => {
  if (address.length > 400) return 'Address must be less than 400 characters long';
  return '';
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return '';
};

export const validatePassword = (password) => {
  if (password.length < 8) return 'Password must be at least 8 characters long';
  if (password.length > 16) return 'Password must be less than 16 characters long';
  if (!PASSWORD_REGEX.test(password)) return 'Password must contain at least one uppercase letter and one special character';
  return '';
};