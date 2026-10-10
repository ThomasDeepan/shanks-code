import React, { useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import useScrollReveal from '@/components/common/useScrollReveal';
import useRouteHashSync from '@/components/common/useRouteHashSync';

export interface PublicLayoutProps {
  /**
   * Optional explicit content. Used by the global 404 route, which renders
   * inside this shell instead of an `<Outlet />`.
   */
  children?: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  // Initialize failure-safe scroll reveal observer across public pages
  useScrollReveal(mainRef);

  // Reliable route & hash scroll synchronization sequence
  useRouteHashSync();

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6F8] text-[#1A1F2B]">
      <Navbar />
      <main ref={mainRef} key={pathname} className="flex-1 flex flex-col route-cross-fade">
        {children ?? <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
