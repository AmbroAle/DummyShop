import { Product } from '../services/api';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product } : ProductCardProps) {
  // Calcoliamo la percentuale di sconto finta per il badge rosso
  const discount = Math.round(product.discountPercentage);

  return (
    <div className="card">
      <div className="badge">-{discount}%</div>
      <img src={product.thumbnail} alt={product.title} />
      
      <p style={{ color: '#888', fontSize: '12px' }}>{product.category}</p>
      <h3 style={{ fontSize: '16px', margin: '5px 0' }}>{product.title}</h3>
      
      <div className="card-footer">
        <div>
          <span style={{ color: '#ff3d00', fontWeight: 'bold', marginRight: '10px' }}>
            ${product.price}
          </span>
          <span style={{ textDecoration: 'line-through', color: '#666', fontSize: '12px' }}>
            ${(product.price * 1.2).toFixed(2)}
          </span>
        </div>
        <button className="btn-add">+ ADD</button>
      </div>
    </div>
  );
}