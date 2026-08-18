import { Product } from '../services/api';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const discount = Math.round(product.discountPercentage);

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
              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.399 8.168 1.399 8.168-7.333-3.858-7.333 3.858 1.399-8.168-5.934-5.787 8.2-1.192z" />
            </svg>
            {product.rating}
          </span>
        </div>

        <button
          className="btn-add"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          + ADD
        </button>
      </div>
    </div>
  );
}