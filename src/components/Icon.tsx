import type { CSSProperties, ReactNode } from 'react';
import type { IconName } from '@/types';

type IconProps = {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
};

const PATHS: Record<IconName, ReactNode> = {
  search:      <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  heart:       <path d="M12 21s-7-4.5-9.3-9.1A5 5 0 0 1 12 6.5 5 5 0 0 1 21.3 11.9C19 16.5 12 21 12 21Z" />,
  cart:        <><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /><path d="M3 4h2l2.5 11.5a2 2 0 0 0 2 1.5h7.6a2 2 0 0 0 2-1.5L21 8H6" /></>,
  user:        <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  moon:        <path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10Z" />,
  sun:         <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  star:        <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17.8 6.6 20l1-6.1L3.2 9.5l6.1-.9L12 3Z" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight:<path d="m9 6 6 6-6 6" />,
  chevronLeft: <path d="m15 6-6 6 6 6" />,
  chevronUp:   <path d="m6 15 6-6 6 6" />,
  arrowRight:  <path d="M5 12h14M13 5l7 7-7 7" />,
  arrowUpRight:<path d="M7 17 17 7M9 7h8v8" />,
  plus:        <path d="M12 5v14M5 12h14" />,
  minus:       <path d="M5 12h14" />,
  close:       <path d="M6 6l12 12M18 6 6 18" />,
  menu:        <path d="M4 7h16M4 12h16M4 17h16" />,
  filter:      <path d="M4 5h16M7 12h10M10 19h4" />,
  grid:        <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  list:        <path d="M4 6h16M4 12h16M4 18h16" />,
  pin:         <><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13Z" /><circle cx="12" cy="9" r="2.5" /></>,
  calendar:    <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  clock:       <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  plane:       <path d="M22 3 2 11l7 2 2 7 11-17Z" />,
  bed:         <path d="M3 18V8m0 2h14a4 4 0 0 1 4 4v4M3 14h18" />,
  ticket:      <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V9Z" />,
  map:         <path d="M9 4 3 7v13l6-3 6 3 6-3V4l-6 3-6-3Zm0 0v13m6-10v13" />,
  compass:     <><circle cx="12" cy="12" r="9" /><path d="m15 9-2 6-4 0 2-6 4 0Z" /></>,
  palmTree:    <path d="M12 21V11M12 11c-2-2-6-3-9-1 2-3 6-4 9-3 0-3 2-5 5-5-1 3-1 5-3 6 3 1 4 4 4 7-2-2-5-3-6-4Z" />,
  leaf:        <path d="M5 21s0-9 7-13c4-2 9-2 9-2s0 6-3 10c-3 4-7 5-13 5Zm0 0L17 9" />,
  sparkle:     <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M6 18l3-3M15 9l3-3" />,
  shield:      <path d="M12 3 4 6v6c0 5 4 8 8 9 4-1 8-4 8-9V6l-8-3Z" />,
  wifi:        <path d="M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0M12 19h.01" />,
  pool:        <path d="M3 18s2-1 4 0 4 1 6 0 4-1 6 0 2 0 2 0M3 14s2-1 4 0 4 1 6 0 4-1 6 0M8 3v9M16 3v9M8 7h8" />,
  coffee:      <path d="M3 8h14v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Zm14 1h2a2 2 0 0 1 0 4h-2M7 3v2M11 3v2M15 3v2" />,
  food:        <><path d="M3 11h18M5 11v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-6" /><path d="M7 11V8a5 5 0 0 1 10 0v3" /></>,
  bag:         <><path d="M5 8h14l-1 12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
  truck:       <path d="M3 6h11v11H3zM14 9h4l3 3v5h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
  bell:        <path d="M6 8a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7Zm4 11a2 2 0 0 0 4 0" />,
  settings:    <><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4.8a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.4a7 7 0 0 0-2 1.2L5.1 5.8l-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-.8a7 7 0 0 0 2 1.2L10 21h4l.5-2.4a7 7 0 0 0 2-1.2l2.4.8 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z" /></>,
  logout:      <path d="M9 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4M15 8l4 4-4 4M19 12H9" />,
  chart:       <path d="M3 21h18M5 17v-5M10 17v-9M15 17V8M20 17v-3" />,
  trending:    <path d="m3 17 6-6 4 4 8-8M14 7h7v7" />,
  play:        <path d="M6 4v16l14-8Z" />,
  twitter:     <path d="M22 5.8a8 8 0 0 1-2.4.7 4 4 0 0 0 1.8-2.2 8 8 0 0 1-2.6 1 4 4 0 0 0-6.8 3.6A11.4 11.4 0 0 1 3 4s-4 9 5 13a11.6 11.6 0 0 1-7 2c9 5 20 0 20-11.6 0-.2 0-.5-.1-.8A8.3 8.3 0 0 0 22 5.8Z" />,
  instagram:   <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></>,
  facebook:    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />,
  youtube:     <><path d="M22 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.8C16 5 12 5 12 5s-4 0-7.2.2c-.4 0-1.2 0-2 .8C2.2 6.6 2 8 2 8s-.2 1.6-.2 3.2v1.5C1.8 14.4 2 16 2 16s.2 1.4.8 2c.8.8 1.8.8 2.3 1 1.7.1 7 .2 7 .2s4 0 7.2-.2c.4-.1 1.2-.1 2-1 .6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22.2 9.6 22 8 22 8Z" /><path d="m10 9 5 3-5 3V9Z" /></>,
  check:       <path d="m5 12 5 5L20 7" />,
  info:        <><circle cx="12" cy="12" r="9" /><path d="M12 8v.01M11 12h1v5h1" /></>,
  fire:        <path d="M12 3s4 4 4 9a4 4 0 1 1-8 0c0-2 2-3 2-5 0 0 2 1 2-4Z" />,
  download:    <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />,
};

export function Icon({ name, size = 18, strokeWidth = 1.6, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {PATHS[name]}
    </svg>
  );
}
