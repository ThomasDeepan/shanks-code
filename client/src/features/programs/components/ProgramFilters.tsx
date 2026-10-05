import React from 'react';

export interface ProgramFiltersProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  className?: string;
}

export const ProgramFilters: React.FC<ProgramFiltersProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  className = '',
}) => {
  return (
    <div
      role="toolbar"
      aria-label="Filter programs by category"
      className={`flex flex-wrap items-center gap-2 ${className}`.trim()}
    >
      {categories.map((category) => {
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            aria-pressed={isActive}
            className={`
              px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all select-none min-h-[36px] flex items-center
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2
              ${
                isActive
                  ? 'bg-[#FDF3D9] text-[#6E4F06] shadow-xs border border-[#D9A62B] font-semibold'
                  : 'bg-white text-[#5F5A50] border border-[#D3DAE6] hover:bg-[#EEF1F6] hover:text-[#1B2A4A]'
              }
            `.trim().replace(/\s+/g, ' ')}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default ProgramFilters;
