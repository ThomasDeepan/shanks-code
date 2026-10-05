import React from 'react';
import { Search, X } from 'lucide-react';

export interface ProgramSearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const ProgramSearch: React.FC<ProgramSearchProps> = ({
  value,
  onChange,
  className = '',
}) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={`relative w-full ${className}`.trim()}>
      <label htmlFor="program-search-input" className="sr-only">
        Search programs by keyword, skill, or topic
      </label>

      {/* Search Icon */}
      <div
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center"
        aria-hidden="true"
      >
        <Search className="w-4 h-4" />
      </div>

      {/* Search Input */}
      <input
        id="program-search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by topic, skill, or keyword..."
        className="
          w-full rounded-lg text-sm bg-white hover:bg-white text-[#1B2A4A] placeholder:text-[#A8A39A]
          border border-[#D3DAE6] pl-10 pr-10 py-2.5
          focus:bg-white focus:outline-none focus:border-[#1B2A4A] focus:ring-2 focus:ring-[#1B2A4A]/20
          transition-all shadow-xs
        "
        aria-label="Search programs by keyword, skill, or topic"
      />

      {/* Clear Button */}
      {value.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          className="
            absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-[#5C6F97]
            hover:text-[#1B2A4A] hover:bg-[#EEF1F6] transition-colors
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A]
          "
          aria-label="Clear search query"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default ProgramSearch;
