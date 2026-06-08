import { useState, type MouseEvent } from 'react';
import { Icon } from './Icon';
import { Chip } from './Chip';
import { StarRow } from './StarRow';
import type { Park } from '@/types';

type ParkCardProps = {
  park: Park;
  list?: boolean;
  onClick?: () => void;
};

export function ParkCard({ park, list = false, onClick }: ParkCardProps) {
  const [fav, setFav] = useState<boolean>(false);

  const toggleFav = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFav((v) => !v);
  };

  return (
    <div className={`park-card ${list ? 'is-list' : ''}`} onClick={onClick}>
      <div className="park-card-media">
        <div
          className="park-card-media-img"
          style={{ backgroundImage: `url('${park.img}')` }}
        />
        <button
          className={`park-card-fav ${fav ? 'is-active' : ''}`}
          onClick={toggleFav}
          aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
        >
          <Icon
            name="heart"
            size={16}
            strokeWidth={fav ? 0 : 1.6}
            style={{ fill: fav ? 'currentColor' : 'none' }}
          />
        </button>
        <span className="park-card-price">
          <span className="cur">from </span>${park.price}
        </span>
      </div>
      <div className="park-card-body">
        <div className="row-between">
          <h4>{park.name}</h4>
          <StarRow value={park.rating} />
        </div>
        <div className="park-card-meta">
          <Icon name="pin" size={13} />
          {park.country}
        </div>
        <div className="park-card-meta">
          <Icon name="clock" size={13} />
          {park.hours}
        </div>
        {list && (
          <p className="text-sm muted mt-8" style={{ maxWidth: '60ch' }}>
            Plan a full day of family-friendly attractions, signature thrill rides,
            and seasonal events. Includes early entry option and skip-the-line
            access on premium tickets.
          </p>
        )}
        <div className="park-card-tags">
          {park.tags.map((t) => (
            <Chip key={t} tone={t === 'Thrill' ? 'primary' : 'default'}>
              {t}
            </Chip>
          ))}
          <Chip tone="success" icon="check">
            Confirmed
          </Chip>
        </div>
      </div>
    </div>
  );
}
