import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Layers } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { DevelopmentCourseItem } from '../types';

export interface ActiveCourseCardProps {
  course: DevelopmentCourseItem;
}

interface CourseVisualMetadata {
  src: string;
  alt: string;
  category: string;
}

const getCourseVisualMetadata = (courseId: string, title?: string): CourseVisualMetadata => {
  if (courseId === 'dev-course-02' || title?.includes('Backend') || title?.includes('API')) {
    return {
      src: '/images/course-backend.jpg',
      alt: 'Systems engineer examining real-time telemetry and server logs at a cloud datacenter rack workstation',
      category: 'Systems & Cloud',
    };
  }
  return {
    src: '/images/course-fullstack.jpg',
    alt: 'Modern software engineering workstation with dual displays showing TypeScript code and responsive web application preview',
    category: 'Full Stack',
  };
};

export const ActiveCourseCard: React.FC<ActiveCourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  const clampedPercentage = Math.min(100, Math.max(0, Math.round(course.progressPercentage)));
  const { src, alt, category } = getCourseVisualMetadata(course.id, course.title);

  const handleResumeClick = () => {
    navigate(`/student/learning/${course.id}`);
  };

  // Clean module title without redundant prefix
  const cleanModuleTitle = course.currentModule.replace(/^Module \d+:\s*/, '');

  return (
    <div className="h-full flex flex-col justify-between bg-white rounded-lg border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all duration-150 overflow-hidden">
      <div>
        {/* Course Domain Visual Thumbnail with Categorical Overlay */}
        <div className="relative aspect-[16/7] w-full bg-[#1B2A4A] overflow-hidden border-b border-slate-100">
          <img
            src={src}
            alt={alt}
            width={640}
            height={280}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-between justify-between p-2.5">
            <div className="self-start">
              <Badge variant="info" size="sm" className="bg-slate-900/80 text-white border-white/20 backdrop-blur-xs">
                {category}
              </Badge>
            </div>
            <div className="self-end ml-auto">
              <span className="text-[11px] font-bold text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded font-mono">
                {clampedPercentage}% Complete
              </span>
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className="p-3.5 sm:p-4 space-y-3">
          {/* Course Title */}
          <div>
            <h3
              onClick={handleResumeClick}
              className="text-sm sm:text-base font-bold text-[#1A1F2B] tracking-tight leading-snug line-clamp-1 hover:text-[#1B2A4A] transition-colors cursor-pointer"
            >
              {course.title}
            </h3>
          </div>

          {/* Current Module Indicator */}
          <div className="p-2 sm:p-2.5 rounded-md bg-slate-50 border border-slate-200/70 space-y-0.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#5B6472] font-mono">
              <Layers className="w-3 h-3 text-[#5B6472] shrink-0" aria-hidden="true" />
              <span>Current Module</span>
            </div>
            <p className="text-xs font-semibold text-[#1A1F2B] leading-snug line-clamp-1">
              {cleanModuleTitle}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-[#5B6472] font-medium">
              <span>Progress</span>
              <span className="font-bold text-[#1B2A4A] font-mono">{clampedPercentage}%</span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={clampedPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Course completion progress for ${course.title}: ${clampedPercentage} percent`}
              className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200/50"
            >
              <div
                className="bg-[#1B2A4A] h-full rounded-full transition-all duration-300"
                style={{ width: `${clampedPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-3.5 sm:p-4 pt-0">
        <Button
          variant="primary"
          size="sm"
          fullWidth
          onClick={handleResumeClick}
          leftIcon={<PlayCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
          aria-label={`Resume learning for ${course.title}`}
          className="text-xs py-2 shadow-2xs"
        >
          Resume Learning
        </Button>
      </div>
    </div>
  );
};

export default ActiveCourseCard;
