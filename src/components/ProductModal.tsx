import { Product } from '../services/api';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const discount = Math.round(product.discountPercentage);
  const originalPrice = (product.price * (1 + discount / 100)).toFixed(2);
  const { addToCart } = useCart();

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Interrompiamo la propagazione per non chiudere il modale se clicchiamo dentro */}
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* HEADER */}
        <header className="modal-header">
          <button className="modal-btn-icon" onClick={onClose}>
            &larr; BACK
          </button>
          <span>
            {product.category}
          </span>
          <button className="modal-btn-icon modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </header>

        {/* BODY */}
        <div className="modal-body">
          <div className="modal-image-col">
            <img src={product.images[0] || product.thumbnail} alt={product.title} />
          </div>

          <div className="modal-info-col">
            <div>
              <p className="modal-brand">
                {product.brand || 'Generic Brand'}
              </p>
              <h1 className="modal-title">{product.title}</h1>

              <div className="modal-price-block">
                <span className="modal-price-current">${product.price}</span>
                <span className="modal-price-old">${originalPrice}</span>
                <span className="modal-discount-badge">-{discount}% OFF</span>
              </div>

              <div className="modal-stats-grid">
                <div className="stat-box">
                  <div className="stat-label">RATING</div>
                  <div className="stat-value">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff3d00">
                      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.399 8.168-7.333-3.858-7.333 3.858 1.399-8.168-5.934-5.787 8.2-1.192z"/>
                    </svg>
                    {product.rating}
                  </div>
                </div>
                <div className="stat-box">
                  <div className="stat-label">STOCK</div>
                  <div className="stat-value">{product.stock} units</div>
                </div>
              </div>

              <p className="modal-description">
                {product.description}
              </p>
            </div>

            <button className="btn-add-large" onClick={e => addToCart(product)}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}