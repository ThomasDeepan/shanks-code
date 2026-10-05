import React from 'react';

export interface LoadingStateProps {
  message?: string;
  className?: string;
  minHeight?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading technical curriculum...',
  className = '',
  minHeight = 'min-h-[220px]',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`w-full flex flex-col items-center justify-center p-8 bg-white border border-slate-200/90 rounded-lg shadow-2xs ${minHeight} ${className}`}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-8 h-8 rounded-full border-2 border-[#1B2A4A] border-t-transparent animate-spin"
          aria-hidden="true"
        />
        <p className="text-xs sm:text-sm font-medium text-[#5B6472] animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
