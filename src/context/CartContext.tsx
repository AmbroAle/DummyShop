import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../services/api';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: Product) => void;
  increaseQuantity: (productId: Product) => void;
  decreaseQuantity: (productId: Product) => void;
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

    const removeFromCart = (product : Product) => {
        setCartItems(prev => prev.filter(item => item.product.id != product.id));
    }

    const increaseQuantity = (product : Product) => {
        setCartItems(prev => prev.map(item => item.product.id == product.id ? {...item, quantity: item.quantity + 1} : item))
    }

    const decreaseQuantity = (product : Product) => {
        setCartItems(prev => prev.map(item => item.product.id == product.id ? {...item, quantity: item.quantity - 1} : item).filter(item => item.quantity > 0))
    }

    const clearCart = () => {
        setCartItems([]);
    };

    const totalItems = cartItems.reduce((total, item) => total + item.quantity,0);

    const totalPrice = cartItems.reduce(
        (total, item) =>
        total + item.product.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
        value={{
            cartItems,
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            clearCart,
            totalItems,
            totalPrice
        }}
        >
        {children}
        </CartContext.Provider>
    );
};

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}