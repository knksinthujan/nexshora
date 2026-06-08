import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { StarRow } from '@/components/StarRow';
import { ParkCard } from '@/components/ParkCard';
import { useReveal } from '@/hooks/useReveal';
import { useCounter } from '@/hooks/useCounter';
import { useRouter } from '@/context/RouterContext';
import { useCart } from '@/context/CartContext';
import { gsap } from '@/lib/gsap';
import { HeroScene } from '@/components/3d/HeroScene';
import {
  DESTINATIONS,
  PARKS,
  PACKAGES,
  PRODUCTS,
  TESTIMONIALS,
} from '@/data';
import type { ThemeState } from '@/types';

type HomePageProps = {
  heroVariant: ThemeState['heroVariant'];
};

/* Transparent gap that lets the fixed 3D canvas show through */
function SceneWindow({ h = 180 }: { h?: number }) {
  return <div className="scene-window" style={{ height: h }} aria-hidden="true" />;
}

export function HomePage({ heroVariant }: HomePageProps) {
  useReveal();
  return (
    <div className="page-fade page-3d">
      {/* Fixed 3D canvas — covers the whole page behind content */}
      <div className="page-3d-bg">
        <HeroScene />
      </div>

      {/* Hero is fully transparent — shows the raw 3D */}
      {heroVariant === 'editorial' ? <Hero2 /> : <Hero1 />}

      {/* Scene windows: transparent gaps that reveal the 3D canvas */}
      <SceneWindow h={160} />
      <FeaturedReecha />
      <SceneWindow h={120} />
      <DestinationsGrid />
      <SceneWindow h={160} />
      <TopParks />
      <SceneWindow h={120} />
      <SeasonalOffers />
      <SceneWindow h={160} />
      <Packages />
      <SceneWindow h={120} />
      <StatsStrip />
      <SceneWindow h={160} />
      <Testimonials />
      <SceneWindow h={120} />
      <OrganicTease />
      <SceneWindow h={160} />
      <Newsletter />
    </div>
  );
}

/* ---------- Hero (cinematic full-viewport 3D) ---------- */
function Hero1() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef    = useRef<HTMLDivElement>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const copy    = copyRef.current;
    const bottom  = bottomRef.current;
    if (!section || !copy || !bottom) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        copy.querySelectorAll<HTMLElement>(':scope > *'),
        { y: 72, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.15, ease: 'power4.out', stagger: 0.12, delay: 0.2, clearProps: 'transform,opacity' }
      );
      gsap.fromTo(
        bottom,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.75 }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero">
      {/* Gradient overlay — canvas is now the fixed page background */}
      <div className="hero-overlay" />

      {/* Floating scene location labels */}
      <div className="hero-labels">
        <div className="hero-label" style={{ top: '34%', right: '20%', animationDelay: '1.0s' }}>
          <span className="hero-label-dot" style={{ background: '#FF8C42' }} />
          Sigiriya Rock · 195 m
        </div>
        <div className="hero-label" style={{ top: '54%', left: '6%', animationDelay: '1.4s' }}>
          <span className="hero-label-dot" style={{ background: '#5DBD3A' }} />
          Tea Hills · Nuwara Eliya
        </div>
        <div className="hero-label" style={{ bottom: '28%', right: '8%', animationDelay: '1.8s' }}>
          <span className="hero-label-dot" style={{ background: '#29B6F6' }} />
          Indian Ocean Coast
        </div>
      </div>

      {/* Content */}
      <div className="hero-inner">
        <div ref={copyRef} className="hero-copy">
          <span className="eyebrow eyebrow-dot">Discover Sri Lanka · 2026</span>
          <h1>
            Where every <em>journey</em>
            <br />tells a timeless story.
          </h1>
          <p className="lede">
            From ancient rock fortresses to golden beaches and misty tea hills —
            explore Sri Lanka's finest destinations, wildlife parks, and authentic
            local goods, all in one place.
          </p>
          <div className="hero-cta-row">
            <Button variant="primary" size="lg" iconRight="arrowRight">
              Begin planning
            </Button>
            <Button variant="ghost" size="lg" icon="play" style={{ color: '#fff' }}>
              Watch the film
            </Button>
          </div>
        </div>

        {/* Bottom bar: stats + scroll indicator */}
        <div ref={bottomRef} className="hero-bottom-bar">
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="v">6+</div>
              <div className="l">Regions</div>
            </div>
            <div className="hero-stat">
              <div className="v">98%</div>
              <div className="l">Happy guests</div>
            </div>
            <div className="hero-stat">
              <div className="v">24/7</div>
              <div className="l">Concierge</div>
            </div>
          </div>
          <div className="hero-scroll-hint">
            <span>Scroll</span>
            <div className="hero-scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Hero (editorial) ---------- */
