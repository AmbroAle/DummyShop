import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts, getCategories, getProductsByCategory, searchProducts, Product } from '../services/api';
import ProductModal from '../components/ProductModal';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{slug: string, name: string}[] | string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [page, setPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const limit = 20;

  useEffect(() => {
    getCategories().then(data => setCategories(data));
    loadProducts('ALL', 1);
  }, []);

  // EFFETTO DEBOUNCE PER LA RICERCA
  useEffect(() => {
    if (searchQuery === '' && activeCategory !== 'SEARCH') return;

    const delayTimer = setTimeout(() => {
      if (searchQuery.trim() !== '') {
        loadProducts('SEARCH', 1, searchQuery);
      } else if (activeCategory === 'SEARCH') {
        loadProducts('ALL', 1);
      }
    }, 500); 

    return () => clearTimeout(delayTimer);
  }, [searchQuery]);


  const loadProducts = async (categorySlug: string, targetPage: number, query: string = '') => {
    setLoading(true);
    setActiveCategory(categorySlug);
    
    const targetSkip = (targetPage - 1) * limit;

    try {
      let data;
      if (categorySlug === 'SEARCH') {
        data = await searchProducts(query, limit, targetSkip);
      } else if (categorySlug === 'ALL') {
        data = await getProducts(limit, targetSkip);
      } else {
        data = await getProductsByCategory(categorySlug, limit, targetSkip);
      }
      
      setProducts(data.products);
      setTotalProducts(data.total);
      setPage(targetPage);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalProducts / limit);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="app-container">
      <header className="navbar">
        <h2 style={{ letterSpacing: '2px' }}>
          DUMMY<span style={{ color: '#ff3d00' }}>SHOP</span>
        </h2>
        <input 
          type="text" 
          className='search-bar'
          placeholder="Search products..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '300px', padding: '10px', background: '#1a1a1a', border: '1px solid #333', color: 'white' }}
        />
        <button className="btn-add" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          CART
        </button>
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <h4 style={{ marginBottom: '20px', color: '#fff' }}>CATEGORIES</h4>
          <ul>
            <li 
              className={activeCategory === 'ALL' ? 'active' : ''}
              onClick={() => {
                setSearchQuery(''); 
                loadProducts('ALL', 1);
              }}
            >
              ALL PRODUCTS
            </li>
            
            {categories.map((cat, index) => {
              const catSlug = typeof cat === 'string' ? cat : cat.slug;
              const catName = typeof cat === 'string' ? cat : cat.name;
              
              return (
                <li 
                  key={index}
                  className={activeCategory === catSlug ? 'active' : ''}
                  onClick={() => {
                    setSearchQuery(''); 
                    loadProducts(catSlug, 1);
                  }}
                >
                  {catName.toUpperCase()}
                </li>
              );
            })}
          </ul>
        </aside>

        <main className="products-area">
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
            <h3>
              {activeCategory === 'ALL' ? 'ALL PRODUCTS' : 
               activeCategory === 'SEARCH' ? `SEARCH RESULTS FOR "${searchQuery}"` : 
               activeCategory.toUpperCase().replace('-', ' ')}
              <span style={{ color: '#888', marginLeft: '10px' }}>{totalProducts}</span>
            </h3>
            <span style={{ color: '#888', fontSize: '14px' }}>
              PAGE {page} / {totalPages || 1}
            </span>
          </div>

          {loading ? (
            <p style={{ marginTop: '20px' }}>Loading products...</p>
          ) : (
            <>
              {products.length === 0 ? (
                <p style={{ marginTop: '20px', color: '#888' }}>Nessun prodotto trovato.</p>
              ) : (
                <div className="grid">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} onClick={(product)=> setSelectedProduct(product)} />
                  ))}
                </div>
              )}

              {/* PAGINAZIONE */}
              {totalPages > 1 && (
                <div className="pagination-bar">
                  <button 
                    className="btn-nav"
                    disabled={page === 1} 
                    onClick={() => loadProducts(activeCategory, page - 1, searchQuery)}
                  >
                    &larr; PREV
                  </button>

                  <div className="page-numbers">
                    {pageNumbers.map(num => (
                      <button 
                        key={num}
                        className={`page-num ${page === num ? 'active' : ''}`}
                        onClick={() => loadProducts(activeCategory, num, searchQuery)}
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  <button 
                    className="btn-nav"
                    disabled={page >= totalPages} 
                    onClick={() => loadProducts(activeCategory, page + 1, searchQuery)}
                  >
                    NEXT &rarr;
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
 {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
    </div>
  );
}