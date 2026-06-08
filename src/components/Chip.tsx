import type { ReactNode } from 'react';
import { Icon } from './Icon';
import type { IconName } from '@/types';

export type ChipTone = 'default' | 'primary' | 'gold' | 'success' | 'line';

type ChipProps = {
  tone?: ChipTone;
  icon?: IconName;
  children?: ReactNode;
};

export function Chip({ tone = 'default', children, icon }: ChipProps) {
  const cls = tone === 'default' ? 'chip' : `chip chip-${tone}`;
  return (
    <span className={cls}>
      {icon && <Icon name={icon} size={12} />}
      {children}
    </span>
  );
}
