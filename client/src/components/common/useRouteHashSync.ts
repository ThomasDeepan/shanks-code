import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const SECTION_IDS = ['home', 'about', 'services', 'rd'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

/**
 * Resolves a section DOM element by section ID or alias.
 */
export function resolveSectionElement(targetId: string): HTMLElement | null {
  const clean = targetId.replace(/^#/, '').toLowerCase();
  const id = clean === 'rnd' ? 'rd' : clean;
  return document.getElementById(id);
}

/**
 * Performs a reliable scroll to a section target, accounting for the sticky navbar.
 */
export function scrollToSectionTarget(targetId: string, smooth: boolean = true): boolean {
  const clean = targetId.replace(/^#/, '').toLowerCase();

  if (clean === 'home' || clean === '') {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    return true;
  }

  const el = resolveSectionElement(clean);
  if (!el) return false;

  // Account for sticky header (~68px) with extra breathing room
  const navOffset = 72;
  const targetY = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - navOffset));

  window.scrollTo({
    top: targetY,
    behavior: smooth ? 'smooth' : 'auto',
  });

  // Ensure content in the target section is revealed immediately
  const revealElements = el.querySelectorAll('.reveal-on-scroll');
  revealElements.forEach((child) => {
    child.classList.remove('reveal-init');
    child.classList.add('is-revealed');
  });

  return true;
}

/**
 * useRouteHashSync
 * Reliable 5-step hash and route synchronization sequence:
 * 1. React route/page is mounted
 * 2. DOM section exists (waits via requestAnimationFrame without arbitrary timeouts)
 * 3. Hash is resolved
 * 4. Scroll is performed
 * 5. Reveal/animation state cannot hide the target section
 */
export function useRouteHashSync() {
  const { pathname, hash } = useLocation();
  const lastPathnameRef = useRef(pathname);
  const lastHashRef = useRef(hash);
  const isFirstMountRef = useRef(true);

  useEffect(() => {
    // Enable manual scroll restoration so SPA controls scroll transitions deterministically
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isFirstMount = isFirstMountRef.current;
    isFirstMountRef.current = false;

    const isRouteChange = lastPathnameRef.current !== pathname;
    const isHashChange = lastHashRef.current !== hash;
    lastPathnameRef.current = pathname;
    lastHashRef.current = hash;

    if (hash) {
      const cleanHash = hash.replace(/^#/, '').toLowerCase();
      const targetId = cleanHash === 'rnd' ? 'rd' : cleanHash;

      let frameCount = 0;
      const maxFrames = 15; // ~240ms max across animation frames

      // Direct landing, first mount, or route transition: instant alignment
      // In-page hash change: smooth
      const smooth = !isFirstMount && !isRouteChange && isHashChange;

      const performSync = () => {
        const el = resolveSectionElement(targetId);
        if (el) {
          scrollToSectionTarget(targetId, smooth);
        } else if (frameCount < maxFrames) {
          frameCount++;
          requestAnimationFrame(performSync);
        }
      };

      requestAnimationFrame(performSync);
    } else {
      // Navigating to a route without hash: always scroll to top immediately
      if (isRouteChange || isFirstMount) {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    }
  }, [pathname, hash]);
}

export default useRouteHashSync;
