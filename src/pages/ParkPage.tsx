import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { Chip } from '@/components/Chip';
import { StarRow } from '@/components/StarRow';
import { ParkCard } from '@/components/ParkCard';
import { useReveal } from '@/hooks/useReveal';
import { useRouter } from '@/context/RouterContext';
import { PARKS, PARK_RIDES, FACILITIES } from '@/data';

type FAQ = { q: string; a: string };

const FAQS: FAQ[] = [
  {
    q: 'Are tickets transferable?',
    a: 'Yes — until the day of entry, tickets can be transferred via your Sutrigo account to another guest free of charge. After first scan they are bound to the wearer.',
  },
  {
    q: "What's included in the premium ticket?",
    a: 'Skip-the-line access on 12 signature rides, locker rental, one premium dining credit, and early entry at 8:30am — one hour before general admission.',
  },
  {
    q: 'Is the park stroller-friendly?',
    a: 'All main pathways and queues are accessible. Strollers and wheelchairs can be rented onsite or pre-reserved in your booking.',
  },
  {
    q: 'What happens if it rains?',
    a: 'Park entry remains. If weather closes a majority of rides for 90+ minutes, a return-day pass is automatically added to your account.',
  },
];

const REVIEWS = [
  { name: 'Sofia M.',  when: '2 weeks ago', rating: 5, text: 'We had three generations on this trip and somehow every one of them found their thing. The early-entry pass was worth every dirham — we did Skyfall twice before the queues built.' },
  { name: 'Daniel K.', when: '1 month ago', rating: 5, text: 'The Sutrigo concierge re-routed us to an indoor zone when the heat hit. We didn\'t even ask — they just messaged. Felt like the park itself was on our side.' },
  { name: 'Priya S.',  when: '1 month ago', rating: 4, text: 'Loved the food court — proper sit-down options, not just nuggets. One ride was down for maintenance which was fine, they comped a return pass.' },
  { name: 'Marc R.',   when: '2 months ago',rating: 5, text: 'Cyclone Rapids is the move. Bring a change of clothes. The lockers near the entrance are bigger than the ones inside — learn from my mistake.' },
];

type ParkPageProps = {
  id?: string;
};

