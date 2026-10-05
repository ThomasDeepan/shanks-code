import React from 'react';
import { Calendar, Sparkles, GraduationCap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Badge from '@/components/ui/Badge';

export const DashboardWelcome: React.FC = () => {
  const { user } = useAuth();

  // Localized dynamic browser date formatting
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const displayName = user?.name?.trim() ? user.name : 'Student';
  const cohortName = user?.cohort || 'Full-Stack Engineering';

  return (
    <div className="bg-white border border-slate-200/90 rounded-lg p-4 sm:p-4.5 shadow-2xs overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3.5">
        {/* Left: Greeting, Context, & Metadata */}
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B2A4A] flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#1B2A4A]" aria-hidden="true" />
              Student Portal
            </span>
            <Badge variant="default" size="sm" dot>
              Active Session
            </Badge>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-[#5F5A50] font-mono">
              <GraduationCap className="w-3 h-3 text-[#D9A62B]" aria-hidden="true" />
              {cohortName}
            </span>
          </div>

          <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#1B2A4A] leading-snug">
            Welcome back, {displayName}
          </h1>

          <p className="text-xs sm:text-sm text-[#5F5A50] leading-relaxed">
            Continue your structured coursework and monitor your modular milestones across all enrolled tracks.
          </p>

          <div className="pt-0.5 flex items-center gap-2 text-xs font-medium text-[#5B6472]">
            <Calendar className="w-3.5 h-3.5 text-[#5B6472] shrink-0" aria-hidden="true" />
            <time dateTime={new Date().toISOString().split('T')[0]}>
              {formattedDate}
            </time>
          </div>
        </div>

        {/* Right: Compact Applied Learning Lab Visual Anchor */}
        <div className="hidden md:block w-44 lg:w-52 shrink-0">
          <div className="relative rounded-md overflow-hidden border border-slate-200/90 aspect-[16/9] shadow-2xs bg-[#1B2A4A]">
            <img
              src="/images/portal-dashboard-banner.jpg"
              alt="Engineering students in an applied learning laboratory discussing software system architecture"
              width={240}
              height={135}
              loading="eager"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-2">
              <span className="text-[9px] font-semibold text-white/95 truncate font-mono uppercase tracking-wider">
                Applied R&amp;D Workspace
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWelcome;
