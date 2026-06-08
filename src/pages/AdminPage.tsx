import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { Chip } from '@/components/Chip';
import { StarRow } from '@/components/StarRow';
import { useReveal } from '@/hooks/useReveal';
import { useRouter } from '@/context/RouterContext';
import { PARKS, PRODUCTS } from '@/data';
import type { ChipTone } from '@/components/Chip';
import type { IconName } from '@/types';

type AdminTab =
  | 'overview'
  | 'parks'
  | 'bookings'
  | 'products'
  | 'orders'
  | 'customers'
  | 'analytics';

const ADMIN_NAV: Array<{ id: AdminTab; label: string; icon: IconName }> = [
  { id: 'overview',  label: 'Overview',   icon: 'grid' },
  { id: 'parks',     label: 'Theme Parks',icon: 'ticket' },
  { id: 'bookings',  label: 'Bookings',   icon: 'calendar' },
  { id: 'products',  label: 'Products',   icon: 'bag' },
  { id: 'orders',    label: 'Orders',     icon: 'truck' },
  { id: 'customers', label: 'Customers',  icon: 'user' },
  { id: 'analytics', label: 'Analytics',  icon: 'chart' },
];

export function AdminPage() {
  useReveal();
  const [active, setActive] = useState<AdminTab>('overview');
  const { go } = useRouter();

  return (
    <div className="dash page-fade">
      <aside className="dash-side">
        <div style={{ padding: '8px 14px 24px', borderBottom: '1px solid var(--line)' }}>
          <span className="eyebrow">Admin Console</span>
          <h4
            className="mt-8"
            style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600 }}
          >
            Sutrigo HQ
          </h4>
        </div>
        <div className="dash-side-section" style={{ marginTop: 16 }}>Operations</div>
        <div className="dash-nav">
          {ADMIN_NAV.map((n) => (
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
          <div className="dash-nav-item">
            <Icon name="settings" size={16} />Settings
          </div>
          <div className="dash-nav-item" onClick={() => go('home')}>
            <Icon name="logout" size={16} />Exit admin
          </div>
        </div>
      </aside>

      <main className="dash-main">
        {active === 'overview'  && <AdminOverview />}
        {active === 'parks'     && <AdminParks />}
        {active === 'bookings'  && <AdminBookings />}
        {active === 'products'  && <AdminProducts />}
        {active === 'orders'    && <AdminOrders />}
        {active === 'customers' && <AdminCustomers />}
        {active === 'analytics' && <AdminAnalytics />}
      </main>
    </div>
  );
}

/* ---------- Charts ---------- */

function Spark({
  data,
  color = 'var(--primary)',
  w = 100,
  h = 32,
}: {
  data: number[];
  color?: string;
  w?: number;
  h?: number;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map(
      (v, i) =>
        `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * (h - 4) - 2}`
    )
    .join(' ');
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

function RevenueChart() {
  const data = [
    { m: 'Jan', v: 84  }, { m: 'Feb', v: 96  }, { m: 'Mar', v: 78  },
    { m: 'Apr', v: 112 }, { m: 'May', v: 128 }, { m: 'Jun', v: 152 },
    { m: 'Jul', v: 176 }, { m: 'Aug', v: 198 }, { m: 'Sep', v: 168 },
    { m: 'Oct', v: 142 }, { m: 'Nov', v: 122 }, { m: 'Dec', v: 156 },
  ];
  const max = Math.max(...data.map((d) => d.v));
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: 12,
        alignItems: 'flex-end',
        height: 240,
        marginTop: 16,
      }}
    >
      {data.map((d, i) => (
        <div
          key={d.m}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
        >
          <div
            style={{
              width: '100%',
              height: `${(d.v / max) * 200}px`,
              background:
                i === 7
                  ? 'var(--primary)'
                  : 'color-mix(in oklch, var(--primary), transparent 80%)',
              borderRadius: '8px 8px 4px 4px',
              transition: 'all 0.6s var(--ease)',
              transitionDelay: `${i * 40}ms`,
            }}
          />
          <div className="text-xs muted">{d.m}</div>
        </div>
      ))}
    </div>
  );
}

type DonutSegment = { l: string; v: number; color: string };

