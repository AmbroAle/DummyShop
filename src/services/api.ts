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
    return { products: [], total: 0, skip, limit };
  }
};

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

export const searchProducts = async (query: string, limit: number = 20, skip: number = 0): Promise<ProductsResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/products/search?q=${query}&limit=${limit}&skip=${skip}`);
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

export const getProductsByCategory = async (categorySlug: string, limit: number = 20, skip: number = 0): Promise<ProductsResponse> => {
    try {
      const response = await fetch(`${BASE_URL}/products/category/${categorySlug}?limit=${limit}&skip=${skip}`);
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