/ src/components/common/FormElements.jsx
import React from 'react';

// Text Input component
export const TextInput = ({ 
  id, 
  label, 
  placeholder, 
  required = false, 
  error, 
  ...props 
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${inputId}-error` : undefined;
  
  return (
    <div className="ho-form-group">
      <label htmlFor={inputId} className="ho-label">
        {label} {required && <span className="ho-required">*</span>}
      </label>
      <input
        id={inputId}
        type="text"
        className={`ho-input ${error ? 'ho-input--error' : ''}`}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={errorId}
        {...props}
      />
      {error && (
        <p id={errorId} className="ho-error-message">
          {error}
        </p>
      )}
    </div>
  );
};

// Select component
export const Select = ({ 
  id, 
  label, 
  options = [], 
  required = false, 
  error, 
  ...props 
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${selectId}-error` : undefined;
  
  return (
    <div className="ho-form-group">
      <label htmlFor={selectId} className="ho-label">
        {label} {required && <span className="ho-required">*</span>}
      </label>
      <select
        id={selectId}
        className={`ho-select ${error ? 'ho-select--error' : ''}`}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={errorId}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="ho-error-message">
          {error}
        </p>
      )}
    </div>
  );
};

// Textarea component
export const TextArea = ({ 
  id, 
  label, 
  placeholder, 
  required = false, 
  error, 
  rows = 4, 
  ...props 
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${textareaId}-error` : undefined;
  
  return (
    <div className="ho-form-group">
      <label htmlFor={textareaId} className="ho-label">
        {label} {required && <span className="ho-required">*</span>}
      </label>
      <textarea
        id={textareaId}
        className={`ho-textarea ${error ? 'ho-textarea--error' : ''}`}
        placeholder={placeholder}
        rows={rows}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={errorId}
        {...props}
      />
      {error && (
        <p id={errorId} className="ho-error-message">
          {error}
        </p>
      )}
    </div>
  );
};

// Radio Button Group component
export const RadioGroup = ({ 
  legend, 
  name, 
  options = [], 
  required = false, 
  error, 
  horizontal = false,
  ...props 
}) => {
  const groupId = `radio-group-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${groupId}-error` : undefined;
  
  return (
    <div className="ho-form-group">
      <fieldset
        className="ho-fieldset"
        aria-describedby={errorId}
        {...props}
      >
        <legend className="ho-fieldset-legend">
          {legend} {required && <span className="ho-required">*</span>}
        </legend>
        <div className={`ho-radios ${horizontal ? 'ho-radios--horizontal' : ''}`}>
          {options.map((option) => (
            <div key={option.value} className="ho-radio">
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                className="ho-radio__input"
                defaultChecked={option.checked}
              />
              <label htmlFor={`${name}-${option.value}`} className="ho-radio__label">
                {option.label}
              </label>
            </div>
          ))}
        </div>
        {error && (
          <p id={errorId} className="ho-error-message">
            {error}
          </p>
        )}
      </fieldset>
    </div>
  );
};

// Checkbox component
export const Checkbox = ({ 
  id, 
  label, 
  error, 
  ...props 
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${checkboxId}-error` : undefined;
  
  return (
    <div className="ho-form-group">
      <div className="ho-checkbox">
        <input
          type="checkbox"
          id={checkboxId}
          className="ho-checkbox__input"
          aria-invalid={!!error}
          aria-describedby={errorId}
          {...props}
        />
        <label htmlFor={checkboxId} className="ho-checkbox__label">
          {label}
        </label>
      </div>
      {error && (
        <p id={errorId} className="ho-error-message">
          {error}
        </p>
      )}
    </div>
  );
};