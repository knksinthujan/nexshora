import { Icon } from './Icon';

type StarRowProps = {
  value?: number;
  size?: number;
};

export function StarRow({ value = 4.7, size = 13 }: StarRowProps) {
  return (
    <span className="stars-row">
      <Icon
        name="star"
        size={size}
        strokeWidth={0}
        style={{ fill: 'var(--accent)', color: 'var(--accent)' }}
      />
      <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{value.toFixed(1)}</span>
    </span>
  );
}
