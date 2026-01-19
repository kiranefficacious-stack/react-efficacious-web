// Validation utilities for form fields

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
  message?: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Phone validation (basic)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// Validate a single field
export const validateField = (
  value: any,
  rules: ValidationRule
): string | null => {
  // Required check
  if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return rules.message || 'This field is required';
  }

  // If value is empty and not required, skip other validations
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return null;
  }

  const stringValue = String(value);

  // Min length check
  if (rules.minLength && stringValue.length < rules.minLength) {
    return rules.message || `Minimum length is ${rules.minLength} characters`;
  }

  // Max length check
  if (rules.maxLength && stringValue.length > rules.maxLength) {
    return rules.message || `Maximum length is ${rules.maxLength} characters`;
  }

  // Pattern check
  if (rules.pattern && !rules.pattern.test(stringValue)) {
    return rules.message || 'Invalid format';
  }

  // Custom validation
  if (rules.custom && !rules.custom(value)) {
    return rules.message || 'Validation failed';
  }

  return null;
};

// Validate multiple fields
export const validateForm = (
  data: { [key: string]: any },
  rules: { [key: string]: ValidationRule }
): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(rules).forEach((field) => {
    const error = validateField(data[field], rules[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

// Check if form has errors
export const hasErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};

// Common validation rules
export const commonRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  url: {
    custom: isValidUrl,
    message: 'Please enter a valid URL'
  },
  phone: {
    custom: isValidPhone,
    message: 'Please enter a valid phone number'
  },
  required: {
    required: true,
    message: 'This field is required'
  }
};
