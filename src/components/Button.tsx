import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from './Icon';
import type { IconName } from '@/types';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'gold';
export type ButtonSize = 'sm' | 'lg';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconRight?: IconName;
  children?: ReactNode;
};

export function Button({
  variant = 'primary',
  size,
  icon,
  iconRight,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const cls = [
    'btn',
    `btn-${variant}`,
    size ? `btn-${size}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button className={cls} {...rest}>
      {icon && <Icon name={icon} size={16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={16} />}
    </button>
  );
}
