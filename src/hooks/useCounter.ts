import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Animates a number from `start` to `target` over `duration` ms.
 * Animation only fires when the ref enters the viewport.
 *
 * @returns [currentValue, ref] — bind ref to the element to observe.
 */
export function useCounter(
  target: number,
  duration = 1400,
  start = 0
): [number, RefObject<HTMLDivElement | null>] {
  const [val, setVal] = useState<number>(start);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number | undefined;
    let t0: number | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const tick = (t: number) => {
            if (t0 === undefined) t0 = t;
            const p = Math.min(1, (t - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.floor(start + (target - start) * eased));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) io.observe(ref.current);
    return () => {
      if (raf !== undefined) cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [target, duration, start]);

  return [val, ref];
}
