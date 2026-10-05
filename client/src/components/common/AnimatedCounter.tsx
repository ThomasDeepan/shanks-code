import React, { useState, useEffect, useRef } from 'react';

export interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = '',
  prefix = '',
  duration = 1200,
  className = '',
}) => {
  const [count, setCount] = useState<number>(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    const isReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReduced) {
      setCount(target);
      hasAnimatedRef.current = true;
      return;
    }

    const currentEl = elementRef.current;
    if (!currentEl) return;

    if (!('IntersectionObserver' in window)) {
      setCount(target);
      hasAnimatedRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            observer.unobserve(entry.target);

            // Animate count-up with ease-out cubic
            const startTime = performance.now();
            const startVal = 0;

            const update = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(1, elapsed / duration);
              // Ease-out cubic: 1 - (1 - t)^3
              const ease = 1 - Math.pow(1 - progress, 3);
              const currentCount = Math.round(startVal + (target - startVal) * ease);

              setCount(currentCount);

              if (progress < 1) {
                requestAnimationFrame(update);
              } else {
                setCount(target);
              }
            };

            requestAnimationFrame(update);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.disconnect();
    };
  }, [target, duration]);

  return (
    <span ref={elementRef} className={`tabular-nums font-mono ${className}`}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
