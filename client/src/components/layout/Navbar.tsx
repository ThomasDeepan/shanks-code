import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Menu, X, ArrowUpRight } from 'lucide-react';
import PageContainer from './PageContainer';

/**
 * Navbar
 * Primary public navigation.
 *
 * Every entry is now a real route, so active state is derived from the pathname
 * (with `useRouteHashSync` handling any legacy `/#anchor` deep links). The
 * visual design, responsive behaviour and keyboard accessibility are unchanged:
 * a sticky white bar, desktop links, a mobile drawer, and the prominent
 * Student Portal action which now leads to the authentication entry point.
 */

interface NavItem {
  id: string;
  label: string;
  /** Route path. */
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'rd', label: 'R&D', href: '/rnd' },
  { id: 'programs', label: 'Programs', href: '/programs' },
  { id: 'workshops', label: 'Workshops', href: '/workshops' },
];

/** True when `pathname` matches the nav item (exact for '/', prefix otherwise). */
const isNavItemActive = (pathname: string, item: NavItem): boolean =>
  item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`);

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-subtle relative">
      <PageContainer width="wide" className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[68px]">
          {/* Brand Identity */}
          <Link
            to="/"
            className="flex items-center gap-3 text-[#1B2A4A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] rounded-lg p-1 -ml-1 transition-opacity hover:opacity-90"
            aria-label="Shank's Code Edutech Home"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#1B2A4A] text-white shadow-xs shrink-0">
              <Code2 className="w-5 h-5 text-white" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-[#1B2A4A] leading-none">
                SHANK&apos;S CODE
              </span>
              <span className="text-[10px] font-semibold text-[#5C6F97] tracking-wider uppercase mt-1">
                Edutech &bull; Applied R&amp;D
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Primary Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = isNavItemActive(location.pathname, item);
              const linkClasses = `text-sm font-medium transition-colors px-3 py-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] select-none nav-link-draw ${
                isActive
                  ? 'text-[#1B2A4A] font-semibold active bg-[#FDF3D9] border-b-2 border-[#D9A62B]'
                  : 'text-[#5C6F97] hover:text-[#1B2A4A]'
              }`;

              return (
                <Link
                  key={item.id}
                  to={item.href}
                  className={linkClasses}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Student Portal Action */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/portal"
              className="inline-flex items-center justify-center font-semibold transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white px-3.5 py-1.5 text-xs rounded-lg gap-1.5 min-h-[36px] bg-[#1B2A4A] text-white hover:bg-[#2F4368] active:bg-[#0F1930] shadow-sm border border-[#1B2A4A]/40 focus-visible:ring-[#1B2A4A] btn-bloom"
            >
              <span>Sign In / Login</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-[#5C6F97] hover:text-[#1B2A4A] hover:bg-[#EEF1F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] transition-colors"
              aria-controls="mobile-navigation"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </PageContainer>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden absolute top-full left-0 right-0 w-full border-t border-[#D3DAE6] bg-white px-4 pt-3 pb-5 space-y-3 shadow-xl z-50 animate-in fade-in max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = isNavItemActive(location.pathname, item);
              const mobileLinkClasses = `flex items-center justify-between text-base font-medium px-3.5 py-2.5 rounded-lg transition-colors select-none ${
                isActive
                  ? 'text-[#1B2A4A] font-semibold bg-[#FDF3D9] border-l-4 border-[#D9A62B]'
                  : 'text-[#5C6F97] hover:text-[#1B2A4A] hover:bg-[#EEF1F6]'
              }`;

              return (
                <Link
                  key={item.id}
                  to={item.href}
                  className={mobileLinkClasses}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-[#D3DAE6]">
            <Link
              to="/portal"
              className="w-full flex items-center justify-center font-semibold transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white px-4 py-2.5 text-sm rounded-lg gap-2 min-h-[44px] bg-[#1B2A4A] text-white hover:bg-[#2F4368] active:bg-[#0F1930] shadow-sm border border-[#1B2A4A]/40 focus-visible:ring-[#1B2A4A]"
            >
              <span>Sign In / Login</span>
              <ArrowUpRight className="w-4 h-4 text-white" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