export function ParkPage({ id }: ParkPageProps) {
  useReveal();
  const { go } = useRouter();
  const park = PARKS.find((p) => p.id === id) ?? PARKS[0];
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [tickets, setTickets] = useState<number>(2);

  const subtotal = park.price * tickets;
  const fees = Math.round(subtotal * 0.06);
  const tax = Math.round(subtotal * 0.08);
  const total = Math.round(subtotal * 1.14);

  return (
    <div className="page-fade">
      <section style={{ paddingTop: 32 }}>
        <div className="container-wide">
          <Reveal>
            <div className="row mb-16" style={{ marginBottom: 24, gap: 8 }}>
              <span className="text-sm muted" style={{ cursor: 'pointer' }} onClick={() => go('home')}>
                Home
              </span>
              <Icon name="chevronRight" size={12} style={{ color: 'var(--ink-3)' }} />
              <span className="text-sm muted" style={{ cursor: 'pointer' }} onClick={() => go('parks')}>
                Theme Parks
              </span>
              <Icon name="chevronRight" size={12} style={{ color: 'var(--ink-3)' }} />
              <span className="text-sm fw-600">{park.name}</span>
            </div>
            <div className="row-between" style={{ flexWrap: 'wrap', marginBottom: 32, gap: 16 }}>
              <div>
                <div className="row" style={{ gap: 8, marginBottom: 12 }}>
                  {park.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                  <Chip tone="gold" icon="sparkle">Editor's Pick</Chip>
                </div>
                <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>{park.name}</h1>
                <div className="row mt-16" style={{ gap: 24, flexWrap: 'wrap' }}>
                  <StarRow value={park.rating} />
                  <span className="text-sm muted">({park.reviews.toLocaleString()} reviews)</span>
                  <span className="text-sm row" style={{ gap: 6 }}>
                    <Icon name="pin" size={14} />{park.country}
                  </span>
                  <span className="text-sm row" style={{ gap: 6 }}>
                    <Icon name="clock" size={14} />{park.hours}
                  </span>
                </div>
              </div>
              <div className="row" style={{ gap: 8 }}>
                <Button variant="secondary" icon="heart">Save</Button>
                <Button variant="secondary" icon="arrowUpRight">Share</Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="gallery">
              <div
                className="gallery-item"
                style={{ backgroundImage: `url('${park.img}')`, backgroundSize: 'cover' }}
              />
              <div className="gallery-item ph">Coaster aerial</div>
              <div className="gallery-item ph">Wave lagoon</div>
              <div className="gallery-item ph">Family ride</div>
              <div className="gallery-item ph" style={{ position: 'relative' }}>
                Night parade
                <button className="gallery-cta">
                  <Icon name="grid" size={12} /> View all 32 photos
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="container-wide">
          <div className="park-detail-grid">
            <div>
              <Reveal>
                <h2 style={{ fontSize: 32 }}>
                  The full park,<br />curated.
                </h2>
                <p
                  className="mt-16"
                  style={{
                    color: 'var(--ink-2)',
                    maxWidth: '60ch',
                    fontSize: 16,
                    lineHeight: 1.7,
                  }}
                >
                  Set across 17 hectares of reclaimed waterfront, {park.name} pairs
                  signature thrill rides with quieter family experiences and a
                  four-restaurant dining quarter. The park opened in 2019 and
                  operates on renewable energy, with shaded queue zones designed
                  for desert conditions. Your booking includes timed entry, a
                  Sutrigo concierge contact, and skip-the-line access on six
                  rides of your choice.
                </p>
              </Reveal>

              <Reveal delay={1} className="mt-48">
                <h3 className="mb-16" style={{ marginBottom: 24, fontSize: 22 }}>
                  Facilities
                </h3>
                <div className="facilities-grid">
                  {FACILITIES.map((f) => (
                    <div key={f.label} className="facility">
                      <div className="facility-ico">
                        <Icon name={f.icon} size={20} />
                      </div>
                      <div className="fw-600 text-sm">{f.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={2} className="mt-48">
                <div className="row-between mb-16" style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 22 }}>Rides & attractions</h3>
                  <Button variant="ghost" size="sm" iconRight="arrowRight">
                    See all 38
                  </Button>
                </div>
                <div className="ride-list">
                  <div className="ride-row is-head">
                    <div>Ride</div>
                    <div className="col-hide">Type</div>
                    <div className="col-hide">Height</div>
                    <div className="col-hide">Wait</div>
                    <div>Intensity</div>
                  </div>
                  {PARK_RIDES.map((r) => (
                    <div key={r.name} className="ride-row">
                      <div className="name">{r.name}</div>
                      <div className="col-hide text-sm muted">{r.type}</div>
                      <div className="col-hide text-sm muted">{r.height}</div>
                      <div className="col-hide text-sm fw-600">{r.wait}m</div>
                      <div className="intensity-dots">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span
                            key={n}
                            className={`intensity-dot ${n <= r.intensity ? 'is-on' : ''}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={2} className="mt-48">
                <h3 className="mb-16" style={{ marginBottom: 24, fontSize: 22 }}>
                  Where you'll be
                </h3>
                <div
                  style={{
                    borderRadius: 'var(--r-xl)',
                    border: '1px solid var(--line)',
                    overflow: 'hidden',
                    aspectRatio: '16/8',
                    position: 'relative',
                    background: 'linear-gradient(135deg, #cfe3e8, #e8d3b4)',
                  }}
                >
                  <svg
                    viewBox="0 0 800 400"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0.5,
                    }}
                  >
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="800" height="400" fill="url(#grid)" />
                    <path
                      d="M 0 240 Q 200 180 400 220 T 800 200"
                      fill="none"
                      stroke="rgba(10,77,104,0.4)"
                      strokeWidth="3"
                    />
                    <path
                      d="M 100 100 L 200 120 L 280 80 L 400 130 L 500 100 L 620 140 L 740 110"
                      fill="none"
                      stroke="rgba(255,123,84,0.7)"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                    />
                  </svg>
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        color: '#fff',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 8,
                        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                      }}
                    >
                      <Icon name="pin" size={20} strokeWidth={2} />
                    </div>
                    <div className="fw-600">{park.name}</div>
                    <div className="text-xs muted">{park.country}</div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={2} className="mt-48">
                <div className="row-between mb-16" style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 22 }}>Reviews</h3>
                  <div className="row">
                    <StarRow value={park.rating} size={16} />
                    <span className="text-sm muted">{park.reviews.toLocaleString()} reviews</span>
                  </div>
                </div>
                <div className="review-grid">
                  {REVIEWS.map((r) => (
                    <div key={r.name} className="review-card">
                      <div className="review-header">
                        <div className="review-author">
                          <div className="av" />
                          <div>
                            <div className="name">{r.name}</div>
                            <div className="when">{r.when}</div>
                          </div>
                        </div>
                        <StarRow value={r.rating} />
                      </div>
                      <p className="review-text">{r.text}</p>
                    </div>
                  ))}
                </div>
                <Button variant="secondary" className="mt-24" iconRight="arrowRight">
                  Read all {park.reviews.toLocaleString()} reviews
                </Button>
              </Reveal>

              <Reveal delay={2} className="mt-48">
                <h3 className="mb-16" style={{ marginBottom: 24, fontSize: 22 }}>
                  Frequently asked
                </h3>
                <div className="faq-list">
                  {FAQS.map((f, i) => (
                    <div
                      key={i}
                      className={`faq-row ${openFaq === i ? 'is-open' : ''}`}
                      onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    >
                      <div className="faq-row-head">
                        <h4>{f.q}</h4>
                        <Icon name="plus" size={16} className="toggle" />
                      </div>
                      <div className="faq-row-body">{f.a}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Booking widget */}
            <Reveal delay={1}>
              <div className="booking-widget">
                <div className="bw-price-row">
                  <div>
                    <div className="bw-price">
                      ${park.price}
                      <small>/ ticket</small>
                    </div>
                    <div className="text-xs muted mt-8">Adult, all-day pass</div>
                  </div>
                  <StarRow value={park.rating} />
                </div>
                <div className="bw-field-row mb-16" style={{ marginBottom: 12 }}>
                  <div className="bw-field">
                    <div className="bw-field-label">Date</div>
                    <div className="bw-field-value">Aug 14, 2026</div>
                  </div>
                  <div className="bw-field">
                    <div className="bw-field-label">Entry</div>
                    <div className="bw-field-value">10:00 AM</div>
                  </div>
                </div>
                <div className="bw-field" style={{ marginBottom: 12 }}>
                  <div className="bw-field-label">Tickets</div>
                  <div className="row-between" style={{ marginTop: 6 }}>
                    <div className="bw-field-value">
                      {tickets} adult{tickets > 1 ? 's' : ''}
                    </div>
                    <span className="qty">
                      <button onClick={() => setTickets((t) => Math.max(1, t - 1))}>
                        <Icon name="minus" size={12} />
                      </button>
                      <span className="n">{tickets}</span>
                      <button onClick={() => setTickets((t) => t + 1)}>
                        <Icon name="plus" size={12} />
                      </button>
                    </span>
                  </div>
                </div>
                <div className="bw-field" style={{ marginBottom: 16 }}>
                  <div className="bw-field-label">Ticket type</div>
                  <select
                    className="select"
                    style={{
                      border: 'none',
                      background: 'transparent',
                      padding: 0,
                      marginTop: 4,
                      fontWeight: 500,
                    }}
                  >
                    <option>General admission</option>
                    <option>Skip-the-line</option>
                    <option>Premium + dining</option>
                  </select>
                </div>
                <div className="bw-summary">
                  <div className="bw-summary-row">
                    <span>${park.price} × {tickets} ticket{tickets > 1 ? 's' : ''}</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="bw-summary-row">
                    <span>Service fee</span><span>${fees}</span>
                  </div>
                  <div className="bw-summary-row">
                    <span>Taxes</span><span>${tax}</span>
                  </div>
                  <div className="bw-summary-row bw-total">
                    <span>Total</span><span>${total}</span>
                  </div>
                </div>
                <Button
                  variant="primary"
                  className="btn-block mt-16"
                  iconRight="arrowRight"
                  onClick={() => go('booking')}
                >
                  Reserve tickets
                </Button>
                <p className="text-xs muted text-center mt-16">
                  No charge yet — confirm on next step
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container-wide">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow eyebrow-dot">Similar parks</span>
              <h2 className="mt-16">You might also like</h2>
            </div>
          </Reveal>
          <div className="park-grid">
            {PARKS.filter((p) => p.id !== park.id)
              .slice(0, 3)
              .map((p, i) => (
                <Reveal key={p.id} delay={(i + 1) as 1 | 2 | 3}>
                  <ParkCard park={p} onClick={() => go('park', { id: p.id })} />
                </Reveal>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
