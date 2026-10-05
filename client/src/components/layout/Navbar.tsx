import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Code2, Menu, X, ArrowUpRight } from 'lucide-react';
import { scrollToSectionTarget, SECTION_IDS } from '@/components/common/useRouteHashSync';
import PageContainer from './PageContainer';

interface NavItem {
  id: 'home' | 'about' | 'services' | 'rd' | 'programs' | 'workshops';
  label: string;
  href: string;
  isRoute?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '/#home' },
  { id: 'about', label: 'About', href: '/#about' },
  { id: 'services', label: 'Services', href: '/#services' },
  { id: 'rd', label: 'R&D', href: '/#rd' },
  { id: 'programs', label: 'Programs', href: '/programs', isRoute: true },
  { id: 'workshops', label: 'Workshops', href: '/workshops', isRoute: true },
];

const ROUTE_SECTION_IDS = ['programs', 'workshops'] as const;

const getInitialSection = (pathname: string, hash: string): string => {
  if (pathname === '/programs') return 'programs';
  if (pathname === '/workshops') return 'workshops';
  if (pathname !== '/') return '';
  const cleanHash = hash.replace('#', '').toLowerCase();
  if (cleanHash === 'about') return 'about';
  if (cleanHash === 'services') return 'services';
  if (cleanHash === 'rd' || cleanHash === 'rnd') return 'rd';
  return 'home';
};

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<string>(() =>
    getInitialSection(
      location.pathname,
      location.hash || (typeof window !== 'undefined' ? window.location.hash : '')
    )
  );

  const isClickScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Synchronize active section with route/hash changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/programs') {
      setActiveSection('programs');
    } else if (location.pathname === '/workshops') {
      setActiveSection('workshops');
    } else if (location.pathname !== '/') {
      setActiveSection('');
    } else {
      const cleanHash = (location.hash || window.location.hash).replace('#', '').toLowerCase();
      const targetId = cleanHash === 'rnd' ? 'rd' : cleanHash;
      if (SECTION_IDS.includes(targetId as (typeof SECTION_IDS)[number])) {
        setActiveSection(targetId);
      } else if (window.scrollY < 80) {
        setActiveSection('home');
      }
    }
  }, [location.pathname, location.hash]);

  // Scroll-spy: Observe sections on the homepage and update active state on manual scroll
  useEffect(() => {
    if (location.pathname !== '/') return;

    const updateActiveSectionOnScroll = () => {
      if (isClickScrollingRef.current) return;

      // When near the very top of the page, activate Home
      if (window.scrollY < 80) {
        setActiveSection('home');
        return;
      }

      // At the very bottom of the page the About/Services/R&D anchors are all
      // well above the viewport, so fall through to the normal position-based
      // resolution instead of force-activating a single section.

      const aboutEl = document.getElementById('about');
      const servicesEl = document.getElementById('services');
      const rdEl = document.getElementById('rd') || document.getElementById('rnd');

      if (!aboutEl || !servicesEl || !rdEl) return;

      const topAbout = aboutEl.getBoundingClientRect().top;
      const topServices = servicesEl.getBoundingClientRect().top;
      const topRd = rdEl.getBoundingClientRect().top;

      setActiveSection((current) => {
        // Sticky navbar height is ~68px; threshold at 80px marks clear entry into section.
        // A 24px hysteresis buffer ensures stability around section boundaries.
        const threshold = 80;
        const buffer = 24;

        // Check R&D
        const rdThreshold = current === 'rd' ? threshold + buffer : threshold;
        if (topRd <= rdThreshold) {
          return 'rd';
        }

        // Check Services
        const servicesThreshold = current === 'services' ? threshold + buffer : threshold;
        if (topServices <= servicesThreshold) {
          return 'services';
        }

        // Check About
        const aboutThreshold = current === 'about' ? threshold + buffer : threshold;
        if (topAbout <= aboutThreshold) {
          return 'about';
        }

        // Treat Home as everything before #about
        return 'home';
      });
    };

    // Setup IntersectionObserver for sections
    const observer = new IntersectionObserver(
      () => {
        updateActiveSectionOnScroll();
      },
      {
        root: null,
        rootMargin: '-72px 0px 0px 0px',
        threshold: [0, 0.1],
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Throttled scroll listener to ensure high responsiveness during fast scrolling
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateActiveSectionOnScroll();
          rafId = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
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

  const handleNavClick = useCallback(
    (id: string, e: React.MouseEvent) => {
      setIsMobileMenuOpen(false);

      if ((ROUTE_SECTION_IDS as readonly string[]).includes(id)) {
        return;
      }

      e.preventDefault();
      setActiveSection(id);
      isClickScrollingRef.current = true;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 800);

      if (location.pathname === '/') {
        scrollToSectionTarget(id, true);
        const targetHash = id === 'home' ? '' : `#${id}`;
        if (location.hash !== targetHash) {
          navigate(id === 'home' ? '/' : `/#${id}`, { replace: false });
        }
      } else {
        navigate(id === 'home' ? '/' : `/#${id}`);
      }
    },
    [location.pathname, location.hash, navigate]
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-subtle relative">
      <PageContainer width="wide" className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[68px]">
          {/* Brand Identity */}
          <Link
            to="/"
            onClick={(e) => handleNavClick('home', e)}
            className="flex items-center gap-3 text-[#1B2A4A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] rounded-lg p-1 -ml-1 transition-opacity hover:opacity-90"
            aria-label="Shank's Code Edutech Home"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#1B2A4A] text-white shadow-xs shrink-0">
              <Code2 className="w-5 h-5 text-white" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-[#1B2A4A] leading-none">
                SHANK'S CODE
              </span>
              <span className="text-[10px] font-semibold text-[#5C6F97] tracking-wider uppercase mt-1">
                Edutech &bull; Applied R&amp;D
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="Primary Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const linkClasses = `text-sm font-medium transition-colors px-3 py-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] select-none nav-link-draw ${
                isActive
                  ? 'text-[#1B2A4A] font-semibold active bg-[#FDF3D9] border-b-2 border-[#D9A62B]'
                  : 'text-[#5C6F97] hover:text-[#1B2A4A]'
              }`;

              if (item.isRoute) {
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
              }

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.id, e)}
                  className={linkClasses}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Student Portal Action */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center font-semibold transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white px-3.5 py-1.5 text-xs rounded-lg gap-1.5 min-h-[36px] bg-[#1B2A4A] text-white hover:bg-[#2F4368] active:bg-[#0F1930] shadow-sm border border-[#1B2A4A]/40 focus-visible:ring-[#1B2A4A] btn-bloom"
            >
              <span>Student Portal</span>
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
              const isActive = activeSection === item.id;
              const mobileLinkClasses = `flex items-center justify-between text-base font-medium px-3.5 py-2.5 rounded-lg transition-colors select-none ${
                isActive
                  ? 'text-[#1B2A4A] font-semibold bg-[#FDF3D9] border-l-4 border-[#D9A62B]'
                  : 'text-[#5C6F97] hover:text-[#1B2A4A] hover:bg-[#EEF1F6]'
              }`;

              if (item.isRoute) {
                return (
                  <Link
                    key={item.id}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={mobileLinkClasses}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.id, e)}
                  className={mobileLinkClasses}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-[#D3DAE6]">
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center font-semibold transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white px-4 py-2.5 text-sm rounded-lg gap-2 min-h-[44px] bg-[#1B2A4A] text-white hover:bg-[#2F4368] active:bg-[#0F1930] shadow-sm border border-[#1B2A4A]/40 focus-visible:ring-[#1B2A4A]"
            >
              <span>Student Portal</span>
              <ArrowUpRight className="w-4 h-4 text-white" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

