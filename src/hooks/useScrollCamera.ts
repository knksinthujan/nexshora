import { useEffect, useRef } from 'react';

/** Returns a ref whose `.current` is scroll progress 0–1 over the full page height. */
export function useScrollCamera() {
  const progress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress;
}
