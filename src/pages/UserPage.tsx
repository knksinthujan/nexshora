import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { Chip } from '@/components/Chip';
import { ParkCard } from '@/components/ParkCard';
import { useReveal } from '@/hooks/useReveal';
import { useRouter } from '@/context/RouterContext';
import { PARKS } from '@/data';
import type { IconName } from '@/types';

type UserTab =
  | 'overview'
  | 'bookings'
  | 'wishlist'
  | 'orders'
  | 'profile'
  | 'payments'
  | 'notifs';

type NavItem = {
  id: UserTab;
  label: string;
  icon: IconName;
};

const USER_NAV: NavItem[] = [
  { id: 'overview', label: 'Overview',        icon: 'grid' },
  { id: 'bookings', label: 'My bookings',     icon: 'ticket' },
  { id: 'wishlist', label: 'Wishlist',        icon: 'heart' },
  { id: 'orders',   label: 'Orders',          icon: 'bag' },
  { id: 'profile',  label: 'Profile',         icon: 'user' },
  { id: 'payments', label: 'Payment methods', icon: 'shield' },
  { id: 'notifs',   label: 'Notifications',   icon: 'bell' },
];

export function UserPage() {
  useReveal();
  const [active, setActive] = useState<UserTab>('overview');
  const { go } = useRouter();

  return (
    <div className="dash page-fade">
      <aside className="dash-side">
        <div
          className="row"
          style={{
            gap: 12,
            padding: '12px 14px 24px',
            borderBottom: '1px solid var(--line)',
          }}
        >
          <div className="avatar" style={{ width: 44, height: 44, fontSize: 14 }}>MR</div>
          <div>
            <div className="fw-600 text-sm">Maya Reyes</div>
            <div className="text-xs muted">Gold member · since '22</div>
          </div>
        </div>
        <div className="dash-side-section" style={{ marginTop: 16 }}>Account</div>
        <div className="dash-nav">
          {USER_NAV.map((n) => (
            <div
              key={n.id}
              className={`dash-nav-item ${active === n.id ? 'is-active' : ''}`}
              onClick={() => setActive(n.id)}
            >
              <Icon name={n.icon} size={16} />{n.label}
            </div>
          ))}
        </div>
        <div className="dash-side-section" style={{ marginTop: 16 }}>Other</div>
        <div className="dash-nav">
          <div className="dash-nav-item"><Icon name="settings" size={16} />Settings</div>
          <div className="dash-nav-item" onClick={() => go('home')}>
            <Icon name="logout" size={16} />Sign out
          </div>
        </div>
      </aside>

      <main className="dash-main">
        {active === 'overview' && <UserOverview onTab={setActive} />}
        {active === 'bookings' && <UserBookings />}
        {active === 'wishlist' && <UserWishlist />}
        {active === 'orders'   && <UserOrders />}
        {active === 'profile'  && <UserProfile />}
        {active === 'payments' && <UserPayments />}
        {active === 'notifs'   && <UserNotifs />}
      </main>
    </div>
  );
}

