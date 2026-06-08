import type { ElementType, HTMLAttributes, ReactNode } from 'react';

type RevealProps = HTMLAttributes<HTMLElement> & {
  delay?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: ElementType;
  children?: ReactNode;
};

/**
 * Wraps content with a `.reveal` class. When combined with `useReveal()` in a
 * parent component, the element animates in once scrolled into view.
 */
export function Reveal({
  children,
  delay,
  className = '',
  as: Tag = 'div',
  ...rest
}: RevealProps) {
  const Component = Tag as ElementType;
  return (
    <Component
      className={`reveal ${className}`.trim()}
      data-delay={delay}
      {...rest}
    >
      {children}
    </Component>
  );
}
