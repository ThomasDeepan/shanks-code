import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info as InfoIcon } from 'lucide-react';

export type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'good'
  | 'attention'
  | 'critical';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<
  BadgeVariant,
  {
    container: string;
    dot: string;
    defaultIcon?: React.ReactNode;
  }
> = {
  default: {
    container: 'bg-[#EEF1F6] text-[#5F5A50] border-[#D3DAE6]',
    dot: 'bg-[#5F5A50]',
  },
  success: {
    container: 'bg-[#FDF3D9] text-[#6E4F06] border-[#D9A62B]/50 font-semibold',
    dot: 'bg-[#D9A62B]',
    defaultIcon: <CheckCircle2 className="w-3 h-3 text-[#D9A62B] shrink-0" aria-hidden="true" />,
  },
  good: {
    container: 'bg-[#FDF3D9] text-[#6E4F06] border-[#D9A62B]/50 font-semibold',
    dot: 'bg-[#D9A62B]',
    defaultIcon: <CheckCircle2 className="w-3 h-3 text-[#D9A62B] shrink-0" aria-hidden="true" />,
  },
  warning: {
    container: 'bg-[#FDF3D9] text-[#A67C0A] border-[#D9A62B]/50 font-medium',
    dot: 'bg-[#A67C0A]',
    defaultIcon: <AlertTriangle className="w-3 h-3 text-[#A67C0A] shrink-0" aria-hidden="true" />,
  },
  attention: {
    container: 'bg-[#FDF3D9] text-[#A67C0A] border-[#D9A62B]/50 font-medium',
    dot: 'bg-[#A67C0A]',
    defaultIcon: <AlertTriangle className="w-3 h-3 text-[#A67C0A] shrink-0" aria-hidden="true" />,
  },
  danger: {
    container: 'bg-[#0F1930] text-white border-[#1B2A4A]',
    dot: 'bg-white',
    defaultIcon: <AlertCircle className="w-3 h-3 text-white shrink-0" aria-hidden="true" />,
  },
  critical: {
    container: 'bg-[#0F1930] text-white border-[#1B2A4A]',
    dot: 'bg-white',
    defaultIcon: <AlertCircle className="w-3 h-3 text-white shrink-0" aria-hidden="true" />,
  },
  info: {
    container: 'bg-[#EEF1F6] text-[#1B2A4A] border-[#D3DAE6] font-medium',
    dot: 'bg-[#1B2A4A]',
    defaultIcon: <InfoIcon className="w-3 h-3 text-[#1B2A4A] shrink-0" aria-hidden="true" />,
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[11px] leading-tight',
  md: 'px-2.5 py-0.5 text-xs leading-normal',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
  className = '',
  ...props
}) => {
  const styles = variantStyles[variant];

  // Rule 1: Every status pill/tag must have both an appropriate icon and status color
  const displayedIcon = icon ?? (dot ? null : styles.defaultIcon);

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium rounded-full border tracking-wide select-none
        ${sizeStyles[size]}
        ${styles.container}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {displayedIcon && (
        <span className="shrink-0 inline-flex items-center" aria-hidden="true">
          {displayedIcon}
        </span>
      )}
      {!displayedIcon && dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${styles.dot}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