function Hero2() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef    = useRef<HTMLDivElement>(null);
  const stackRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const copy    = copyRef.current;
    const stack   = stackRef.current;
    if (!section || !copy || !stack) return;

    const ctx = gsap.context(() => {
      /* Copy children stagger */
      gsap.fromTo(
        copy.querySelectorAll<HTMLElement>(':scope > *'),
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.13,
          delay: 0.1,
          clearProps: 'transform,opacity',
        }
      );

      /* Stack image entrance + parallax */
      gsap.fromTo(stack, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.35 });
      gsap.to(stack.querySelector('.hero-v2-stack-img'), {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-v2">
      <div className="hero-v2-deco" />
      <div className="hero-v2-inner">
        <div ref={copyRef} className="hero-v2-copy">
          <span className="eyebrow eyebrow-dot">Discover Sri Lanka · 2026</span>
          <h1 style={{ marginTop: 24 }}>
            The pearl
            <br />of the <em>Indian</em>
            <br />Ocean.
          </h1>
          <p className="lede">
            Ancient temples, leopard safaris, and spice gardens — Sri Lanka's
            wonders, curated and delivered with care.
          </p>
          <div className="hero-cta-row mt-32">
            <Button variant="primary" size="lg" iconRight="arrowRight">Begin planning</Button>
            <Button variant="secondary" size="lg" icon="play">Watch the film</Button>
          </div>
          <div className="row mt-48" style={{ gap: 32 }}>
            {[
              { v: '6', suf: '+', l: 'Regions' },
              { v: '98', suf: '%', l: 'Happy guests' },
              { v: '24/7', suf: '', l: 'Concierge' },
            ].map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 500, letterSpacing: '-0.02em' }}>
                  {s.v}<span style={{ color: 'var(--primary)' }}>{s.suf}</span>
                </div>
                <div className="text-xs muted" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div ref={stackRef} className="hero-v2-stack">
          <div
            className="hero-v2-stack-img"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80&auto=format&fit=crop')" }}
          />
          <div className="hero-v2-pill tl">
            <div className="av" />
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>Kavya M. just booked</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Sigiriya Explorer · 5 nights</div>
            </div>
          </div>
          <div className="hero-v2-pill br">
            <div className="l">Rated by 12,400 guests</div>
            <div className="row" style={{ gap: 4, alignItems: 'center' }}>
              <span className="v">4.92</span>
              <Icon name="star" size={18} strokeWidth={0} style={{ fill: 'var(--accent)', color: 'var(--accent)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Featured: Reecha ---------- */
const REECHA_FACILITIES = [
  { img: 'https://reecha.lk/img/facility/fac-1.jpg', label: 'Resort' },
  { img: 'https://reecha.lk/img/facility/fac-2.jpg', label: 'Dining' },
  { img: 'https://reecha.lk/img/facility/fac-3.jpg', label: 'Amusement' },
  { img: 'https://reecha.lk/img/facility/fac-4.jpg', label: 'Organic Farm' },
  { img: 'https://reecha.lk/img/facility/fac-5.jpg', label: 'Recreation' },
  { img: 'https://reecha.lk/img/facility/fac-6.jpg', label: 'Nature' },
];

function FeaturedReecha() {
  const { go } = useRouter();
  return (
    <section className="section-tight">
      <div className="container">

        {/* Header */}
        <Reveal className="section-head">
          <div>
            <span className="eyebrow eyebrow-dot">Featured Destination</span>
            <h2 className="mt-16">
              Reecha{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--brand-leaf)' }}>Organic</em>{' '}
              Theme Park
            </h2>
          </div>
          <p className="head-lede">
            Sri Lanka's first organic agricultural theme park in Kilinochchi —
            where nature meets luxury across 50+ attractions, a working farm,
            and a luxury resort.
          </p>
        </Reveal>

        {/* Main: large banner left + info column right */}
        <Reveal delay={1}>
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16, marginBottom: 16 }}>

            {/* Left — big banner photo */}
            <div
              style={{
                borderRadius: 'var(--r-xl)',
                overflow: 'hidden',
                height: 500,
                backgroundImage: 'url(https://reecha.lk/img/banner/ban-1.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.62) 0%, transparent 55%)',
                }}
              />
              <div style={{ position: 'absolute', bottom: 32, left: 32 }}>
                <span
                  className="chip"
                  style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', marginBottom: 12, display: 'inline-flex' }}
                >
                  Sri Lanka's 1st
                </span>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: 28, lineHeight: 1.2 }}>
                  Organic Agricultural<br />Theme Park
                </div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="pin" size={12} />
                  Kilinochchi, Northern Province, Sri Lanka
                </div>
              </div>
            </div>

            {/* Right — about photo + info card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* About photo */}
              <div
                style={{
                  borderRadius: 'var(--r-xl)',
                  overflow: 'hidden',
                  flex: 1,
                  minHeight: 220,
                  backgroundImage: 'url(https://reecha.lk/img/about.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Info + stats + CTA */}
              <div
                style={{
                  background: 'var(--bg-elev)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--r-xl)',
                  padding: '24px 22px',
                  boxShadow: 'var(--sh-2)',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>
                  Nurture the Nature for our Future
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 6, lineHeight: 1.6 }}>
                  ~90% nature-covered land · eco-friendly · sustainable farming
                </div>
                <div style={{ display: 'flex', gap: 28, margin: '20px 0' }}>
                  {[
                    { v: '45+', l: 'Rooms' },
                    { v: '50+', l: 'Attractions' },
                    { v: '9K+', l: 'Guests/mo' },
                  ].map((s) => (
                    <div key={s.l}>
                      <div style={{ fontWeight: 800, fontSize: 24, color: 'var(--ink)', fontFamily: 'var(--font-display)' }}>{s.v}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: 2 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="primary"
                  iconRight="arrowRight"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => go('park', { id: 'reecha' })}
                >
                  View park details
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Facility photo strip */}
        <Reveal delay={2}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, marginBottom: 16 }}>
            {REECHA_FACILITIES.map((f) => (
              <div
                key={f.label}
                style={{
                  borderRadius: 'var(--r-md)',
                  overflow: 'hidden',
                  aspectRatio: '1',
                  backgroundImage: `url('${f.img}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.52) 0%, transparent 55%)',
                    display: 'flex', alignItems: 'flex-end',
                    padding: '8px 10px',
                  }}
                >
                  <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                    {f.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Services strip */}
        <Reveal delay={3}>
          <div
            style={{
              background: 'var(--bg-elev)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--r-xl)',
              padding: '24px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              flexWrap: 'wrap',
            }}
          >
            {[
              { icon: 'https://reecha.lk/img/svg/hotel.svg',      label: 'Hotel' },
              { icon: 'https://reecha.lk/img/svg/restaurant.svg', label: 'Restaurant' },
              { icon: 'https://reecha.lk/img/svg/amusement.svg',  label: 'Amusement' },
              { icon: 'https://reecha.lk/img/svg/park.svg',       label: 'Park' },
              { icon: 'https://reecha.lk/img/svg/grocery.svg',    label: 'Grocery' },
              { icon: 'https://reecha.lk/img/svg/livestock.svg',  label: 'Livestock' },
              { icon: 'https://reecha.lk/img/svg/food.svg',       label: 'Food' },
              { icon: 'https://reecha.lk/img/svg/shop.svg',       label: 'Shop' },
              { icon: 'https://reecha.lk/img/svg/attraction.svg', label: 'Attractions' },
              { icon: 'https://reecha.lk/img/svg/rental.svg',     label: 'Rentals' },
              { icon: 'https://reecha.lk/img/svg/travel.svg',     label: 'Travel' },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  minWidth: 64,
                }}
              >
                <div
                  style={{
                    width: 52, height: 52,
                    borderRadius: 'var(--r-md)',
                    background: 'color-mix(in oklch, var(--brand-leaf), transparent 88%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 12,
                  }}
                >
                  <img src={s.icon} alt={s.label} style={{ width: 28, height: 28, objectFit: 'contain' }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-2)', textAlign: 'center' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ---------- Destinations ---------- */
function DestinationsGrid() {
  const { go } = useRouter();
  return (
    <section className="section-tight">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow eyebrow-dot">Trending now</span>
            <h2 className="mt-16">
              Destinations{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>we're</em>
              <br />
              falling for this season.
            </h2>
          </div>
          <p className="head-lede">
            From Sigiriya's ancient rock fortress to Galle's colonial shores —
            curated by our editors and explored by our guests. Six places that
            define the Sri Lanka experience.
          </p>
        </Reveal>
        <Reveal delay={1}>
          <div className="dest-grid">
            {DESTINATIONS.map((d) => (
              <div key={d.id} className="dest-card" onClick={() => go('parks')}>
                <div
                  className="dest-card-img"
                  style={{ backgroundImage: `url('${d.img}')` }}
                />
                <div className="dest-card-inner">
                  <span className="dest-card-tag">{d.tag}</span>
                  <div className="dest-card-bottom">
                    <div>
                      <h3>{d.name}</h3>
                      <div className="dest-card-meta">
                        <Icon name="pin" size={12} />
                        {d.country} · {d.trips} trips
                      </div>
                    </div>
                    <div className="dest-card-arrow">
                      <Icon name="arrowUpRight" size={18} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Top Parks ---------- */
function TopParks() {
  const { go } = useRouter();
  return (
    <section className="section-tight">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow eyebrow-dot">Into the wild</span>
            <h2 className="mt-16">Wildlife parks worth every mile.</h2>
          </div>
          <Button
            variant="ghost"
            iconRight="arrowRight"
            onClick={() => go('parks')}
          >
            See all parks
          </Button>
        </Reveal>
        <div className="park-grid">
          {PARKS.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} delay={(i + 1) as 1 | 2 | 3}>
              <ParkCard park={p} onClick={() => go('park', { id: p.id })} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Packages ---------- */
function Packages() {
  const { go } = useRouter();
  return (
    <section className="section-tight">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow eyebrow-dot">Curated packages</span>
            <h2 className="mt-16">Trips, fully arranged.</h2>
          </div>
          <p className="head-lede">
            Hotels, transfers, guided tours, and dining — sequenced by our
            Sri Lanka specialists and signed off by guests who've been.
          </p>
        </Reveal>
        <div className="pkg-grid">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.id} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <div className="pkg-card" onClick={() => go('booking')}>
                <div
                  className="pkg-card-media"
                  style={{ backgroundImage: `url('${p.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <span className="pkg-card-tag">{p.nights} nights</span>
                </div>
                <div className="pkg-card-body">
                  <h4>{p.name}</h4>
                  <div className="park-card-meta mt-8">
                    <StarRow value={p.rating} /> ·{' '}
                    {Math.floor(p.rating * 100 + 240)} reviews
                  </div>
                  <div className="pkg-card-row">
                    <div>
                      <span className="pkg-price">
                        ${p.price.toLocaleString()}
                        <small>/person</small>
                      </span>
                    </div>
                    <button
                      className="icon-btn"
                      style={{ background: 'var(--ink)', color: 'var(--bg)' }}
                      aria-label="Open package"
                    >
                      <Icon name="arrowUpRight" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Seasonal offers ---------- */
function SeasonalOffers() {
  return (
    <section className="section-tight">
      <div className="container">
        <Reveal>
          <div className="row" style={{ gap: 16, marginBottom: 16, alignItems: 'center' }}>
            <span className="eyebrow eyebrow-dot">Limited window</span>
          </div>
        </Reveal>
        <div
          style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}
          className="seasonal-row"
        >
          <Reveal>
            <div
              style={{
                borderRadius: 'var(--r-xl)',
                overflow: 'hidden',
                background: 'linear-gradient(120deg, #FF7B54, #D4AF37)',
                color: '#fff',
                padding: 48,
                position: 'relative',
                minHeight: 360,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span
                  className="chip"
                  style={{ background: 'rgba(255,255,255,0.18)', color: '#fff' }}
                >
                  Until Aug 31
                </span>
                <h2
                  style={{
                    color: '#fff',
                    marginTop: 24,
                    maxWidth: '14ch',
                    fontSize: 'clamp(32px, 4vw, 56px)',
                  }}
                >
                  Peak season <em style={{ fontStyle: 'italic' }}>Sri Lanka</em> —
                  up to 22% off.
                </h2>
              </div>
              <Button
                variant="dark"
                iconRight="arrowRight"
                style={{ alignSelf: 'flex-start' }}
              >
                Browse deals
              </Button>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div
              style={{
                borderRadius: 'var(--r-xl)',
                overflow: 'hidden',
                background: 'var(--ink)',
                color: '#fff',
                padding: 32,
                minHeight: 360,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span
                  className="chip"
                  style={{ background: 'rgba(255,255,255,0.12)', color: '#fff' }}
                >
                  Member only
                </span>
                <h3 style={{ color: '#fff', marginTop: 16, fontSize: 24 }}>
                  Priority entry at Sri Lanka's top wildlife reserves.
                </h3>
              </div>
              <Button
                variant="gold"
                iconRight="arrowRight"
                style={{ alignSelf: 'flex-start' }}
              >
                Become a member
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats strip ---------- */
type StatDef = {
  v: number;
  suffix: string;
  l: string;
  decimal?: 1 | 2;
};

function StatsStrip() {
  const stats: StatDef[] = [
    { v: 6,    suffix: '+', l: 'Sri Lanka regions' },
    { v: 18.4, suffix: 'K', l: 'Trips planned',       decimal: 1 },
    { v: 4.92, suffix: '★', l: 'Guest rating',        decimal: 2 },
    { v: 24,   suffix: 'h', l: 'Concierge response' },
  ];
  return (
    <section className="section-tight">
      <div className="container">
        <Reveal>
          <div className="stats-strip">
            {stats.map((s) => (
              <StatCell key={s.l} stat={s} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatCell({ stat }: { stat: StatDef }) {
  const [raw, ref] = useCounter(stat.v * 100, 1400);
  let display: string | number;
  if (stat.decimal === 2) display = (raw / 100).toFixed(2);
  else if (stat.decimal === 1) display = (raw / 100).toFixed(1);
  else display = Math.floor(raw / 100);
  return (
    <div ref={ref}>
      <div className="v">
        {display}
        <span className="suffix">{stat.suffix}</span>
      </div>
      <div className="l">{stat.l}</div>
    </div>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const [idx, setIdx] = useState<number>(0);
  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % TESTIMONIALS.length),
      6500
    );
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[idx];
  return (
    <section className="section">
      <div className="container">
        <Reveal className="testi-wrap">
          <div>
            <span className="eyebrow eyebrow-dot">From our guests</span>
            <h2 className="mt-16">
              What travellers say
              <br />after they come home.
            </h2>
            <p className="muted mt-24" style={{ maxWidth: '44ch' }}>
              We don't ask for reviews until the suitcases are unpacked. These
              are the ones that came in unprompted.
            </p>
            <div className="row mt-32">
              <div className="row" style={{ gap: 8 }}>
                {TESTIMONIALS.map((_, i) => (
                  <div
                    key={i}
                    className="av"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      border: '2px solid var(--bg)',
                      marginLeft: i ? -10 : 0,
                      background: `linear-gradient(135deg, hsl(${i * 80} 60% 60%), hsl(${i * 80 + 40} 60% 50%))`,
                    }}
                  />
                ))}
              </div>
              <span className="text-sm muted">+ 12,400 reviews</span>
            </div>
          </div>
          <div className="testi-card" key={idx}>
            <p className="testi-card-quote">{t.quote}</p>
            <div className="testi-card-author">
              <div className="av" />
              <div>
                <div className="fw-600">{t.author}</div>
                <div className="text-xs muted">{t.meta}</div>
              </div>
            </div>
            <div className="testi-dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={i === idx ? 'is-active' : ''}
                  onClick={() => setIdx(i)}
                  aria-label={`Show review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Organic tease ---------- */
function OrganicTease() {
  const { go } = useRouter();
  const { add } = useCart();
  return (
    <section className="section-tight">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow eyebrow-dot">Organic Marketplace</span>
            <h2 className="mt-16">Bring the destination home.</h2>
          </div>
          <Button
            variant="ghost"
            iconRight="arrowRight"
            onClick={() => go('market')}
          >
            Shop all goods
          </Button>
        </Reveal>
        <div className="product-grid">
          {PRODUCTS.slice(0, 4).map((p, i) => (
            <Reveal key={p.id} delay={(i + 1) as 1 | 2 | 3 | 4}>
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
                  <span className="product-card-origin">
                    {p.origin} · {p.cat}
                  </span>
                  <div className="product-card-row">
                    <span className="product-price">${p.price}</span>
                    <StarRow value={4.6 + (i % 3) * 0.1} />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Newsletter ---------- */
function Newsletter() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="newsletter">
            <div>
              <span
                className="eyebrow eyebrow-dot"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                Dispatch
              </span>
              <h2 className="mt-16">
                Letters from the road.
                <br />Twice a month, never a peep otherwise.
              </h2>
              <p>
                New destinations, recently opened stays, and short essays from
                our editors. We do not sell your address. Ever.
              </p>
            </div>
            <div>
              <form
                className="newsletter-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <input type="email" placeholder="you@somewhere.com" />
                <Button variant="primary" iconRight="arrowRight">
                  Subscribe
                </Button>
              </form>
              <p
                className="text-xs mt-16"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                By subscribing you agree to our privacy policy. Unsubscribe
                anytime.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

