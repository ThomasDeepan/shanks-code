import React, { useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Code2, LayoutDashboard, BookOpen, LogOut, User, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle escape key to close mobile sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen && onCloseMobile) {
        onCloseMobile();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen, onCloseMobile]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2.5 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A62B] ${
      isActive
        ? 'bg-[#FDF3D9] text-[#1B2A4A] font-semibold border-l-4 border-[#D9A62B] shadow-2xs'
        : 'text-slate-300 hover:text-white hover:bg-[#2F4368]/60 border-l-4 border-transparent'
    }`;

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-[#1B2A4A] text-white border-r border-[#2F4368] w-60 md:w-64 overflow-y-auto">
      {/* Top Header & Navigation */}
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="h-14 sm:h-15 px-4 sm:px-5 flex items-center justify-between border-b border-[#2F4368]">
          <Link
            to="/student/dashboard"
            onClick={onCloseMobile}
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A62B] rounded-md p-1 -ml-1 transition-opacity hover:opacity-90"
            aria-label="Shank's Code Student Portal Home"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#2F4368] text-white border border-[#2F4368] shadow-2xs shrink-0">
              <Code2 className="w-3.5 h-3.5 text-white" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-extrabold tracking-tight text-white leading-none">
                SHANK'S CODE
              </span>
              <span className="text-[9px] font-semibold text-[#D9A62B] tracking-widest uppercase mt-0.5 font-mono">
                Student Portal
              </span>
            </div>
          </Link>

          {/* Mobile Close Button */}
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="md:hidden p-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A62B]"
              aria-label="Close navigation sidebar"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav
          className="p-3 sm:p-3.5 space-y-1"
          aria-label="Student Portal Navigation"
        >
          <div className="px-2.5 pb-1.5 pt-1 text-[9px] font-bold text-[#D9A62B] uppercase tracking-widest font-mono">
            Academics
          </div>

          <NavLink
            to="/student/dashboard"
            end
            className={navLinkClass}
            onClick={onCloseMobile}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0 text-current" aria-hidden="true" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/student/courses"
            className={navLinkClass}
            onClick={onCloseMobile}
          >
            <BookOpen className="w-4 h-4 shrink-0 text-current" aria-hidden="true" />
            <span>Courses</span>
          </NavLink>
        </nav>
      </div>

      {/* Bottom User Area & Logout */}
      <div className="p-3 sm:p-3.5 border-t border-[#2F4368] bg-[#1B2A4A] space-y-2.5">
        {/* Student Identity Area */}
        {user && (
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#2F4368]/50 border border-[#2F4368] text-white shadow-2xs">
            <div className="relative">
              <div className="w-7 h-7 rounded-full bg-[#2F4368] text-white flex items-center justify-center shrink-0 border border-[#2F4368] font-semibold text-xs">
                <User className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
              <span
                className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#D9A62B] ring-1 ring-[#1B2A4A]"
                title="Active Session"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-white truncate leading-tight">
                {user.name}
              </span>
              <span className="text-[10px] text-slate-300 truncate leading-tight">
                {user.cohort || user.email}
              </span>
            </div>
          </div>
        )}

        {/* Logout Action */}
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Sign out of student account"
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium text-slate-300 hover:text-white hover:bg-[#2F4368] border border-white/10 hover:border-[#2F4368] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A62B]"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        id="student-desktop-sidebar"
        aria-label="Student Portal Sidebar"
        className="hidden md:block shrink-0 h-screen sticky top-0"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          id="student-mobile-sidebar"
          role="dialog"
          aria-modal="true"
          aria-label="Student Navigation Drawer"
          className="fixed inset-0 z-50 md:hidden flex"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative z-10 h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-150">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
