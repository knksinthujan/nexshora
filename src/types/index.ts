// ============================================================
// Sutrigo — Shared domain types
// ============================================================

export type Destination = {
  id: string;
  name: string;
  country: string;
  img: string;
  trips: number;
  tag: string;
};

export type Park = {
  id: string;
  name: string;
  country: string;
  price: number;
  rating: number;
  reviews: number;
  hours: string;
  tags: string[];
  thrill: 'Family' | 'Thrill' | 'Mixed';
  img: string;
};

export type Package = {
  id: string;
  name: string;
  nights: number;
  price: number;
  rating: number;
  img: string;
};

export type Product = {
  id: string;
  name: string;
  origin: string;
  price: number;
  cat: ProductCategory;
  img: string;
};

export type ProductCategory =
  | 'Herbal'
  | 'Natural'
  | 'Foods'
  | 'Souvenirs'
  | 'Fruits'
  | 'Vegetables';

export type Testimonial = {
  quote: string;
  author: string;
  meta: string;
};

export type ParkRide = {
  name: string;
  type: 'Thrill' | 'Family' | 'Water' | 'Tech';
  height: string;
  wait: number;
  intensity: 1 | 2 | 3 | 4 | 5;
};

export type Facility = {
  icon: IconName;
  label: string;
};

export type CartItem = Product & { qty: number };

// ----- Theme / Tweaks -----
export type ThemeState = {
  dark: boolean;
  primary: string;
  accent: string;
  heroVariant: 'cinematic' | 'editorial';
};

// ----- Router -----
export type Route = {
  page: PageId;
  params: Record<string, string | undefined>;
};

export type PageId =
  | 'home'
  | 'parks'
  | 'park'
  | 'booking'
  | 'market'
  | 'user'
  | 'admin';

// ----- Icons (string union of every name our <Icon /> supports) -----
export type IconName =
  | 'search'
  | 'heart'
  | 'cart'
  | 'user'
  | 'moon'
  | 'sun'
  | 'star'
  | 'chevronDown'
  | 'chevronRight'
  | 'chevronLeft'
  | 'chevronUp'
  | 'arrowRight'
  | 'arrowUpRight'
  | 'plus'
  | 'minus'
  | 'close'
  | 'menu'
  | 'filter'
  | 'grid'
  | 'list'
  | 'pin'
  | 'calendar'
  | 'clock'
  | 'plane'
  | 'bed'
  | 'ticket'
  | 'map'
  | 'compass'
  | 'palmTree'
  | 'leaf'
  | 'sparkle'
  | 'shield'
  | 'wifi'
  | 'pool'
  | 'coffee'
  | 'food'
  | 'bag'
  | 'truck'
  | 'bell'
  | 'settings'
  | 'logout'
  | 'chart'
  | 'trending'
  | 'play'
  | 'twitter'
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'check'
  | 'info'
  | 'fire'
  | 'download';
