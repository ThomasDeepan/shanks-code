import React, { forwardRef, useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      id: customId,
      required,
      disabled,
      className = '',
      containerClassName = '',
      type = 'text',
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = customId || generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const hasError = Boolean(error);
    const describedBy = hasError ? errorId : helperText ? helperId : undefined;

    return (
      <div className={`w-full flex flex-col ${containerClassName}`.trim()}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[#1A1F2B] mb-1.5 select-none"
          >
            {label}
            {required && (
              <span className="text-[#B4552C] ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div
              className="absolute left-3.5 flex items-center pointer-events-none text-[#5B6472]"
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            required={required}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={describedBy}
            className={`
              w-full rounded-lg text-sm transition-all duration-150
              bg-white text-[#1A1F2B] placeholder:text-[#5B6472]/60
              border
              ${
                hasError
                  ? 'border-[#F0C9B4] focus:border-[#B4552C] focus:ring-2 focus:ring-[#B4552C]/20'
                  : 'border-slate-300 focus:border-[#1B2A4A] focus:ring-2 focus:ring-[#1B2A4A]/20'
              }
              ${leftIcon ? 'pl-10' : 'pl-3.5'}
              ${rightIcon ? 'pr-10' : 'pr-3.5'}
              py-2.5
              focus:outline-none
              disabled:bg-[#F5F6F8] disabled:text-[#5B6472]/50 disabled:cursor-not-allowed disabled:border-slate-200
              ${className}
            `.trim().replace(/\s+/g, ' ')}
            {...props}
          />

          {rightIcon && (
            <div
              className="absolute right-3.5 flex items-center pointer-events-none text-[#5B6472]"
              aria-hidden="true"
            >
              {rightIcon}
            </div>
          )}
        </div>

        {hasError ? (
          <p
            id={errorId}
            role="alert"
            className="text-xs text-[#B4552C] font-medium mt-1.5"
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            id={helperId}
            className="text-xs text-[#5B6472] mt-1.5"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
