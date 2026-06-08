import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { Reveal } from '@/components/Reveal';
import { Chip } from '@/components/Chip';
import { StarRow } from '@/components/StarRow';
import { useReveal } from '@/hooks/useReveal';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data';
import type { ProductCategory } from '@/types';

const CATEGORIES = ['All', 'Herbal', 'Foods', 'Fruits', 'Vegetables', 'Natural', 'Souvenirs'] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

const SORTS = ['Featured', 'Newest', 'Price: low to high', 'Price: high to low', 'Best rated'] as const;
type Sort = (typeof SORTS)[number];

export function MarketPage() {
  useReveal();
  const { add } = useCart();
  const [cat, setCat] = useState<CategoryFilter>('All');
  const [sort, setSort] = useState<Sort>('Featured');

  let items = PRODUCTS.slice();
  if (cat !== 'All') items = items.filter((p) => p.cat === (cat as ProductCategory));
  if (sort === 'Price: low to high') items.sort((a, b) => a.price - b.price);
  else if (sort === 'Price: high to low') items.sort((a, b) => b.price - a.price);

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
          <div
            className="row-between"
            style={{ alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}
          >
            <div>
              <span className="eyebrow">Home / Organic Store</span>
              <h1 className="mt-16" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                Goods from the<br />
                <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>places</em> you visit.
              </h1>
              <p className="muted mt-16" style={{ maxWidth: '56ch' }}>
                Sourced from producers we've met on the road. Tea from Ceylon,
                oil from Atlas farms, honey from New Zealand cooperatives —
                shipped worldwide.
              </p>
            </div>
            <div className="row" style={{ gap: 12, flexWrap: 'wrap' }}>
              <Chip icon="leaf" tone="success">Certified organic</Chip>
              <Chip icon="shield" tone="line">Carbon-neutral shipping</Chip>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="market-shell">
            <aside>
              <div className="cat-list">
                {CATEGORIES.map((c) => (
                  <div
                    key={c}
                    className={`cat-list-item ${cat === c ? 'is-active' : ''}`}
                    onClick={() => setCat(c)}
                  >
                    {c}
                    <span className="count">
                      {c === 'All'
                        ? PRODUCTS.length
                        : PRODUCTS.filter((p) => p.cat === c).length}
                    </span>
                  </div>
                ))}
              </div>

              <div className="card mt-24" style={{ padding: 20, marginTop: 24 }}>
                <h5 className="eyebrow" style={{ marginBottom: 12 }}>Price</h5>
                <div className="row" style={{ gap: 8 }}>
                  <input className="input" placeholder="Min" defaultValue="10" style={{ padding: '10px 12px' }} />
                  <span className="muted">—</span>
                  <input className="input" placeholder="Max" defaultValue="100" style={{ padding: '10px 12px' }} />
                </div>
                <h5 className="eyebrow mt-24" style={{ marginTop: 24, marginBottom: 12 }}>Origin</h5>
                <div className="filter-options">
                  {['Sri Lanka', 'Morocco', 'Italy', 'Japan', 'Ecuador'].map((o, i) => (
                    <label key={o} className="filter-check">
                      <input type="checkbox" defaultChecked={i < 2} />{o}
                    </label>
                  ))}
                </div>
                <h5 className="eyebrow mt-24" style={{ marginTop: 24, marginBottom: 12 }}>Certifications</h5>
                <div className="filter-options">
                  {['USDA Organic', 'Fair Trade', 'Carbon-neutral', 'Small producer'].map((o, i) => (
                    <label key={o} className="filter-check">
                      <input type="checkbox" defaultChecked={i < 2} />{o}
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            <div>
              <div className="list-toolbar">
                <p className="text-sm muted">
                  Showing{' '}
                  <span className="fw-600" style={{ color: 'var(--ink)' }}>{items.length}</span>{' '}
                  of {PRODUCTS.length} products
                </p>
                <select
                  className="select"
                  style={{ width: 'auto', padding: '8px 14px', fontSize: 13 }}
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                >
                  {SORTS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div className="product-grid">
                {items.map((p, i) => (
                  <Reveal key={p.id} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                    <div className="product-card">
                      <div className="product-card-media">
                        <div style={{ width: '100%', height: '100%', backgroundImage: `url('${p.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                        <button
                          className="product-card-add"
                          onClick={(e) => {
                            e.stopPropagation();
                            add(p);
                          }}
                          aria-label={`Add ${p.name}`}
                        >
                          <Icon name="plus" size={16} />
                        </button>
                      </div>
                      <div className="product-card-body">
                        <h4>{p.name}</h4>
                        <span className="product-card-origin">{p.origin} · {p.cat}</span>
                        <div className="product-card-row">
                          <span className="product-price">
                            ${p.price}<small> / unit</small>
                          </span>
                          <StarRow value={4.6 + (i % 3) * 0.1} />
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal className="mt-48">
                <div
                  className="newsletter"
                  style={{
                    marginTop: 48,
                    gridTemplateColumns: '1fr',
                    textAlign: 'center',
                    padding: 48,
                  }}
                >
                  <div>
                    <span
                      className="eyebrow eyebrow-dot"
                      style={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                      Ship with your stay
                    </span>
                    <h2
                      className="mt-16"
                      style={{ maxWidth: '20ch', margin: '16px auto 0' }}
                    >
                      Add goods to your trip — collect them in your villa.
                    </h2>
                    <p style={{ margin: '16px auto 0' }}>
                      If you have an upcoming Sutrigo booking, we'll deliver to
                      your accommodation on arrival day. No shipping fee.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
