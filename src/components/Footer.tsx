import { Icon } from './Icon';
import { useRouter } from '@/context/RouterContext';

type FooterColumn = {
  title: string;
  links: { label: string; page?: 'parks' | 'booking' | 'market' }[];
};

const COLUMNS: FooterColumn[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Destinations', page: 'parks' },
      { label: 'Wildlife Parks', page: 'parks' },
      { label: 'Packages',     page: 'booking' },
      { label: 'Seasonal Offers' },
      { label: 'Trip Inspiration' },
    ],
  },
  {
    title: 'Shop',
    links: [
      { label: 'Organic Foods', page: 'market' },
      { label: 'Herbal',        page: 'market' },
      { label: 'Souvenirs',     page: 'market' },
      { label: 'Gift Cards' },
      { label: 'Shipping' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About' },
      { label: 'Careers' },
      { label: 'Press' },
      { label: 'Partners' },
      { label: 'Sustainability' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center' },
      { label: 'Contact' },
      { label: 'Trust & Safety' },
      { label: 'Terms' },
      { label: 'Privacy' },
    ],
  },
];

export function Footer() {
  const { go } = useRouter();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <div className="nav-logo" style={{ padding: 0 }}>
              <img src="/sutrigo.png" alt="SutriGo" style={{ height: 44, width: 'auto', display: 'block' }} />
            </div>
            <p>
              Sri Lanka's all-in-one travel platform — curated wildlife parks,
              cultural tours, and authentic organic goods from the pearl of the
              Indian Ocean.
            </p>
            <div className="row mt-24" style={{ gap: 8 }}>
              {(['twitter', 'instagram', 'facebook', 'youtube'] as const).map((s) => (
                <button
                  key={s}
                  className="icon-btn"
                  style={{ border: '1px solid var(--line-2)' }}
                  aria-label={s}
                >
                  <Icon name={s} size={16} />
                </button>
              ))}
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title} className="footer-col">
              <h5>{col.title}</h5>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a onClick={() => l.page && go(l.page)}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 SutriGo — Your gateway to Sri Lanka.</span>
          <span>EN · USD · Sri Lanka</span>
        </div>
      </div>
    </footer>
  );
}
