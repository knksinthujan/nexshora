import { useState } from 'react';
import { Button } from './Button';
import { Icon } from './Icon';
import type { IconName } from '@/types';

type SearchTab = {
  id: 'stays' | 'flights' | 'parks' | 'tours';
  label: string;
  icon: IconName;
};

const TABS: SearchTab[] = [
  { id: 'stays', label: 'Stays', icon: 'bed' },
  { id: 'tours', label: 'Tours', icon: 'compass' },
];

type HeroSearchProps = {
  compact?: boolean;
};

export function HeroSearch({ compact = false }: HeroSearchProps) {
  const [tab, setTab] = useState<SearchTab['id']>('stays');
  return (
    <div className="search-card">
      <div className="search-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`search-tab ${tab === t.id ? 'is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            <Icon name={t.icon} size={15} />
            {t.label}
          </button>
        ))}
      </div>
      <div className={`search-fields ${compact ? 'is-compact' : ''}`}>
        <div className="search-field">
          <span className="field-label">Where</span>
          <div className="field-value">
            <Icon name="pin" size={16} />
            <input type="text" placeholder="Bali, Indonesia" defaultValue="Bali, Indonesia" />
          </div>
        </div>
        <div className="search-field">
          <span className="field-label">Check-in</span>
          <div className="field-value">
            <Icon name="calendar" size={16} />
            <input type="text" placeholder="Aug 12" defaultValue="Aug 12" />
          </div>
        </div>
        <div className="search-field">
          <span className="field-label">Check-out</span>
          <div className="field-value">
            <Icon name="calendar" size={16} />
            <input type="text" placeholder="Aug 19" defaultValue="Aug 19" />
          </div>
        </div>
        <div className="search-field">
          <span className="field-label">Guests</span>
          <div className="field-value">
            <Icon name="user" size={16} />
            <input type="text" placeholder="2 adults" defaultValue="2 adults, 1 child" />
          </div>
        </div>
        <Button variant="primary" size="lg" icon="search" className="search-go">
          Search
        </Button>
      </div>
    </div>
  );
}