function UserOverview({ onTab }: { onTab: (tab: UserTab) => void }) {
  const upcoming = [
    {
      name: 'Bali Cliff Retreat',
      date: 'Aug 12 – 19',
      img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&q=70&auto=format&fit=crop',
      status: 'Confirmed',
      count: '7 nights · 3 travellers',
    },
    {
      name: 'Atlantis Aquaventure',
      date: 'Aug 16',
      img: 'https://images.unsplash.com/photo-1605369572399-05d8d64a0f5b?w=300&q=70&auto=format&fit=crop',
      status: 'Confirmed',
      count: 'Day pass · 3 tickets',
    },
  ];
  const kpis = [
    { l: 'Trips this year',    v: 4,       delta: "+2 vs '25" },
    { l: 'Saved destinations', v: 18,      delta: '+5 this month' },
    { l: 'Reward points',      v: '2,840', delta: '+340' },
    { l: 'Tier progress',      v: '78%',   delta: 'Platinum at 100%' },
  ];

  return (
    <>
      <Reveal>
        <div className="row-between" style={{ marginBottom: 32 }}>
          <div>
            <span className="eyebrow">Welcome back</span>
            <h1 style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginTop: 8 }}>Hello, Maya.</h1>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <Button variant="secondary" icon="search">Find a trip</Button>
            <Button variant="primary" icon="plus">New booking</Button>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="profile-card">
          <div className="av">MR</div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 22 }}>Maya Reyes</h3>
            <div className="text-sm muted">maya.reyes@example.com · New York, NY</div>
            <div className="row mt-16" style={{ gap: 8 }}>
              <Chip tone="gold" icon="sparkle">Gold Member</Chip>
              <Chip tone="primary">12 trips taken</Chip>
              <Chip tone="success">3,840 miles</Chip>
            </div>
          </div>
          <Button variant="secondary" onClick={() => onTab('profile')}>Edit profile</Button>
        </div>
      </Reveal>

      <h3 className="mt-48 mb-16" style={{ marginTop: 48, marginBottom: 16, fontSize: 18 }}>
        Upcoming trips
      </h3>
      <div className="row" style={{ flexDirection: 'column', gap: 12 }}>
        {upcoming.map((b, i) => (
          <Reveal key={i} delay={(i + 1) as 1 | 2}>
            <div className="booking-history-card">
              <div className="bh-img" style={{ backgroundImage: `url('${b.img}')` }} />
              <div>
                <h4 className="mb-8">{b.name}</h4>
                <div className="bh-meta mt-8">
                  <span className="row" style={{ gap: 6 }}>
                    <Icon name="calendar" size={13} />{b.date}
                  </span>
                  <span>·</span>
                  <span>{b.count}</span>
                </div>
                <Chip tone="success" icon="check">{b.status}</Chip>
              </div>
              <div className="row" style={{ gap: 8 }}>
                <Button variant="secondary" size="sm">Manage</Button>
                <Button variant="dark" size="sm" iconRight="arrowRight">View itinerary</Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="kpi-grid mt-48" style={{ marginTop: 48 }}>
        {kpis.map((k, i) => (
          <Reveal key={k.l} delay={(i + 1) as 1 | 2 | 3 | 4}>
            <div className="kpi">
              <div className="l">{k.l}</div>
              <div className="v">{k.v}</div>
              <div className="delta up">
                <Icon name="trending" size={12} />{k.delta}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <h3 className="mt-48 mb-16" style={{ marginTop: 48, marginBottom: 16, fontSize: 18 }}>
        From your wishlist
      </h3>
      <div className="park-grid">
        {PARKS.slice(3, 6).map((p, i) => (
          <Reveal key={p.id} delay={(i + 1) as 1 | 2 | 3}>
            <ParkCard park={p} />
          </Reveal>
        ))}
      </div>
    </>
  );
}

function UserBookings() {
  const bookings = [
    { name: 'Bali Cliff Retreat',    date: 'Aug 12 – 19', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&q=70&auto=format&fit=crop', type: 'Package',     status: 'Confirmed', code: 'SUTR-A48292' },
    { name: 'Atlantis Aquaventure',  date: 'Aug 16',       img: 'https://images.unsplash.com/photo-1605369572399-05d8d64a0f5b?w=300&q=70&auto=format&fit=crop', type: 'Park ticket', status: 'Confirmed', code: 'SUTR-A48312' },
    { name: 'Six Senses Uluwatu',    date: 'Aug 12 – 19', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&q=70&auto=format&fit=crop', type: 'Stay',        status: 'Confirmed', code: 'SUTR-A48292-H' },
    { name: 'Sunset Catamaran Tour', date: 'Aug 15',       img: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=300&q=70&auto=format&fit=crop', type: 'Tour',        status: 'Pending',   code: 'SUTR-A48315' },
  ];
  return (
    <>
      <Reveal>
        <h1 style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: 8 }}>Bookings</h1>
        <p className="muted mb-16" style={{ marginBottom: 24 }}>
          All upcoming and past reservations across stays, parks, flights and
          tours.
        </p>
      </Reveal>
      <div className="cat-tabs" style={{ marginBottom: 24, width: 'fit-content' }}>
        {['Upcoming', 'Past', 'Cancelled'].map((t, i) => (
          <button key={t} className={`cat-tab ${i === 0 ? 'is-active' : ''}`}>{t}</button>
        ))}
      </div>
      <div className="row" style={{ flexDirection: 'column', gap: 12 }}>
        {bookings.map((b, i) => (
          <Reveal key={b.code} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
            <div className="booking-history-card">
              <div className="bh-img" style={{ backgroundImage: `url('${b.img}')` }} />
              <div>
                <div className="row mb-8" style={{ gap: 8, marginBottom: 6 }}>
                  <Chip>{b.type}</Chip>
                  <Chip
                    tone={b.status === 'Confirmed' ? 'success' : 'default'}
                    icon={b.status === 'Confirmed' ? 'check' : 'clock'}
                  >
                    {b.status}
                  </Chip>
                </div>
                <h4>{b.name}</h4>
                <div className="bh-meta mt-8">
                  <Icon name="calendar" size={13} />{b.date} · {b.code}
                </div>
              </div>
              <div className="row" style={{ gap: 8 }}>
                <Button variant="secondary" size="sm">Manage</Button>
                <Button variant="dark" size="sm" iconRight="arrowRight">Itinerary</Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}

function UserWishlist() {
  return (
    <>
      <Reveal>
        <h1 style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: 8 }}>Wishlist</h1>
        <p className="muted mb-16" style={{ marginBottom: 32 }}>
          The destinations and parks you've saved. We'll notify you when prices
          drop.
        </p>
      </Reveal>
      <div className="park-grid">
        {PARKS.slice(0, 6).map((p, i) => (
          <Reveal key={p.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
            <ParkCard park={p} />
          </Reveal>
        ))}
      </div>
    </>
  );
}

function UserOrders() {
  const orders = [
    { id: 'SUTR-O7283', items: 'Ceylon Tea, Saffron, Manuka Honey', total: 118, status: 'Delivered',  date: 'Jul 28' },
    { id: 'SUTR-O7156', items: 'Argan Oil, Tomato Mix',             total: 46,  status: 'In transit', date: 'Jul 14' },
    { id: 'SUTR-O7012', items: 'Cacao Nibs, Heirloom Mangoes',      total: 46,  status: 'Delivered',  date: 'Jun 30' },
    { id: 'SUTR-O6890', items: 'Banana Basket, Manuka Honey',       total: 74,  status: 'Delivered',  date: 'Jun 18' },
  ];
  return (
    <>
      <Reveal>
        <h1 style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: 8 }}>Orders</h1>
        <p className="muted mb-16" style={{ marginBottom: 32 }}>
          Organic goods you've ordered. Track shipments and reorder favourites.
        </p>
      </Reveal>
      <div className="dash-table">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="name">{o.id}</td>
                <td>{o.items}</td>
                <td className="fw-600" style={{ color: 'var(--ink)' }}>${o.total}</td>
                <td>
                  <Chip tone={o.status === 'Delivered' ? 'success' : 'primary'}>
                    {o.status}
                  </Chip>
                </td>
                <td>{o.date}</td>
                <td>
                  <Button variant="ghost" size="sm" iconRight="arrowRight">
                    Track
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function UserProfile() {
  const fields: Array<[string, string]> = [
    ['First name', 'Maya'],
    ['Last name', 'Reyes'],
    ['Email', 'maya.reyes@example.com'],
    ['Phone', '+1 (212) 555 0188'],
    ['City', 'New York, NY'],
    ['Country', 'United States'],
    ['Passport', '·•·•·•·• 8842'],
    ['Birthday', 'March 14, 1991'],
  ];
  const prefs: Array<[string, string]> = [
    ['Dietary', 'Vegetarian, no shellfish'],
    ['Seat preference', 'Aisle, exit row'],
    ['Room preference', 'Quiet floor, no smoking'],
    ['Trip style', 'Slow travel, wellness, family-friendly'],
  ];
  return (
    <>
      <Reveal>
        <h1 style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: 32 }}>Profile</h1>
      </Reveal>
      <div className="profile-card mb-32" style={{ marginBottom: 32 }}>
        <div className="av">MR</div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 22 }}>Maya Reyes</h3>
          <div className="text-sm muted">Profile photo — JPG, PNG, max 2 MB</div>
        </div>
        <Button variant="secondary" icon="download">Upload</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {fields.map(([l, v]) => (
          <div key={l}>
            <label className="field-label">{l}</label>
            <input className="input" defaultValue={v} />
          </div>
        ))}
      </div>

      <h3 className="mt-48 mb-16" style={{ marginTop: 48, marginBottom: 16, fontSize: 18 }}>
        Preferences
      </h3>
      <div className="card" style={{ padding: 24 }}>
        {prefs.map(([l, v]) => (
          <div
            key={l}
            className="row-between"
            style={{ padding: '14px 0', borderBottom: '1px solid var(--line)' }}
          >
            <div>
              <div className="fw-600 text-sm">{l}</div>
              <div className="text-sm muted">{v}</div>
            </div>
            <Button variant="ghost" size="sm">Edit</Button>
          </div>
        ))}
      </div>
    </>
  );
}

type Card = {
  brand: string;
  last: string;
  exp: string;
  name: string;
  primary?: boolean;
  color: string;
};

function UserPayments() {
  const cards: Card[] = [
    { brand: 'VISA',       last: '4242', exp: '08/28', name: 'Maya Reyes', primary: true, color: 'linear-gradient(135deg, #0A4D68, #05BFDB)' },
    { brand: 'MASTERCARD', last: '1144', exp: '11/27', name: 'Maya Reyes',                color: 'linear-gradient(135deg, #1A1410, #4A423B)' },
  ];
  return (
    <>
      <Reveal>
        <div className="row-between" style={{ marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: 8 }}>
              Payment methods
            </h1>
            <p className="muted">Securely stored cards for one-tap booking.</p>
          </div>
          <Button variant="primary" icon="plus">Add new card</Button>
        </div>
      </Reveal>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 16,
        }}
      >
        {cards.map((c) => (
          <div
            key={c.last}
            style={{
              background: c.color,
              borderRadius: 'var(--r-xl)',
              padding: 24,
              color: '#fff',
              aspectRatio: '1.6/1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--sh-2)',
            }}
          >
            <div className="row-between">
              <div
                style={{
                  width: 32,
                  height: 24,
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: 4,
                }}
              />
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 14,
                  letterSpacing: '0.1em',
                }}
              >
                {c.brand}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 18,
                  letterSpacing: '0.2em',
                }}
              >
                •••• •••• •••• {c.last}
              </div>
              <div className="row-between mt-16">
                <div>
                  <div style={{ fontSize: 10, opacity: 0.6 }}>CARDHOLDER</div>
                  <div className="text-sm fw-600">{c.name}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, opacity: 0.6 }}>EXP</div>
                  <div className="text-sm fw-600">{c.exp}</div>
                </div>
                {c.primary && <Chip tone="gold">Primary</Chip>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

type Notif = {
  type: 'booking' | 'price' | 'ship' | 'review';
  title: string;
  body: string;
  when: string;
  unread?: boolean;
};

function UserNotifs() {
  const notifs: Notif[] = [
    { type: 'booking', title: 'Your Bali itinerary is ready',     body: 'Concierge Lina has uploaded restaurant reservations to your trip.',           when: '2h ago',    unread: true },
    { type: 'price',   title: 'Price drop — Maldives Overwater',   body: 'Down from $3,250 to $2,890 / pp. Limited inventory remaining for August.',   when: 'Yesterday', unread: true },
    { type: 'ship',    title: 'Manuka honey order delivered',      body: 'Order SUTR-O7283 was left at your front door at 11:42 AM.',                  when: '2 days ago' },
    { type: 'review',  title: 'How was Atlantis Aquaventure?',     body: 'Share a few words. We use them to improve future itineraries.',              when: '5 days ago' },
  ];
  const iconFor: Record<Notif['type'], IconName> = {
    booking: 'ticket',
    price: 'trending',
    ship: 'truck',
    review: 'star',
  };
  return (
    <>
      <Reveal>
        <h1 style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: 32 }}>Notifications</h1>
      </Reveal>
      <div className="card" style={{ padding: 0 }}>
        {notifs.map((n, i) => (
          <div
            key={i}
            className="row"
            style={{
              gap: 16,
              padding: '20px 24px',
              borderBottom: '1px solid var(--line)',
              background: n.unread
                ? 'color-mix(in oklch, var(--primary), transparent 96%)'
                : 'transparent',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'color-mix(in oklch, var(--primary), transparent 86%)',
                color: 'var(--primary)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 'none',
              }}
            >
              <Icon name={iconFor[n.type]} size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="row-between">
                <h4
                  className="text-sm"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
                >
                  {n.title}
                </h4>
                <span className="text-xs muted">{n.when}</span>
              </div>
              <p className="text-sm muted mt-8" style={{ marginTop: 4 }}>{n.body}</p>
            </div>
            {n.unread && (
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  flex: 'none',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
