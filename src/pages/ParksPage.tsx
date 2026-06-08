import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { ParkCard } from '@/components/ParkCard';
import { StarRow } from '@/components/StarRow';
import { useReveal } from '@/hooks/useReveal';
import { useRouter } from '@/context/RouterContext';
import { PARKS } from '@/data';

type ViewMode = 'grid' | 'list';

const CATEGORIES = [
  'All',
  'Family',
  'Thrill',
  'Water Park',
  'Cultural',
  'Mountain',
] as const;
type Category = (typeof CATEGORIES)[number];

const SORTS = [
  'Recommended',
  'Price: low to high',
  'Price: high to low',
  'Rating',
  'Popularity',
] as const;
type Sort = (typeof SORTS)[number];

export function ParksPage() {
  useReveal();
  const { go } = useRouter();
  const [view, setView] = useState<ViewMode>('grid');
  const [cat, setCat] = useState<Category>('All');
  const [sort, setSort] = useState<Sort>('Recommended');
  const [priceMax, setPriceMax] = useState<number>(100);

  let parks = PARKS.slice();
  if (cat !== 'All') parks = parks.filter((p) => p.tags.includes(cat));
  parks = parks.filter((p) => p.price <= priceMax);
  if (sort === 'Price: low to high') parks.sort((a, b) => a.price - b.price);
  else if (sort === 'Price: high to low') parks.sort((a, b) => b.price - a.price);
  else if (sort === 'Rating') parks.sort((a, b) => b.rating - a.rating);

  return (
    <div className="page-fade">
      <section
        style={{
          background: 'var(--bg-sunken)',
          padding: '56px 0 32px',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="container">
          <span className="eyebrow">Home / Theme Parks</span>
          <h1 className="mt-16" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            Theme parks{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>worth</em>
            <br />the queue.
          </h1>
          <p className="muted mt-16" style={{ maxWidth: '56ch' }}>
            24 partner parks across 12 countries. Skip-the-line passes, family-
            friendly rides, and after-hours events — booked alongside your stay.
          </p>
          <div className="row mt-32" style={{ gap: 12, flexWrap: 'wrap' }}>
            <div
              className="input"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                maxWidth: 360,
                padding: '10px 16px',
              }}
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
                placeholder="Search parks, cities, attractions…"
              />
            </div>
            <Button variant="dark" icon="search">
              Search
            </Button>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="parks-shell">
            <aside className="filter-card">
              <h5>Categories</h5>
              <div className="filter-options">
                {['Family-friendly', 'Thrill rides', 'Water park', 'Mountain', 'Indoor', 'Seasonal'].map((c, i) => (
                  <label key={c} className="filter-check">
                    <input type="checkbox" defaultChecked={i < 3} />
                    {c}
                  </label>
                ))}
              </div>
              <h5>Price range</h5>
              <div className="row" style={{ gap: 12, alignItems: 'center' }}>
                <input
                  type="range"
                  min={20}
                  max={200}
                  value={priceMax}
                  onChange={(e) => setPriceMax(+e.target.value)}
                  style={{ flex: 1, accentColor: 'var(--primary)' }}
                />
                <span className="text-sm fw-600" style={{ minWidth: 50, textAlign: 'right' }}>
                  ${priceMax}
                </span>
              </div>
              <h5>Rating</h5>
              <div className="filter-options">
                {[4.5, 4.0, 3.5].map((r) => (
                  <label key={r} className="filter-check">
                    <input type="checkbox" defaultChecked={r === 4.5} />
                    <StarRow value={r} /> & up
                  </label>
                ))}
              </div>
              <h5>Country</h5>
              <div className="filter-options">
                {['United Arab Emirates', 'Germany', 'Japan', 'Denmark', 'Thailand', 'Austria'].map((c, i) => (
                  <label key={c} className="filter-check">
                    <input type="checkbox" defaultChecked={i < 2} />
                    {c}
                  </label>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="mt-24" style={{ width: '100%' }}>
                Clear all
              </Button>
            </aside>

            <div>
              <div className="list-toolbar">
                <div className="cat-tabs">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      className={`cat-tab ${cat === c ? 'is-active' : ''}`}
                      onClick={() => setCat(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="row" style={{ gap: 12 }}>
                  <select
                    className="select"
                    style={{ width: 'auto', padding: '8px 14px', fontSize: 13 }}
                    value={sort}
                    onChange={(e) => setSort(e.target.value as Sort)}
                  >
                    {SORTS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <div className="view-toggle">
                    <button
                      className={view === 'grid' ? 'is-active' : ''}
                      onClick={() => setView('grid')}
                      aria-label="Grid view"
                    >
                      <Icon name="grid" size={14} />
                    </button>
                    <button
                      className={view === 'list' ? 'is-active' : ''}
                      onClick={() => setView('list')}
                      aria-label="List view"
                    >
                      <Icon name="list" size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-sm muted mb-16" style={{ marginBottom: 24 }}>
                Showing{' '}
                <span className="fw-600" style={{ color: 'var(--ink)' }}>
                  {parks.length}
                </span>{' '}
                of 24 parks
              </p>

              <div className={`park-grid ${view === 'list' ? 'is-list' : ''}`}>
                {parks.map((p, i) => (
                  <Reveal key={p.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                    <ParkCard
                      park={p}
                      list={view === 'list'}
                      onClick={() => go('park', { id: p.id })}
                    />
                  </Reveal>
                ))}
              </div>

              <div className="row mt-48" style={{ justifyContent: 'center', gap: 6 }}>
                <button className="icon-btn" style={{ border: '1px solid var(--line-2)' }}>
                  <Icon name="chevronLeft" size={16} />
                </button>
                {[1, 2, 3, '…', 6].map((n, i) => (
                  <button
                    key={i}
                    className="icon-btn"
                    style={{
                      border: '1px solid var(--line-2)',
                      background: n === 1 ? 'var(--ink)' : 'transparent',
                      color: n === 1 ? 'var(--bg)' : 'var(--ink-2)',
                      fontWeight: 500,
                      fontSize: 14,
                    }}
                  >
                    {n}
                  </button>
                ))}
                <button className="icon-btn" style={{ border: '1px solid var(--line-2)' }}>
                  <Icon name="chevronRight" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
