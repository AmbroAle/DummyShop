import { Product } from '../services/api';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const discount = Math.round(product.discountPercentage);
  const { addToCart } = useCart();

  return (
    <div
      className="card"
      onClick={() => onClick(product)}
      style={{ cursor: 'pointer' }}
    >
      <div className="badge">-{discount}%</div>

      <img src={product.thumbnail} alt={product.title} />

      <p style={{ color: '#888', fontSize: '12px' }}>
        {product.category}
      </p>

      <h3 style={{ fontSize: '16px', margin: '5px 0' }}>
        {product.title}
      </h3>

      <div className="card-footer">
        <div>
          <span
            style={{
              color: '#ff3d00',
              fontWeight: 'bold',
              marginRight: '10px'
            }}
          >
            ${product.price}
          </span>

          <span
            style={{
              textDecoration: 'line-through',
              color: '#666',
              fontSize: '12px'
            }}
          >
            ${(product.price * 1.2).toFixed(2)}
          </span>

          <span
            style={{
              color: '#666',
              fontSize: '10px',
              display: 'flex',
              gap: '4px',
              lineHeight: '1.2'
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="#ff3d00"
              style={{ verticalAlign: 'baseline' }}
            >
              <path d="M12 2.5l2.95 6.02 6.64.97-4.8 4.68 1.13 6.61L12 17.66l-5.92 3.12 1.13-6.61-4.8-4.68 6.64-.97L12 2.5z" />
            </svg>
            {product.rating}
          </span>
        </div>

        <button
          className="btn-add"
          onClick={(e) => {
            addToCart(product)
            e.stopPropagation();
          }}
        >
          + ADD
        </button>
      </div>
    </div>
  );
}