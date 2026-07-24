
const BASE_URL = 'https://dummyjson.com';


export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}


/**
 * Recupera una lista di prodotti, con opzioni per la paginazione.
 * @param limit Numero di prodotti da recuperare (default 20, il max nell'UI è 20 per pagina)
 * @param skip Quanti prodotti saltare (es. skip=20 recupera la seconda pagina)
 */
export const getProducts = async (limit: number = 20, skip: number = 0): Promise<ProductsResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }
    const data: ProductsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Errore nel caricamento prodotti:", error);
    // In caso di errore restituiamo un oggetto vuoto che rispetta l'interfaccia
    return { products: [], total: 0, skip, limit };
  }
};

/**
 * Recupera le informazioni di un singolo prodotto tramite ID.
 */
export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Prodotto ${id} non trovato`);
    }
    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error(`Errore nel caricamento del prodotto ${id}:`, error);
    return null;
  }
};

/**
 * Recupera tutte le categorie disponibili.
 * Tipizziamo per entrambi i casi per sicurezza.
 */
export const getCategories = async (): Promise<{slug: string, name: string}[] | string[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Errore nel caricamento categorie:", error);
    return [];
  }
};

/**
 * Cerca prodotti tramite una stringa di testo.
 */
export const searchProducts = async (query: string): Promise<ProductsResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/products/search?q=${query}`);
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }
    const data: ProductsResponse = await response.json();
    return data;
  } catch (error) {
    console.error(`Errore nella ricerca per "${query}":`, error);
    return { products: [], total: 0, skip: 0, limit: 0 };
  }
};

/**
 * Recupera i prodotti filtrati per una specifica categoria.
 */
export const getProductsByCategory = async (categorySlug: string): Promise<ProductsResponse> => {
    try {
      const response = await fetch(`${BASE_URL}/products/category/${categorySlug}`);
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      const data: ProductsResponse = await response.json();
      return data;
    } catch (error) {
      console.error(`Errore nel caricamento della categoria "${categorySlug}":`, error);
      return { products: [], total: 0, skip: 0, limit: 0 };
    }
  };