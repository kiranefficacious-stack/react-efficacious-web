import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'url' | 'number' | 'textarea' | 'select' | 'checkbox';
  value: string | number | boolean;
  onChange: (value: any) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  helpText,
  options,
  rows = 4,
  min,
  max,
  disabled = false
}) => {
  const baseInputClasses = "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed";
  const errorClasses = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-slate-300";

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            className={`${baseInputClasses} ${errorClasses}`}
          />
        );

      case 'select':
        return (
          <select
            id={name}
            name={name}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={`${baseInputClasses} ${errorClasses}`}
          >
            <option value="">Select {label}</option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              id={name}
              name={name}
              type="checkbox"
              checked={value as boolean}
              onChange={(e) => onChange(e.target.checked)}
              disabled={disabled}
              className="w-4 h-4 text-brand-600 bg-slate-100 border-slate-300 rounded focus:ring-brand-500 dark:focus:ring-brand-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
            />
            <label htmlFor={name} className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              {label}
            </label>
          </div>
        );

      default:
        return (
          <input
            id={name}
            name={name}
            type={type}
            value={value as string | number}
            onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
            placeholder={placeholder}
            min={min}
            max={max}
            disabled={disabled}
            className={`${baseInputClasses} ${errorClasses}`}
          />
        );
    }
  };

  if (type === 'checkbox') {
    return (
      <div className="mb-4">
        {renderInput()}
        {helpText && (
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helpText}</p>
        )}
        {error && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      {helpText && !error && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helpText}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default FormField;
