import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import Button from '@/components/ui/Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  className?: string;
  actionText?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to Load Content',
  message = 'A problem occurred while retrieving information from the server. Please try again.',
  onRetry,
  isRetrying = false,
  className = '',
  actionText = 'Try Again',
}) => {
  return (
    <div
      role="alert"
      className={`w-full bg-white border border-[#F0C9B4] rounded-lg p-6 sm:p-8 text-center shadow-2xs max-w-lg mx-auto ${className}`}
    >
      <div className="w-10 h-10 rounded-full bg-[#FBEAE3] text-[#B4552C] flex items-center justify-center mx-auto mb-3">
        <AlertCircle className="w-5 h-5 text-[#B4552C]" aria-hidden="true" />
      </div>

      <h3 className="text-base sm:text-lg font-bold text-[#1A1F2B] mb-1.5">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-[#5B6472] mb-5 leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            isLoading={isRetrying}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />}
          >
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ErrorState;
