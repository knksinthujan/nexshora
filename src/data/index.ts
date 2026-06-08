// ============================================================
// SutriGo — Sri Lanka Tourism Data
// ============================================================
import type {
  Destination,
  Park,
  Package,
  Product,
  Testimonial,
  ParkRide,
  Facility,
} from '@/types';

export const DESTINATIONS: Destination[] = [
  { id: 'sigiriya',     name: 'Sigiriya',     country: 'North Central, LK', img: 'https://images.unsplash.com/photo-1583109193439-2e7d5e51e42a?w=1200&q=70&auto=format&fit=crop', trips: 218, tag: 'Most loved' },
  { id: 'kandy',        name: 'Kandy',        country: 'Central, LK',       img: 'https://images.unsplash.com/photo-1582407947304-fd86f28f3316?w=1200&q=70&auto=format&fit=crop', trips: 184, tag: 'Cultural capital' },
  { id: 'ella',         name: 'Ella',         country: 'Uva Province, LK',  img: 'https://images.unsplash.com/photo-1586861203927-800a5acdce4d?w=1200&q=70&auto=format&fit=crop', trips: 162, tag: 'Hill country' },
  { id: 'galle',        name: 'Galle',        country: 'Southern, LK',      img: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200&q=70&auto=format&fit=crop', trips: 139, tag: "Editor's pick" },
  { id: 'mirissa',      name: 'Mirissa',      country: 'Southern Coast, LK',img: 'https://images.unsplash.com/photo-1559592413-7cbb3e8c4c7b?w=1200&q=70&auto=format&fit=crop', trips: 121, tag: 'Whale coast' },
  { id: 'trincomalee',  name: 'Trincomalee',  country: 'Eastern, LK',       img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=70&auto=format&fit=crop', trips:  94, tag: 'East coast gem' },
];

export const PARKS: Park[] = [
  { id: 'reecha',     name: 'Reecha Organic Theme Park',          country: 'Kilinochchi, LK',    price: 15, rating: 4.8, reviews: 8400, hours: '08:00 – 18:00', tags: ['Organic', 'Family'],   thrill: 'Family', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=70&auto=format&fit=crop' },
  { id: 'yala',       name: 'Yala National Park',          country: 'Southern, LK',       price: 35, rating: 4.9, reviews: 28400, hours: '06:00 – 18:00', tags: ['Wildlife', 'Leopards'],   thrill: 'Mixed',  img: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=1400&q=70&auto=format&fit=crop' },
  { id: 'udawalawe',  name: 'Udawalawe National Park',     country: 'Sabaragamuwa, LK',   price: 25, rating: 4.8, reviews: 19200, hours: '06:00 – 18:00', tags: ['Elephants', 'Safari'],    thrill: 'Family', img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1400&q=70&auto=format&fit=crop' },
  { id: 'pinnawala',  name: 'Pinnawala Elephant Orphanage',country: 'Sabaragamuwa, LK',   price: 18, rating: 4.7, reviews: 32100, hours: '08:30 – 17:30', tags: ['Elephants', 'Family'],    thrill: 'Family', img: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=1400&q=70&auto=format&fit=crop' },
  { id: 'horton',     name: "Horton Plains National Park", country: "Central Highlands, LK",price:12, rating: 4.6, reviews: 14800, hours: '06:00 – 18:00', tags: ["World's End", 'Hiking'], thrill: 'Mixed',  img: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=1400&q=70&auto=format&fit=crop' },
  { id: 'minneriya', name: 'Minneriya National Park',      country: 'North Central, LK',  price: 22, rating: 4.7, reviews: 11600, hours: '06:00 – 18:00', tags: ['Elephants', 'Gathering'], thrill: 'Family', img: 'https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=1400&q=70&auto=format&fit=crop' },
  { id: 'wilpattu',  name: 'Wilpattu National Park',       country: 'North Western, LK',  price: 28, rating: 4.5, reviews:  8900, hours: '06:00 – 18:00', tags: ['Leopards', 'Lakes'],      thrill: 'Thrill', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1400&q=70&auto=format&fit=crop' },
];

export const PACKAGES: Package[] = [
  { id: 'p1', name: 'Cultural Triangle Explorer', nights: 5, price:  980, rating: 4.9, img: 'https://images.unsplash.com/photo-1583109193439-2e7d5e51e42a?w=1200&q=70&auto=format&fit=crop' },
  { id: 'p2', name: 'Hill Country Retreat',       nights: 6, price: 1240, rating: 4.8, img: 'https://images.unsplash.com/photo-1586861203927-800a5acdce4d?w=1200&q=70&auto=format&fit=crop' },
  { id: 'p3', name: 'Wildlife & Beach Escape',    nights: 7, price: 1650, rating: 4.9, img: 'https://images.unsplash.com/photo-1559592413-7cbb3e8c4c7b?w=1200&q=70&auto=format&fit=crop' },
  { id: 'p4', name: 'Island-Wide Grand Tour',     nights: 10,price: 2490, rating: 4.8, img: 'https://images.unsplash.com/photo-1582407947304-fd86f28f3316?w=1200&q=70&auto=format&fit=crop' },
];

export const PRODUCTS: Product[] = [
  { id: 'h1', name: 'Ceylon Silver Tips White Tea', origin: 'Nuwara Eliya', price: 22, cat: 'Herbal',     img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=70&auto=format&fit=crop' },
  { id: 'h2', name: 'Pure Ceylon Cinnamon Sticks',  origin: 'Kandy',        price: 16, cat: 'Foods',      img: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=70&auto=format&fit=crop' },
  { id: 'h3', name: 'Cold-Pressed Coconut Oil',     origin: 'Kurunegala',   price: 28, cat: 'Natural',    img: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=70&auto=format&fit=crop' },
  { id: 'h4', name: 'Wild Forest Honey, Raw',       origin: 'Knuckles',     price: 38, cat: 'Foods',      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=70&auto=format&fit=crop' },
  { id: 'h5', name: 'Handcrafted Lacquerware Bowl', origin: 'Kandy',        price: 34, cat: 'Souvenirs',  img: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=800&q=70&auto=format&fit=crop' },
  { id: 'h6', name: 'Hand-Painted Batik Sarong',    origin: 'Galle',        price: 26, cat: 'Souvenirs',  img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=70&auto=format&fit=crop' },
  { id: 'h7', name: 'Fresh King Coconuts (6 pack)', origin: 'Negombo',      price: 12, cat: 'Fruits',     img: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&q=70&auto=format&fit=crop' },
  { id: 'h8', name: 'Organic Roasted Cashew Nuts',  origin: 'Jaffna',       price: 18, cat: 'Foods',      img: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&q=70&auto=format&fit=crop' },
];

export const TESTIMONIALS: Testimonial[] = [
  { quote: "Sigiriya at sunrise with a private guide — completely life-changing. SutriGo handled every detail from the airport transfer to the rock climb permit.", author: 'Amara S.',  meta: 'Sigiriya · Cultural Triangle' },
  { quote: "The Ella train journey and tea plantation visit were perfectly timed. I never once had to worry about logistics — everything just worked.", author: 'James R.',  meta: 'Ella · Hill Country Retreat' },
  { quote: "Whale watching in Mirissa followed by a Yala safari in the same week. Sri Lanka is extraordinary and SutriGo made it feel effortless.", author: 'Priya M.',  meta: 'Mirissa · Wildlife & Beach' },
];

export const PARK_RIDES: ParkRide[] = [
  { name: 'Leopard Safari Drive',    type: 'Thrill', height: 'All',   wait: 30, intensity: 4 },
  { name: 'Elephant River Watch',    type: 'Family', height: 'All',   wait: 10, intensity: 1 },
  { name: 'Bird Hide Trail',         type: 'Family', height: 'All',   wait: 15, intensity: 2 },
  { name: 'Jeep Night Safari',       type: 'Thrill', height: 'All',   wait: 20, intensity: 3 },
  { name: "World's End Trek",        type: 'Tech',   height: 'All',   wait: 45, intensity: 4 },
  { name: 'Boat Lagoon Cruise',      type: 'Family', height: 'All',   wait:  5, intensity: 1 },
];

export const FACILITIES: Facility[] = [
  { icon: 'pool',   label: 'Watering Holes' },
  { icon: 'food',   label: 'Jungle Café' },
  { icon: 'wifi',   label: 'Ranger Station' },
  { icon: 'shield', label: 'On-site Medical' },
  { icon: 'bag',    label: 'Equipment Hire' },
  { icon: 'truck',  label: 'Safari Jeeps' },
];