function Donut({ segments, total }: { segments: DonutSegment[]; total: number }) {
  let acc = 0;
  const r = 60;
  const c = 2 * Math.PI * r;
  return (
    <div className="row" style={{ gap: 24, alignItems: 'center' }}>
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={r} fill="none" stroke="var(--line)" strokeWidth="20" />
        {segments.map((s, i) => {
          const dash = (s.v / total) * c;
          const offset = -acc;
          acc += dash;
          return (
            <circle
              key={i}
              cx="80"
              cy="80"
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="20"
              strokeDasharray={`${dash} ${c}`}
              strokeDashoffset={offset}
              transform="rotate(-90 80 80)"
            />
          );
        })}
        <text
          x="80"
          y="76"
          textAnchor="middle"
          style={{
            fontSize: 22,
            fontWeight: 600,
            fontFamily: 'var(--font-display)',
            fill: 'var(--ink)',
          }}
        >
          {total}
        </text>
        <text
          x="80"
          y="94"
          textAnchor="middle"
          style={{
            fontSize: 10,
            fill: 'var(--ink-3)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Total bookings
        </text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {segments.map((s) => (
          <div key={s.l} className="row" style={{ gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: s.color }} />
            <div className="text-sm" style={{ minWidth: 80 }}>{s.l}</div>
            <div className="text-sm fw-600">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Pages ---------- */

function AdminOverview() {
  const kpis = [
    { l: 'Revenue (MTD)', v: '$1.84M',  delta: '+18.2%',     up: true,  spark: [40, 52, 48, 61, 55, 72, 88], color: 'var(--success)' },
    { l: 'Bookings',      v: '3,284',   delta: '+12.4%',     up: true,  spark: [30, 42, 38, 55, 48, 62, 76], color: 'var(--primary)' },
    { l: 'Avg order',     v: '$560',    delta: '+4.1%',      up: true,  spark: [60, 64, 58, 62, 70, 68, 74], color: 'var(--accent)'  },
    { l: 'Active parks',  v: '24 / 26', delta: '−2 closed',  up: false, spark: [60, 58, 56, 54, 50, 48, 46], color: 'var(--brand-teal)' },
  ];
  return (
    <>
      <Reveal>
        <div className="row-between" style={{ marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="eyebrow">Last 30 days</span>
            <h1 style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginTop: 8 }}>
              Operations overview
            </h1>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <select className="select" style={{ width: 'auto', padding: '8px 14px' }}>
              <option>This month</option>
              <option>Last quarter</option>
            </select>
            <Button variant="secondary" icon="download">Export</Button>
          </div>
        </div>
      </Reveal>

      <div className="kpi-grid">
        {kpis.map((k, i) => (
          <Reveal key={k.l} delay={(i + 1) as 1 | 2 | 3 | 4}>
            <div className="kpi">
              <div className="l">{k.l}</div>
              <div className="v">{k.v}</div>
              <div className={`delta ${k.up ? 'up' : 'down'}`}>
                <Icon name="trending" size={12} />{k.delta}
              </div>
              <div className="kpi-spark">
                <Spark data={k.spark} color={k.color} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: 20,
          marginTop: 32,
        }}
      >
        <Reveal>
          <div className="chart-card">
            <div className="chart-card-head">
              <div>
                <h3>Revenue</h3>
                <div className="text-sm muted">Monthly · USD</div>
              </div>
              <div className="row" style={{ gap: 8 }}>
                <Chip>2026</Chip>
                <Chip tone="line">2025</Chip>
              </div>
            </div>
            <RevenueChart />
          </div>
        </Reveal>
        <Reveal delay={1}>
          <div className="chart-card">
            <div className="chart-card-head">
              <div>
                <h3>Bookings by type</h3>
                <div className="text-sm muted">Last 30 days</div>
              </div>
            </div>
            <Donut
              total={3284}
              segments={[
                { l: 'Stays',   v: 1480, color: 'var(--primary)' },
                { l: 'Parks',   v: 920,  color: 'var(--accent)' },
                { l: 'Flights', v: 540,  color: 'var(--brand-teal)' },
                { l: 'Tours',   v: 344,  color: 'var(--success)' },
              ]}
            />
          </div>
        </Reveal>
      </div>

      <h3 className="mt-48 mb-16" style={{ marginTop: 48, marginBottom: 16, fontSize: 18 }}>
        Recent bookings
      </h3>
      <AdminBookingsTable rows={5} />
    </>
  );
}

type Booking = {
  id: string;
  guest: string;
  type: string;
  dest: string;
  total: number;
  status: 'Confirmed' | 'Pending' | 'Refunded' | 'Cancelled';
  date: string;
};

function AdminBookingsTable({ rows = 8 }: { rows?: number }) {
  const data = [
    { id: 'SUTR-A48292', guest: 'Maya Reyes',   type: 'Package', dest: 'Bali',      total: 7053, status: 'Confirmed' as const, date: 'Today' },
    { id: 'SUTR-A48312', guest: 'Daniel Kwon',  type: 'Park',    dest: 'Dubai',     total: 332,  status: 'Confirmed' as const, date: 'Today' },
    { id: 'SUTR-A48315', guest: 'Priya Subash', type: 'Tour',    dest: 'Phuket',    total: 184,  status: 'Pending'   as const, date: 'Today' },
    { id: 'SUTR-A48289', guest: 'Marc Rivera',  type: 'Stay',    dest: 'Santorini', total: 2480, status: 'Confirmed' as const, date: 'Yesterday' },
    { id: 'SUTR-A48276', guest: 'Sofia Mendes', type: 'Package', dest: 'Maldives',  total: 6420, status: 'Confirmed' as const, date: 'Yesterday' },
    { id: 'SUTR-A48261', guest: 'James Okafor', type: 'Flight',  dest: 'Kyoto',     total: 1280, status: 'Refunded'  as const, date: '2 days ago' },
    { id: 'SUTR-A48254', guest: 'Aisha Patel',  type: 'Park',    dest: 'Germany',   total: 256,  status: 'Confirmed' as const, date: '2 days ago' },
    { id: 'SUTR-A48240', guest: 'Theo Becker',  type: 'Stay',    dest: 'Amalfi',    total: 1840, status: 'Cancelled' as const, date: '3 days ago' },
  ].slice(0, rows) satisfies Booking[];

  const toneMap: Record<Booking['status'], ChipTone> = {
    Confirmed: 'success',
    Pending: 'primary',
    Refunded: 'default',
    Cancelled: 'default',
  };

  return (
    <div className="dash-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Guest</th>
            <th>Type</th>
            <th>Destination</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((b) => (
            <tr key={b.id}>
              <td className="name">{b.id}</td>
              <td>{b.guest}</td>
              <td><Chip>{b.type}</Chip></td>
              <td>{b.dest}</td>
              <td className="fw-600" style={{ color: 'var(--ink)' }}>
                ${b.total.toLocaleString()}
              </td>
              <td><Chip tone={toneMap[b.status]}>{b.status}</Chip></td>
              <td>{b.date}</td>
              <td><Button variant="ghost" size="sm">View</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdminBookings() {
  return (
    <>
      <Reveal>
        <div className="row-between" style={{ marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: 8 }}>Bookings</h1>
            <p className="muted">Manage reservations across stays, parks, flights, and tours.</p>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <div
              className="input"
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', width: 280 }}
            >
              <Icon name="search" size={16} />
              <input
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  font: 'inherit',
                  color: 'inherit',
                }}
                placeholder="Search bookings…"
              />
            </div>
            <Button variant="secondary" icon="filter">Filter</Button>
            <Button variant="primary" icon="plus">New booking</Button>
          </div>
        </div>
      </Reveal>
      <div className="cat-tabs" style={{ marginBottom: 24, width: 'fit-content' }}>
        {['All', 'Confirmed', 'Pending', 'Refunded', 'Cancelled'].map((t, i) => (
          <button key={t} className={`cat-tab ${i === 0 ? 'is-active' : ''}`}>{t}</button>
        ))}
      </div>
      <AdminBookingsTable rows={8} />
    </>
  );
}

function AdminParks() {
  return (
    <>
      <Reveal>
        <div className="row-between" style={{ marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: 8 }}>Theme parks</h1>
            <p className="muted">Manage partner parks, availability, and ticket inventory.</p>
          </div>
          <Button variant="primary" icon="plus">Add park</Button>
        </div>
      </Reveal>
      <div className="dash-table">
        <table>
          <thead>
            <tr>
              <th>Park</th>
              <th>Country</th>
              <th>Rating</th>
              <th>Price</th>
              <th>Today's tickets</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {PARKS.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="row" style={{ gap: 12 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 'var(--r-sm)',
                        backgroundImage: `url('${p.img}')`,
                        backgroundSize: 'cover',
                        flex: 'none',
                      }}
                    />
                    <div className="name">{p.name}</div>
                  </div>
                </td>
                <td>{p.country}</td>
                <td><StarRow value={p.rating} /></td>
                <td className="fw-600" style={{ color: 'var(--ink)' }}>${p.price}</td>
                <td>{Math.floor((p.rating * 173) % 200) + 80} sold</td>
                <td><Chip tone="success">Live</Chip></td>
                <td><Button variant="ghost" size="sm">Manage</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function AdminProducts() {
  const stockMap = [142, 28, 8, 0, 64, 96, 36, 18];
  return (
    <>
      <Reveal>
        <div className="row-between" style={{ marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: 8 }}>Products</h1>
            <p className="muted">Organic goods inventory and supplier management.</p>
          </div>
          <Button variant="primary" icon="plus">Add product</Button>
        </div>
      </Reveal>
      <div className="dash-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Origin</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p, i) => {
              const stock = stockMap[i] ?? 0;
              const tone: ChipTone =
                stock === 0 ? 'default' : stock < 20 ? 'primary' : 'success';
              const label = stock === 0 ? 'Out of stock' : stock < 20 ? 'Low' : 'In stock';
              return (
                <tr key={p.id}>
                  <td>
                    <div className="row" style={{ gap: 12 }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 'var(--r-sm)',
                          background:
                            'linear-gradient(135deg, color-mix(in oklch, var(--success), white 70%), color-mix(in oklch, var(--accent), white 80%))',
                          flex: 'none',
                        }}
                      />
                      <div className="name">{p.name}</div>
                    </div>
                  </td>
                  <td>{p.origin}</td>
                  <td><Chip>{p.cat}</Chip></td>
                  <td className="fw-600" style={{ color: 'var(--ink)' }}>${p.price}</td>
                  <td>{stock} units</td>
                  <td><Chip tone={tone}>{label}</Chip></td>
                  <td><Button variant="ghost" size="sm">Edit</Button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function AdminOrders() {
  const orders = [
    { id: 'SUTR-O7283', c: 'Maya Reyes',    items: 3, total: 118, status: 'Delivered',  carrier: 'DHL Express' },
    { id: 'SUTR-O7282', c: 'Daniel Kwon',   items: 2, total: 64,  status: 'Shipped',    carrier: 'FedEx' },
    { id: 'SUTR-O7281', c: 'Sofia Mendes',  items: 5, total: 188, status: 'Processing', carrier: '—' },
    { id: 'SUTR-O7280', c: 'Priya Subash',  items: 1, total: 24,  status: 'Returned',   carrier: 'DHL Express' },
    { id: 'SUTR-O7279', c: 'Marc Rivera',   items: 4, total: 156, status: 'Delivered',  carrier: 'FedEx' },
    { id: 'SUTR-O7278', c: 'James Okafor',  items: 2, total: 78,  status: 'Shipped',    carrier: 'DHL Express' },
  ];
  return (
    <>
      <Reveal>
        <h1 style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: 8 }}>Orders</h1>
        <p className="muted mb-32" style={{ marginBottom: 32 }}>
          Marketplace orders and fulfilment status.
        </p>
      </Reveal>
      <div className="dash-table">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Carrier</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              const tone: ChipTone =
                o.status === 'Delivered'
                  ? 'success'
                  : o.status === 'Shipped'
                  ? 'primary'
                  : 'default';
              return (
                <tr key={o.id}>
                  <td className="name">{o.id}</td>
                  <td>{o.c}</td>
                  <td>{o.items} items</td>
                  <td className="fw-600" style={{ color: 'var(--ink)' }}>${o.total}</td>
                  <td><Chip tone={tone}>{o.status}</Chip></td>
                  <td>{o.carrier}</td>
                  <td><Button variant="ghost" size="sm">Track</Button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function AdminCustomers() {
  const customers = [
    { n: 'Maya Reyes',   e: 'maya.reyes@example.com',  tier: 'Gold',     trips: 12, ltv: 28400, joined: '2022' },
    { n: 'Daniel Kwon',  e: 'daniel.k@example.com',    tier: 'Platinum', trips: 24, ltv: 64200, joined: '2019' },
    { n: 'Sofia Mendes', e: 'sofia.m@example.com',     tier: 'Gold',     trips: 9,  ltv: 19800, joined: '2023' },
    { n: 'Priya Subash', e: 'priya.s@example.com',     tier: 'Silver',   trips: 4,  ltv: 6840,  joined: '2024' },
    { n: 'Marc Rivera',  e: 'marc.r@example.com',      tier: 'Gold',     trips: 14, ltv: 32100, joined: '2021' },
    { n: 'James Okafor', e: 'james.o@example.com',     tier: 'Platinum', trips: 28, ltv: 78900, joined: '2018' },
  ];
  return (
    <>
      <Reveal>
        <h1 style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: 8 }}>Customers</h1>
        <p className="muted mb-32" style={{ marginBottom: 32 }}>
          Member directory and lifetime value.
        </p>
      </Reveal>
      <div className="dash-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Tier</th>
              <th>Trips</th>
              <th>LTV</th>
              <th>Joined</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => {
              const tone: ChipTone = c.tier === 'Gold' ? 'gold' : 'default';
              return (
                <tr key={c.e}>
                  <td>
                    <div className="row" style={{ gap: 12 }}>
                      <div className="av" style={{ width: 32, height: 32, fontSize: 11 }}>
                        {c.n.split(' ').map((x) => x[0]).join('')}
                      </div>
                      <span className="name">{c.n}</span>
                    </div>
                  </td>
                  <td>{c.e}</td>
                  <td><Chip tone={tone}>{c.tier}</Chip></td>
                  <td>{c.trips}</td>
                  <td className="fw-600" style={{ color: 'var(--ink)' }}>
                    ${c.ltv.toLocaleString()}
                  </td>
                  <td>{c.joined}</td>
                  <td><Button variant="ghost" size="sm">View</Button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function AdminAnalytics() {
  const kpis = [
    { l: 'Site visitors', v: '284K',  delta: '+22.4%', spark: [40, 62, 78, 90, 102, 124, 142] },
    { l: 'Conversion',    v: '4.84%', delta: '+0.6pp', spark: [40, 38, 42, 44, 46, 48, 50] },
    { l: 'Avg session',   v: '5m 42s',delta: '+0:22',  spark: [30, 36, 38, 40, 38, 44, 46] },
    { l: 'Bounce rate',   v: '32.1%', delta: '−2.4%',  spark: [60, 58, 56, 54, 50, 48, 46] },
  ];
  const tops = [
    { n: 'Bali',      v: 28, pct: 92 },
    { n: 'Maldives',  v: 22, pct: 76 },
    { n: 'Santorini', v: 19, pct: 64 },
    { n: 'Kyoto',     v: 14, pct: 48 },
    { n: 'Dubai',     v: 11, pct: 38 },
  ];
  return (
    <>
      <Reveal>
        <h1 style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: 8 }}>Analytics</h1>
        <p className="muted mb-32" style={{ marginBottom: 32 }}>
          Performance, traffic, and conversion.
        </p>
      </Reveal>
      <div className="kpi-grid">
        {kpis.map((k, i) => (
          <Reveal key={k.l} delay={(i + 1) as 1 | 2 | 3 | 4}>
            <div className="kpi">
              <div className="l">{k.l}</div>
              <div className="v">{k.v}</div>
              <div className="delta up">
                <Icon name="trending" size={12} />{k.delta}
              </div>
              <div className="kpi-spark">
                <Spark data={k.spark} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          marginTop: 32,
        }}
      >
        <Reveal>
          <div className="chart-card">
            <div className="chart-card-head"><h3>Top destinations</h3></div>
            {tops.map((d) => (
              <div key={d.n} style={{ padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
                <div className="row-between mb-8" style={{ marginBottom: 6 }}>
                  <span className="fw-600 text-sm">{d.n}</span>
                  <span className="text-sm muted">{d.v}%</span>
                </div>
                <div
                  style={{
                    height: 6,
                    background: 'var(--bg-sunken)',
                    borderRadius: 999,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${d.pct}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, var(--primary), var(--accent))',
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={1}>
          <div className="chart-card">
            <div className="chart-card-head"><h3>Channel mix</h3></div>
            <Donut
              total={284}
              segments={[
                { l: 'Direct',   v: 122, color: 'var(--primary)' },
                { l: 'Organic',  v: 84,  color: 'var(--accent)' },
                { l: 'Referral', v: 48,  color: 'var(--brand-teal)' },
                { l: 'Paid',     v: 30,  color: 'var(--success)' },
              ]}
            />
          </div>
        </Reveal>
      </div>
    </>
  );
}
