import type {
  ElementType,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';

type RevealProps<T extends ElementType = 'div'> = PropsWithChildren<
  HTMLAttributes<HTMLElement> & {
    delay?: 1 | 2 | 3 | 4 | 5 | 6;
    as?: T;
  }
>;

/**
 * Wraps content with a `.reveal` class. When combined with `useReveal()` in a
 * parent component, the element animates in once scrolled into view.
 */
export function Reveal<T extends ElementType = 'div'>({
  children,
  delay,
  className = '',
  as,
  ...rest
}: RevealProps<T>) {
  const Component = (as || 'div') as ElementType;

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