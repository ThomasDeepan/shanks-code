import React from 'react';

export type PageContainerWidth = 'default' | 'wide';

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'main' | 'section';
  /**
   * `default` — 1280px content column. Used by every content section.
   * `wide`    — 1320px column. Reserved for edge furniture (navbar, footer)
   *             and dense horizontal layouts that benefit from extra room.
   * Both keep full-width section backgrounds outside the centred column.
   */
  width?: PageContainerWidth;
}

const widthStyles: Record<PageContainerWidth, string> = {
  default: 'max-w-7xl',
  wide: 'max-w-[1320px]',
};

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = '',
  as: Component = 'div',
  width = 'default',
}) => {
  return (
    <Component
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${widthStyles[width]} ${className}`.trim()}
    >
      {children}
    </Component>
  );
};

export default PageContainer;