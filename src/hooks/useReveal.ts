import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function useReveal(): void {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>('.reveal');
      els.forEach((el) => {
        const d = Number(el.dataset.delay ?? 0) * 0.1;
        gsap.fromTo(
          el,
          { y: 56, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            delay: d,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);
}

// Re-run ScrollTrigger refresh after fonts/images load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
