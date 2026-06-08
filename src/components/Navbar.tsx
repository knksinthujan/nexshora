import { useEffect, useState } from 'react';
import { Icon } from './Icon';
import { useRouter } from '@/context/RouterContext';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import type { PageId } from '@/types';

type NavLink = {
  id: PageId;
  label: string;
};

const NAV_LINKS: NavLink[] = [
  { id: 'home',    label: 'Home' },
  { id: 'parks',   label: 'Wildlife Parks' },
  { id: 'booking', label: 'Booking' },
  { id: 'market',  label: 'Organic Store' },
  { id: 'user',    label: 'Account' },
  { id: 'admin',   label: 'Admin' },
];

export function Navbar() {
  const { route, go } = useRouter();
  const { theme, setTheme } = useTheme();
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleDark = () => {
    const next = !theme.dark;
    setTheme((t) => ({ ...t, dark: next }));
    window.parent.postMessage(
      { type: '__edit_mode_set_keys', edits: { dark: next } },
      '*'
    );
  };

  const isActive = (id: PageId) =>
    route.page === id || (id === 'parks' && route.page === 'park');

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => go('home')} style={{ padding: 0 }}>
            <img src="/sutrigo.png" alt="SutriGo" style={{ height: 100, width: 'auto', display: 'block' }} />
          </div>
          <nav className="nav-links">
            {NAV_LINKS.map((l) => (
              <span
                key={l.id}
                className={`nav-link ${isActive(l.id) ? 'is-active' : ''}`}
                onClick={() => go(l.id)}
              >
                {l.label}
              </span>
            ))}
          </nav>
          <div className="nav-actions">
            <button className="icon-btn" onClick={toggleDark} title="Toggle dark mode">
              <Icon name={theme.dark ? 'sun' : 'moon'} size={18} />
            </button>
            <button className="icon-btn" onClick={() => go('user')}>
              <Icon name="heart" size={18} />
            </button>
            <button className="icon-btn" onClick={() => setOpen(true)}>
              <Icon name="cart" size={18} />
              {count > 0 && <span className="badge">{count}</span>}
            </button>
            <div className="avatar" onClick={() => go('user')}>
              MR
            </div>
            <button
              className="icon-btn mobile-menu-btn"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <Icon name={mobileOpen ? 'close' : 'menu'} size={20} />
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu ${mobileOpen ? 'is-open' : ''}`}>
        {NAV_LINKS.map((l) => (
          <span
            key={l.id}
            className={`nav-link ${isActive(l.id) ? 'is-active' : ''}`}
            onClick={() => {
              go(l.id);
              setMobileOpen(false);
            }}
          >
            {l.label}
          </span>
        ))}
      </div>
    </>
  );
}
