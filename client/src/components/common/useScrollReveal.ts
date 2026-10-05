import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * useScrollReveal
 * Progressive-enhancement scroll reveal system.
 *
 * SAFETY GUARANTEES:
 * 1. Content is ALWAYS 100% visible by default in CSS (.reveal-on-scroll { opacity: 1; transform: none; }).
 * 2. Unrevealed elements are NEVER hidden with opacity: 0.
 * 3. When an element enters the viewport, .is-revealed triggers a subtle entrance animation.
 * 4. If JavaScript or IntersectionObserver fails, all content remains completely visible.
 * 5. Re-observes on route transitions (location.pathname).
 * 6. Completely disabled under prefers-reduced-motion.
 */
export function useScrollReveal(containerRef?: React.RefObject<HTMLElement | null>) {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = containerRef?.current || document;

    if (isReduced || !('IntersectionObserver' in window)) {
      root.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -20px 0px',
        threshold: 0.05,
      }
    );

    const observeElements = () => {
      const currentRoot = containerRef?.current || document;
      const elements = currentRoot.querySelectorAll('.reveal-on-scroll');
      elements.forEach((el) => {
        if (!el.classList.contains('is-revealed')) {
          observer.observe(el);
        }
      });
    };

    observeElements();

    // Check again on next frame in case of child component mount reflows
    const rafId = requestAnimationFrame(observeElements);

    // MutationObserver to attach to dynamically loaded elements
    let mutationObserver: MutationObserver | null = null;
    try {
      const targetNode = containerRef?.current || document.body;
      if (targetNode) {
        mutationObserver = new MutationObserver(() => {
          observeElements();
        });
        mutationObserver.observe(targetNode, {
          childList: true,
          subtree: true,
        });
      }
    } catch {
      // Ignore if MutationObserver is unsupported
    }

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
    };
  }, [containerRef, location.pathname]);
}

export default useScrollReveal;
