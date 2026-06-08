import { useEffect, useRef } from 'react';

export type MouseState = { x: number; y: number };

export function useMouseParallax(strength = 1) {
  const mouse    = useRef<MouseState>({ x: 0, y: 0 });
  const smoothed = useRef<MouseState>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2 * strength;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2 * strength;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [strength]);

  return { mouse, smoothed };
}
