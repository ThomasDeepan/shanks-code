import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, CheckCircle2, PlayCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import CourseModuleList from './CourseModuleList';
import { DevelopmentCourse } from '../types';
import { calculateCourseProgress } from '../utils/progress';

export interface EnrolledCourseCardProps {
  course: DevelopmentCourse;
}

const getCourseImage = (courseId: string, title?: string) => {
  if (courseId === 'dev-course-02' || title?.includes('Backend') || title?.includes('API')) {
    return {
      src: '/images/course-backend.jpg',
      alt: "Systems engineer examining real-time telemetry and server logs at a cloud datacenter rack workstation",
    };
  }
  return {
    src: '/images/course-fullstack.jpg',
    alt: "Modern software engineering workstation with dual displays showing TypeScript code and responsive web application preview",
  };
};

export const EnrolledCourseCard: React.FC<EnrolledCourseCardProps> = ({ course }) => {
  const { completedCount, totalCount, percentage } = calculateCourseProgress(course.modules);
  const moduleCount = course.modules.length;
  const courseImg = getCourseImage(course.id, course.title);

  return (
    <div className="bg-white rounded-lg border border-slate-200/90 shadow-[0_1px_3px_0_rgba(15,23,42,0.04)] overflow-hidden transition-all duration-200">
      {/* Course Header Banner */}
      <div className="p-4 sm:p-5 bg-white border-b border-slate-100 space-y-3.5">
        {/* PLACEHOLDER IMAGE — replace with approved Shank's Code photography */}
        <div className="relative rounded-lg overflow-hidden border border-slate-200 aspect-[21/9] sm:aspect-[24/7] max-h-44 bg-[#1B2A4A]">
          <img
            src={courseImg.src}
            alt={courseImg.alt}
            width={800}
            height={350}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 1. Status / Category & Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="info" size="sm" icon={<GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />}>
              {course.category || 'Enrolled Program'}
            </Badge>
            <Badge variant="default" size="sm" dot>
              Active Curriculum
            </Badge>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="text-xs font-bold text-[#1A1F2B] bg-slate-100/90 px-2.5 py-0.5 rounded-full border border-slate-200/70">
              {percentage}% Complete
            </span>
          </div>
        </div>

        {/* 2. Course Title & Description */}
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-bold text-[#1A1F2B] tracking-tight leading-snug">
            {course.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#5B6472] leading-relaxed max-w-3xl">
            {course.description}
          </p>
        </div>

        {/* 3. Progress Bar Container */}
        <div className="space-y-1.5 pt-0.5">
          <div
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Course progress for ${course.title}: ${percentage} percent`}
            className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/50"
          >
            <div
              className="bg-[#1B2A4A] h-full rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-[#5B6472] pt-0.5">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1.5 font-medium text-[#5B6472]">
                <BookOpen className="w-3.5 h-3.5 text-[#1B2A4A]" aria-hidden="true" />
                {moduleCount} Modules
              </span>
              <span className="flex items-center gap-1.5 font-medium text-[#5B6472]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A62B]" aria-hidden="true" />
                {completedCount} of {totalCount} Lessons Complete
              </span>
            </div>

            {/* Course Action */}
            <Link to={`/student/learning/${course.id}`} className="self-start sm:self-center">
              <Button
                variant="primary"
                size="sm"
                className="text-xs py-1.5 px-3.5"
                leftIcon={<PlayCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
                aria-label={`Resume learning for ${course.title}`}
              >
                Resume Learning
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Course Modules & Lessons Breakdown */}
      <div className="p-4 sm:p-5 bg-slate-50/40 space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="text-[11px] font-bold text-[#5B6472] uppercase tracking-wider font-mono">
            Modular Curriculum Syllabus
          </h4>
          <span className="text-[11px] text-[#5B6472] font-medium">
            Expand or collapse modules
          </span>
        </div>

        <CourseModuleList modules={course.modules} courseId={course.id} />
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
