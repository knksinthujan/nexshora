import { Icon } from './Icon';
import { Button } from './Button';
import { useCart } from '@/context/CartContext';
import { useRouter } from '@/context/RouterContext';

export function CartDrawer() {
  const { items, updateQty, total, open, setOpen } = useCart();
  const { go } = useRouter();

  return (
    <>
      <div
        className={`cart-backdrop ${open ? 'is-open' : ''}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`cart-drawer ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        <div className="cart-head">
          <div>
            <h4 style={{ marginBottom: 2 }}>Your basket</h4>
            <span className="text-sm muted">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            className="icon-btn"
            onClick={() => setOpen(false)}
            aria-label="Close cart"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="cart-body">
          {items.length === 0 && (
            <div className="text-center muted" style={{ padding: '48px 0' }}>
              <Icon name="bag" size={36} />
              <p className="mt-16 text-sm">
                Your basket is empty.
                <br />
                Browse the organic store to add goods.
              </p>
              <Button
                variant="dark"
                className="mt-16"
                onClick={() => {
                  setOpen(false);
                  go('market');
                }}
              >
                Go to store
              </Button>
            </div>
          )}
          {items.map((i) => (
            <div key={i.id} className="cart-line">
              <div className="cart-line-img" />
              <div className="cart-line-info">
                <h5>{i.name}</h5>
                <span className="origin">{i.origin}</span>
                <div
                  className="row mt-8"
                  style={{ justifyContent: 'space-between' }}
                >
                  <span className="qty">
                    <button onClick={() => updateQty(i.id, -1)}>
                      <Icon name="minus" size={12} />
                    </button>
                    <span className="n">{i.qty}</span>
                    <button onClick={() => updateQty(i.id, 1)}>
                      <Icon name="plus" size={12} />
                    </button>
                  </span>
                  <span className="fw-600">${(i.price * i.qty).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="cart-foot">
            <div className="row-between mb-16">
              <span className="muted">Subtotal</span>
              <span className="fw-600">${total.toFixed(2)}</span>
            </div>
            <Button
              variant="primary"
              className="btn-block mt-16"
              iconRight="arrowRight"
            >
              Checkout
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
