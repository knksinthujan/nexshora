import { Fragment, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { Chip } from '@/components/Chip';
import { StarRow } from '@/components/StarRow';
import { useReveal } from '@/hooks/useReveal';
import { PARKS, PACKAGES } from '@/data';
import type { IconName } from '@/types';

type BookingTabId = 'flights' | 'hotels' | 'tickets' | 'package';

type BookingTab = {
  id: BookingTabId;
  label: string;
  icon: IconName;
};

const TABS: BookingTab[] = [
  { id: 'flights', label: 'Flights',             icon: 'plane' },
  { id: 'hotels',  label: 'Hotels',              icon: 'bed' },
  { id: 'tickets', label: 'Theme Park Tickets',  icon: 'ticket' },
  { id: 'package', label: 'Packages',            icon: 'compass' },
];

const STEPS = ['Choose', 'Travellers', 'Seats', 'Payment'] as const;
type Step = 1 | 2 | 3 | 4;

const SEATS_TAKEN = new Set([
  '1A','1B','2D','2F','3C','4A','4B','5E','6F','7C','7D','8A','9F',
]);

type Flight = {
  air: string;
  airline: string;
  dep: string;
  arr: string;
  from: string;
  to: string;
  dur: string;
  stops: string;
  price: number;
};

const FLIGHTS: Flight[] = [
  { air: 'ZA', airline: 'Zephyr Air',       dep: '08:40', arr: '16:15', from: 'JFK', to: 'DPS', dur: '12h 35m', stops: '1 stop',   price: 612 },
  { air: 'NS', airline: 'Northstar',        dep: '11:20', arr: '21:40', from: 'JFK', to: 'DPS', dur: '11h 20m', stops: 'Nonstop',  price: 884 },
  { air: 'AT', airline: 'Atlas Pacific',    dep: '18:55', arr: '06:30', from: 'JFK', to: 'DPS', dur: '13h 35m', stops: '1 stop',   price: 548 },
  { air: 'EA', airline: 'Equinox Airlines', dep: '22:10', arr: '10:50', from: 'JFK', to: 'DPS', dur: '14h 40m', stops: '2 stops',  price: 472 },
];

export function BookingPage() {
  useReveal();
  const [tab, setTab] = useState<BookingTabId>('flights');
  const [step, setStep] = useState<Step>(1);
  const [seat, setSeat] = useState<string>('4D');
  const [done, setDone] = useState<boolean>(false);

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
          <span className="eyebrow">Home / Booking</span>
          <h1 className="mt-16" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            Book the whole{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>trip</em>
            <br />in one place.
          </h1>
          <p className="muted mt-16" style={{ maxWidth: '56ch' }}>
            Flights, hotels, theme park entry, ground transfers — your itinerary
            stitched into a single confirmation. Switch the tab below to start
            where it makes sense.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          {done && <ConfirmationCard seat={seat} onReset={() => { setDone(false); setStep(1); }} />}

          {!done && (
            <div className="booking-shell">
              <div>
                <div className="booking-tabs">
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      className={`booking-tab ${tab === t.id ? 'is-active' : ''}`}
                      onClick={() => {
                        setTab(t.id);
                        setStep(1);
                      }}
                    >
                      <Icon name={t.icon} size={15} />{t.label}
                    </button>
                  ))}
                </div>

                <div className="booking-card">
                  <div className="stepper">
                    {STEPS.map((s, i) => (
                      <Fragment key={s}>
                        <div
                          className={`step ${step === i + 1 ? 'is-active' : ''} ${step > i + 1 ? 'is-done' : ''}`}
                        >
                          <span className="n">
                            {step > i + 1 ? (
                              <Icon name="check" size={12} strokeWidth={3} />
                            ) : (
                              i + 1
                            )}
                          </span>
                          {s}
                        </div>
                        {i < STEPS.length - 1 && <div className="step-bar" />}
                      </Fragment>
                    ))}
                  </div>

                  {tab === 'flights' && step === 1 && (
                    <FlightsStep onSelect={() => setStep(2)} />
                  )}
                  {tab === 'flights' && step === 2 && (
                    <TravellersStep onBack={() => setStep(1)} onNext={() => setStep(3)} />
                  )}
                  {tab === 'flights' && step === 3 && (
                    <SeatStep
                      seat={seat}
                      onSelect={setSeat}
                      onBack={() => setStep(2)}
                      onNext={() => setStep(4)}
                    />
                  )}
                  {tab === 'flights' && step === 4 && (
                    <PaymentStep onBack={() => setStep(3)} onPay={() => setDone(true)} />
                  )}
                  {tab === 'hotels'  && <HotelBlock />}
                  {tab === 'tickets' && <TicketsBlock />}
                  {tab === 'package' && <PackageBlock />}
                </div>
              </div>

              <ItinerarySummary />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* ----- Step blocks ----- */

function FlightsStep({ onSelect }: { onSelect: () => void }) {
  return (
    <>
      <div className="row mt-16 mb-16" style={{ flexWrap: 'wrap', gap: 8 }}>
        <Chip>JFK → DPS</Chip>
        <Chip>Aug 12 — Aug 19</Chip>
        <Chip>2 adults, 1 child</Chip>
        <Chip>Economy</Chip>
        <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }}>
          Edit search
        </button>
      </div>
      {FLIGHTS.map((f) => (
        <div key={f.air + f.dep} className="flight-row">
          <div className="flight-logo">{f.air}</div>
          <div>
            <div className="flight-time">
              <div>
                <div className="t">{f.dep}</div>
                <div className="c">{f.from}</div>
              </div>
            </div>
            <div className="text-xs muted mt-8">{f.airline}</div>
          </div>
          <div className="flight-dur">
            <div className="text-xs muted">{f.dur}</div>
            <div className="flight-line" />
            <div className="text-xs muted">{f.stops}</div>
          </div>
          <div className="row" style={{ justifyContent: 'flex-end', gap: 24 }}>
            <div className="flight-time">
              <div>
                <div className="t">{f.arr}</div>
                <div className="c">{f.to}</div>
              </div>
            </div>
            <div className="flight-price-col">
              <div className="flight-price">${f.price}</div>
              <small>per person</small>
              <Button variant="primary" size="sm" className="mt-8" onClick={onSelect}>
                Select
              </Button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function TravellersStep({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const travellers = [
    { first: 'Maya',  last: 'Reyes', type: 'Adult' },
    { first: 'James', last: 'Reyes', type: 'Adult' },
    { first: 'Lila',  last: 'Reyes', type: 'Child' },
  ];
  return (
    <>
      <h3 className="mb-16" style={{ marginBottom: 24, fontSize: 20 }}>
        Who's travelling?
      </h3>
      {travellers.map((t, i) => (
        <div key={i} className="row" style={{ gap: 12, marginBottom: 16, alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label className="field-label">First name</label>
            <input className="input" defaultValue={t.first} />
          </div>
          <div style={{ flex: 1 }}>
            <label className="field-label">Last name</label>
            <input className="input" defaultValue={t.last} />
          </div>
          <div style={{ width: 120 }}>
            <label className="field-label">Type</label>
            <select className="select"><option>{t.type}</option></select>
          </div>
        </div>
      ))}
      <Button variant="ghost" icon="plus" size="sm" className="mt-16">
        Add traveller
      </Button>
      <div className="row mt-32" style={{ justifyContent: 'space-between' }}>
        <Button variant="ghost" icon="chevronLeft" onClick={onBack}>Back</Button>
        <Button variant="primary" iconRight="arrowRight" onClick={onNext}>
          Continue to seats
        </Button>
      </div>
    </>
  );
}

function SeatStep({
  seat,
  onSelect,
  onBack,
  onNext,
}: {
  seat: string;
  onSelect: (s: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const cols: Array<string | null> = ['A', 'B', 'C', null, 'D', 'E', 'F'];
  return (
    <>
      <h3 className="mb-16" style={{ marginBottom: 12, fontSize: 20 }}>Pick your seat</h3>
      <p className="text-sm muted mb-16">
        Selected: <strong>{seat}</strong> · Northstar 207 · 23A Boeing 787
      </p>
      <div className="row" style={{ alignItems: 'flex-start', gap: 32, flexWrap: 'wrap', marginTop: 16 }}>
        <div className="seat-map">
          {Array.from({ length: 10 }).flatMap((_, row) =>
            cols.map((col) => {
              if (col === null)
                return (
                  <div key={`${row}-x`} className="seat aisle">
                    {row + 1}
                  </div>
                );
              const id = `${row + 1}${col}`;
              const taken = SEATS_TAKEN.has(id);
              return (
                <div
                  key={id}
                  className={`seat ${taken ? 'is-taken' : ''} ${seat === id ? 'is-selected' : ''}`}
                  onClick={() => !taken && onSelect(id)}
                >
                  {col}
                </div>
              );
            })
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
          {[
            { color: 'var(--bg-elev)', border: '1px solid var(--line-2)', label: 'Available' },
            { color: 'var(--primary)', border: 'none', label: 'Your seat' },
            { color: 'var(--line-2)', border: 'none', label: 'Taken', opacity: 0.5 },
          ].map((l) => (
            <div key={l.label} className="row" style={{ gap: 8 }}>
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 4,
                  background: l.color,
                  border: l.border,
                  opacity: l.opacity,
                }}
              />
              {l.label}
            </div>
          ))}
        </div>
      </div>
      <div className="row mt-32" style={{ justifyContent: 'space-between' }}>
        <Button variant="ghost" icon="chevronLeft" onClick={onBack}>Back</Button>
        <Button variant="primary" iconRight="arrowRight" onClick={onNext}>
          Continue to payment
        </Button>
      </div>
    </>
  );
}

function PaymentStep({ onBack, onPay }: { onBack: () => void; onPay: () => void }) {
  return (
    <>
      <h3 className="mb-16" style={{ marginBottom: 16, fontSize: 20 }}>Payment</h3>
      <div className="payment-card">
        <div>
          <label className="field-label">Cardholder name</label>
          <input className="input" defaultValue="Maya Reyes" />
        </div>
        <div>
          <label className="field-label">Card number</label>
          <input className="input" defaultValue="4242 4242 4242 4242" />
        </div>
        <div className="row" style={{ gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label className="field-label">Expiry</label>
            <input className="input" defaultValue="08 / 28" />
          </div>
          <div style={{ flex: 1 }}>
            <label className="field-label">CVC</label>
            <input className="input" defaultValue="•••" />
          </div>
          <div style={{ flex: 1 }}>
            <label className="field-label">ZIP</label>
            <input className="input" defaultValue="10001" />
          </div>
        </div>
        <div className="row mt-16" style={{ gap: 12 }}>
          <Chip tone="line" icon="shield">Payment secured with 256-bit encryption</Chip>
        </div>
      </div>
      <div className="row mt-32" style={{ justifyContent: 'space-between' }}>
        <Button variant="ghost" icon="chevronLeft" onClick={onBack}>Back</Button>
        <Button variant="primary" iconRight="check" onClick={onPay}>
          Confirm & pay $2,652
        </Button>
      </div>
    </>
  );
}

function ConfirmationCard({ seat, onReset }: { seat: string; onReset: () => void }) {
  return (
    <Reveal>
      <div className="confirm-card">
        <div className="confirm-check">
          <Icon name="check" size={36} strokeWidth={2.5} />
        </div>
        <h2 style={{ fontSize: 28 }}>You're booked.</h2>
        <p className="muted mt-16">
          Confirmation <strong>SUTR-A48292</strong> is on its way to your inbox.
          We've reserved seat <strong>{seat}</strong> on Northstar 207 and your
          concierge will reach out before departure.
        </p>
        <div className="row mt-32" style={{ justifyContent: 'center', gap: 12 }}>
          <Button variant="primary" iconRight="arrowRight" onClick={onReset}>
            View itinerary
          </Button>
          <Button variant="ghost" icon="download">Download PDF</Button>
        </div>
      </div>
    </Reveal>
  );
}

function ItinerarySummary() {
  return (
    <div>
      <div className="payment-summary">
        <span className="eyebrow">Itinerary</span>
        <h3 className="mt-16" style={{ fontSize: 20, marginBottom: 16 }}>
          Bali · 7 nights
        </h3>
        <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.7 }}>
          <div className="row" style={{ gap: 10 }}>
            <Icon name="plane" size={14} /> JFK → DPS, Aug 12
          </div>
          <div className="row" style={{ gap: 10 }}>
            <Icon name="bed" size={14} /> Cliff villa, Uluwatu
          </div>
          <div className="row" style={{ gap: 10 }}>
            <Icon name="ticket" size={14} /> Waterbom park · 1 day
          </div>
          <div className="row" style={{ gap: 10 }}>
            <Icon name="compass" size={14} /> Sunset catamaran tour
          </div>
        </div>
        <div className="divider mt-24" style={{ margin: '24px 0 16px' }} />
        {[
          ['Flights · 3 travellers', '$2,184'],
          ['Stay · 7 nights', '$3,940'],
          ['Park tickets', '$267'],
          ['Tours & extras', '$184'],
          ['Service & taxes', '$478'],
        ].map(([l, v]) => (
          <div key={l} className="payment-summary-row">
            <span>{l}</span><span>{v}</span>
          </div>
        ))}
        <div className="payment-summary-row total">
          <span>Total</span><span>$7,053</span>
        </div>
        <p className="text-xs muted mt-16">
          Or 4 instalments of $1,763.25 — 0% APR
        </p>
      </div>
    </div>
  );
}

/* ----- Other tabs ----- */

function HotelBlock() {
  const hotels = [
    { name: 'Alila Villas Uluwatu',    style: 'Cliffside resort · Pool villas', rating: 4.9, price: 540, img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=70&auto=format&fit=crop' },
    { name: 'Bambu Indah Eco-Retreat', style: 'Eco-lodge · River setting',      rating: 4.8, price: 360, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70&auto=format&fit=crop' },
    { name: 'Six Senses Uluwatu',      style: 'Wellness · Cliffside',           rating: 4.9, price: 720, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=70&auto=format&fit=crop' },
  ];
  return (
    <>
      <div className="row mb-16" style={{ flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        <Chip>Uluwatu, Bali</Chip>
        <Chip>Aug 12 — Aug 19</Chip>
        <Chip>1 room, 2 adults</Chip>
      </div>
      {hotels.map((h) => (
        <div
          key={h.name}
          className="row"
          style={{ gap: 20, padding: '20px 0', borderBottom: '1px solid var(--line)', alignItems: 'center' }}
        >
          <div
            style={{
              width: 140,
              aspectRatio: '4/3',
              borderRadius: 'var(--r-md)',
              flex: 'none',
              backgroundImage: `url('${h.img}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div style={{ flex: 1 }}>
            <h4 className="mb-8" style={{ marginBottom: 4 }}>{h.name}</h4>
            <div className="text-sm muted">{h.style}</div>
            <div className="row mt-8" style={{ gap: 16 }}>
              <StarRow value={h.rating} />
              <Chip tone="success">Free cancellation</Chip>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="flight-price">${h.price}</div>
            <small className="text-xs muted">per night</small>
            <Button variant="primary" size="sm" className="mt-8">Select</Button>
          </div>
        </div>
      ))}
    </>
  );
}

function TicketsBlock() {
  return (
    <>
      <p className="text-sm muted mb-16">
        Pre-book skip-the-line tickets at parks bundled into your itinerary.
        Tickets become active the day you arrive in-country.
      </p>
      {PARKS.slice(0, 3).map((p) => (
        <div
          key={p.id}
          className="row"
          style={{ gap: 20, padding: '20px 0', borderBottom: '1px solid var(--line)', alignItems: 'center' }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 'var(--r-md)',
              backgroundImage: `url('${p.img}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              flex: 'none',
            }}
          />
          <div style={{ flex: 1 }}>
            <h4 className="mb-8" style={{ marginBottom: 4 }}>{p.name}</h4>
            <div className="text-sm muted">{p.country} · {p.hours}</div>
            <div className="row mt-8" style={{ gap: 8 }}>
              {p.tags.map((t) => <Chip key={t}>{t}</Chip>)}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="flight-price">${p.price}</div>
            <small className="text-xs muted">per ticket</small>
            <div className="row mt-8" style={{ justifyContent: 'flex-end' }}>
              <span className="qty">
                <button><Icon name="minus" size={12} /></button>
                <span className="n">2</span>
                <button><Icon name="plus" size={12} /></button>
              </span>
            </div>
          </div>
        </div>
      ))}
      <Button variant="primary" iconRight="arrowRight" className="mt-24">
        Add to itinerary
      </Button>
    </>
  );
}

function PackageBlock() {
  return (
    <>
      <p className="text-sm muted mb-16">
        Pre-assembled trips. Lock the whole thing with one tap, then customise.
      </p>
      <div className="pkg-grid">
        {PACKAGES.slice(0, 4).map((p) => (
          <div key={p.id} className="pkg-card">
            <div
              className="pkg-card-media"
              style={{ backgroundImage: `url('${p.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <span className="pkg-card-tag">{p.nights} nights</span>
            </div>
            <div className="pkg-card-body">
              <h4>{p.name}</h4>
              <div className="park-card-meta mt-8">
                <StarRow value={p.rating} />
              </div>
              <div className="pkg-card-row">
                <span className="pkg-price">${p.price.toLocaleString()}</span>
                <Button variant="dark" size="sm">Select</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
