import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import {
  Code2,
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Wrench,
  Megaphone,
  FlaskConical,
  Settings,
  Users,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

/**
 * AdminLayout
 * Application shell for the protected `/admin` area: persistent sidebar on
 * desktop, drawer on mobile, and an always-visible signed-in administrator chip
 * with sign-out.
 *
 * The layout renders only inside `ProtectedRoute allowedRole="admin"`.
 */

interface AdminNavItem {
  label: string;
  to: string;
  icon: React.ElementType;
  end?: boolean;
}

const ADMIN_NAV: Array<{ group: string; items: AdminNavItem[] }> = [
  {
    group: 'Overview',
    items: [{ label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard, end: true }],
  },
  {
    group: 'People',
    items: [{ label: 'Students', to: '/admin/dashboard/students', icon: Users }],
  },
  {
    group: 'Content',
    items: [
      { label: 'Programs', to: '/admin/dashboard/programs', icon: GraduationCap },
      { label: 'Workshops', to: '/admin/dashboard/workshops', icon: Wrench },
      { label: 'Announcements', to: '/admin/dashboard/announcements', icon: Megaphone },
      { label: 'R&D Projects', to: '/admin/dashboard/research', icon: FlaskConical },
    ],
  },
  {
    group: 'System',
    items: [{ label: 'Settings', to: '/admin/dashboard/settings', icon: Settings }],
  },
];

const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
  `flex items-center gap-2.5 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A62B] ${
    isActive
      ? 'bg-[#FDF3D9] text-[#1B2A4A] font-semibold border-l-4 border-[#D9A62B] shadow-2xs'
      : 'text-slate-300 hover:text-white hover:bg-[#2F4368]/60 border-l-4 border-transparent'
  }`;

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const sidebarContent = (
    <div className="flex h-full w-60 flex-col justify-between overflow-y-auto border-r border-[#2F4368] bg-[#1B2A4A] text-white md:w-64">
      <div className="flex flex-col">
        <div className="flex h-14 items-center justify-between border-b border-[#2F4368] px-4 sm:px-5">
          <Link
            to="/admin/dashboard"
            onClick={() => setIsMobileOpen(false)}
            className="flex items-center gap-2.5 rounded-md p-1 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A62B]"
            aria-label="Shank's Code admin dashboard home"
          >
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#2F4368] bg-[#2F4368] shadow-2xs">
              <Code2 className="h-3.5 w-3.5 text-white" aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              <span className="text-xs font-extrabold leading-none tracking-tight text-white sm:text-sm">
                SHANK'S CODE
              </span>
              <span className="mt-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-[#D9A62B]">
                Administration
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="rounded-md p-1.5 text-white/70 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A62B] md:hidden"
            aria-label="Close admin navigation"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <nav className="space-y-4 p-3 sm:p-3.5" aria-label="Admin navigation">
          {ADMIN_NAV.map((section) => (
            <div key={section.group}>
              <div className="px-2.5 pb-1.5 pt-1 font-mono text-[9px] font-bold uppercase tracking-widest text-[#D9A62B]">
                {section.group}
              </div>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={navLinkClass}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <item.icon className="h-4 w-4 shrink-0 text-current" aria-hidden="true" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}

          <div className="border-t border-[#2F4368] pt-3">
            <Link
              to="/"
              className="flex items-center gap-2.5 rounded-md border-l-4 border-transparent px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-[#2F4368]/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A62B]"
            >
              <BookOpen className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>View public website</span>
            </Link>
          </div>
        </nav>
      </div>

      <div className="space-y-2.5 border-t border-[#2F4368] bg-[#1B2A4A] p-3 sm:p-3.5">
        {user && (
          <div className="flex items-center gap-2.5 rounded-lg border border-[#2F4368] bg-[#2F4368]/50 p-2 text-white shadow-2xs">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#2F4368] bg-[#2F4368] font-mono text-[10px] font-bold text-white">
              {user.name.slice(0, 1).toUpperCase()}
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-xs font-semibold leading-tight text-white">
                {user.name}
              </span>
              <span className="truncate text-[10px] uppercase tracking-wider text-[#D9A62B]">
                Administrator
              </span>
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-[#2F4368] hover:bg-[#2F4368] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A62B]"
        >
          <LogOut className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F5F6F8] text-[#1A1F2B]">
      <aside className="sticky top-0 hidden h-screen shrink-0 md:block" aria-label="Admin sidebar">
        {sidebarContent}
      </aside>

      {isMobileOpen && (
        <div
          id="admin-mobile-sidebar"
          role="dialog"
          aria-modal="true"
          aria-label="Admin navigation drawer"
          className="fixed inset-0 z-50 flex md:hidden"
        >
          <div
            className="fixed inset-0 bg-[#0F1930]/55"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 flex h-full flex-col shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-3.5 shadow-2xs md:hidden">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="rounded-lg border border-transparent p-2 text-[#5B6472] transition-colors hover:border-slate-200 hover:bg-[#F5F6F8] hover:text-[#1A1F2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A]"
              aria-label="Open admin navigation"
              aria-expanded={isMobileOpen}
              aria-controls="admin-mobile-sidebar"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>

            <span className="flex flex-col">
              <span className="text-sm font-extrabold leading-none tracking-tight text-[#1B2A4A]">
                SHANK'S CODE
              </span>
              <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#5B6472]">
                Administration
              </span>
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
