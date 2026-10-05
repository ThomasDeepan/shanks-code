import React, { forwardRef } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#1B2A4A] text-white hover:bg-[#2F4368] active:bg-[#0F1930] shadow-sm border border-[#1B2A4A]/40 focus-visible:ring-[#1B2A4A]',
  secondary:
    'bg-white text-[#1B2A4A] font-semibold border-2 border-[#1B2A4A] hover:border-[#2F4368] hover:bg-[#EEF1F6] hover:text-[#1B2A4A] shadow-xs active:bg-[#D3DAE6] focus-visible:ring-[#1B2A4A]',
  outline:
    'bg-white text-[#1B2A4A] font-semibold border-2 border-[#1B2A4A] hover:border-[#2F4368] hover:bg-[#EEF1F6] hover:text-[#1B2A4A] shadow-xs active:bg-[#D3DAE6] focus-visible:ring-[#1B2A4A]',
  ghost:
    'bg-transparent text-[#5F5A50] hover:text-[#1B2A4A] hover:bg-[#EEF1F6] active:bg-[#D3DAE6] border border-transparent focus-visible:ring-[#1B2A4A]',
  danger:
    'bg-[#6E4F06] text-white hover:bg-[#A67C0A] active:bg-[#0F1930] shadow-sm border border-[#6E4F06] focus-visible:ring-[#6E4F06]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5 min-h-[36px] sm:min-h-[32px]',
  md: 'px-4 py-2 text-sm font-medium rounded-lg gap-2 min-h-[40px] sm:min-h-[38px]',
  lg: 'px-5 py-2.5 text-sm sm:text-base font-medium rounded-lg gap-2.5 min-h-[44px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      type = 'button',
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        className={`
          inline-flex items-center justify-center font-medium transition-colors select-none
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white
          disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
          ${fullWidth ? 'w-full' : ''}
          ${sizeStyles[size]}
          ${variantStyles[variant]}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-0.5 w-4 h-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && (
          <span className="inline-flex shrink-0 items-center justify-center" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0 items-center justify-center" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
