import React from 'react';
import { Clock, Award, Info } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export interface ProgramItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: string;
  description: string;
  skills: string[];
}

export interface ProgramCardProps {
  program: ProgramItem;
  onPreviewClick?: (program: ProgramItem) => void;
  className?: string;
}

const getTrackImage = (category: string) => {
  if (category.includes('IoT') || category.includes('Embedded')) {
    return {
      src: '/images/track-iot.jpg',
      alt: "Hands-on IoT prototyping with ESP32 microcontroller, sensors, multimeter, and Arduino programming setup",
    };
  }
  if (category.includes('AI') || category.includes('Data')) {
    return {
      src: '/images/track-aids.jpg',
      alt: "Data science engineering setup with Python Jupyter notebook and machine learning model validation loss charts",
    };
  }
  return {
    src: '/images/track-fullstack.jpg',
    alt: "Software development workstation showing TypeScript frontend code and web application interface preview",
  };
};

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  onPreviewClick,
  className = '',
}) => {
  const trackImg = getTrackImage(program.category);

  return (
    <div
      className={`h-full flex flex-col justify-between bg-white rounded-xl border border-[#D3DAE6] shadow-xs p-6 sm:p-7 hover:border-[#1B2A4A]/40 hover-lift ${className}`.trim()}
    >
      <div>
        <div className="relative rounded-lg overflow-hidden border border-[#D3DAE6] aspect-[16/9] mb-4 bg-[#1B2A4A]">
          <img
            src={trackImg.src}
            alt={trackImg.alt}
            width={600}
            height={340}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-3.5">
          {/* Top: Category badge + Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-1">
            <Badge variant="info" size="sm">
              {program.category}
            </Badge>

            <div className="flex items-center gap-3 text-xs text-[#5F5A50]">
              <span className="inline-flex items-center gap-1 font-medium text-[#5F5A50]">
                <Clock className="w-3.5 h-3.5 text-[#1B2A4A] shrink-0" aria-hidden="true" />
                <span>{program.duration}</span>
              </span>
              <span className="inline-flex items-center gap-1 font-medium text-[#5F5A50]">
                <Award className="w-3.5 h-3.5 text-[#D9A62B] shrink-0" aria-hidden="true" />
                <span>{program.level}</span>
              </span>
            </div>
          </div>

          {/* Middle: Program title */}
          <h3 className="text-xl font-bold text-[#1B2A4A] tracking-tight leading-snug">
            {program.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-[#5F5A50] leading-relaxed">
            {program.description}
          </p>

          {/* Technology tags */}
          <div className="pt-1">
            <p className="text-[11px] font-semibold text-[#5C6F97] uppercase tracking-wider mb-2 font-mono">
              Core Technologies
            </p>
            <div className="flex flex-wrap gap-1.5">
              {program.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded-md bg-[#EEF1F6] text-[#1B2A4A] text-xs font-mono border border-[#D3DAE6]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Action */}
      <div className="pt-5 mt-6 border-t border-[#E8E6E1]">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={() => onPreviewClick?.(program)}
          leftIcon={<Info className="w-3.5 h-3.5 text-[#1B2A4A] shrink-0" aria-hidden="true" />}
        >
          Track Overview
        </Button>
      </div>
    </div>
  );
};

export default ProgramCard;
