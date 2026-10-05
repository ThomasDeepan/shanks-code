import React from 'react';
import { LucideIcon, BookOpen } from 'lucide-react';
import Button from '@/components/ui/Button';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = BookOpen,
  title,
  description,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`bg-white border border-slate-200/90 rounded-lg p-6 sm:p-8 text-center shadow-2xs max-w-md mx-auto ${className}`}
    >
      <div className="w-10 h-10 rounded-lg bg-[#F5F6F8] text-[#5B6472] border border-slate-200 flex items-center justify-center mx-auto mb-2.5">
        <Icon className="w-5 h-5 text-[#5B6472]" aria-hidden="true" />
      </div>
      <h3 className="text-sm sm:text-base font-bold text-[#1A1F2B] mb-1">
        {title}
      </h3>
      <p className="text-xs text-[#5B6472] leading-relaxed mb-4">
        {description}
      </p>
      {actionText && onAction && (
        <div className="flex justify-center">
          <Button variant="outline" size="sm" onClick={onAction}>
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
