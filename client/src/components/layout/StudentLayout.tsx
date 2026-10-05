import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, Code2 } from 'lucide-react';
import Sidebar from './Sidebar';
import { useAuth } from '@/context/AuthContext';

export const StudentLayout: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex bg-[#F5F6F8] text-[#1A1F2B]">
      {/* Sidebar (Persistent on desktop, drawer on mobile) */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Topbar */}
        <header className="md:hidden sticky top-0 z-30 h-14 bg-white border-b border-slate-200 px-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-lg text-[#5B6472] hover:text-[#1A1F2B] hover:bg-[#F5F6F8] border border-transparent hover:border-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] transition-colors"
              aria-label="Open student portal navigation"
              aria-expanded={isMobileSidebarOpen}
              aria-controls="student-mobile-sidebar"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#1B2A4A] text-white flex items-center justify-center shadow-xs shrink-0">
                <Code2 className="w-4 h-4 text-white" aria-hidden="true" />
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-[#1B2A4A] tracking-tight leading-none">
                  SHANK'S CODE
                </span>
                <span className="text-[10px] font-semibold text-[#5B6472] tracking-wider uppercase mt-0.5">
                  Student Portal
                </span>
              </div>
            </div>
          </div>

          {user && (
            <div className="text-xs font-semibold text-[#1A1F2B] bg-[#F5F6F8] px-2.5 py-1 rounded-full border border-slate-200 truncate max-w-[150px]">
              {user.name}
            </div>
          )}
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-x-hidden bg-[#F5F6F8]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
