import Drawer from '@mui/material/Drawer';
import { useCart } from '../context/CartContext';
import '../styles/CartAside.css';

interface CartAsideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartAside({
  isOpen,
  onClose
}: CartAsideProps) {

  const {
    cartItems,
    totalItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCart();

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      slotProps={{
        paper: {
          className: 'cart-drawer'
        }
      }}
    >
      <div className="cart-container">

        {/* HEADER */}
        <div className="cart-header">
          <div>
            <h2>CART</h2>
            <span>{totalItems} items</span>
          </div>

          <button
            className="cart-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* CONTENT */}
        <div className="cart-content">

          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">
                □
              </div>

              <p>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div
                className="cart-item"
                key={item.product.id}
              >

                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="cart-item-image"
                />

                <div className="cart-item-info">

                  <div className="cart-item-top">
                    <h3>{item.product.title}</h3>

                    <button
                      className="cart-remove"
                      onClick={() =>
                        removeFromCart(item.product)
                      }
                    >
                      ×
                    </button>
                  </div>

                  <p className="cart-item-price">
                    ${item.product.price.toFixed(2)}
                  </p>

                  <div className="cart-item-bottom">

                    <div className="quantity-controls">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.product)
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.product)
                        }
                      >
                        +
                      </button>

                    </div>

                    <span className="cart-item-total">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>

                  </div>

                </div>
              </div>
            ))
          )}

        </div>

        {/* FOOTER */}
        {cartItems.length > 0 && (
          <div className="cart-footer">

            <div className="cart-total-row">
              <span>TOTAL</span>

              <strong>
                ${totalPrice.toFixed(2)}
              </strong>
            </div>

            <button className="checkout-button">
              CHECKOUT
            </button>

          </div>
        )}

      </div>
    </Drawer>
  );
}