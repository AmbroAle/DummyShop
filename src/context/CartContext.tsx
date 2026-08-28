import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../services/api';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({children}:{children: ReactNode}){
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setCartItems(prev =>{
            const existingItems = prev.find( item => item.product.id == product.id);

            if (existingItems) {
                return prev.map(item => 
                    item.product.id == product.id ? {...item, quantity: item.quantity + 1} : item
                )
            }
            return [...prev, {product, quantity: 1}]
        });
    };
};