import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
  ReactNode,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import Product from '../models/Product';

interface CartProviderProps {
  children: ReactNode; // Tipagem para um elemento filho
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
  clearCart(): void;
  applyCupom(cupom: string): void;
  totalItensInCart: number;
}

const CartContext = createContext<CartContext | null>(null);

function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [cumpo, setCupom] = useState('');

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const productsStorage = await AsyncStorage.getItem('@PhComics:items');

      if (productsStorage) {
        setProducts(JSON.parse(productsStorage));
      }
    }
    loadProducts();
  }, []);

  const increment = useCallback(
    async id => {
      const newProducts = [...products];
      const incrementIndex = newProducts.findIndex(
        product => product.id === id,
      );

      newProducts[incrementIndex].quantity += 1;
      setProducts(newProducts);

      await AsyncStorage.setItem(
        '@PhComics:items',
        JSON.stringify(newProducts),
      );
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const newProducts = [...products];

      const decrementIndex = newProducts.findIndex(
        product => product.id === id,
      );

      if (newProducts[decrementIndex].quantity > 1) {
        newProducts[decrementIndex].quantity -= 1;
      } else {
        newProducts.splice(decrementIndex, 1);
      }

      setProducts(newProducts);

      await AsyncStorage.setItem(
        '@PhComics:items',
        JSON.stringify(newProducts),
      );
    },
    [products],
  );

  const addToCart = useCallback(
    async product => {
      const checkProduct = product as Product;
      const productsStored = [...products];
      const checkIfExists = productsStored.findIndex(
        item => item.id === checkProduct.id,
      );

      if (checkIfExists >= 0) {
        await increment(checkProduct.id);
        return;
      }

      const { id, title, image_url, price, description, rare } = product;

      const productQuantified = {
        id,
        title,
        image_url,
        price,
        description,
        quantity: 1,
        discount: 0,
        rare,
      };

      const newProducts = [...products, productQuantified];
      setProducts(newProducts);

      await AsyncStorage.setItem(
        '@PhComics:items',
        JSON.stringify(newProducts),
      );
    },
    [products, increment],
  );

  const clearCart = useCallback(async () => {
    setCupom('');

    setProducts([]);

    await AsyncStorage.setItem('@PhComics:items', '');
  }, []);

  const applyCupom = useCallback(
    async cupom => {
      const newProducts = [...products];

      newProducts.forEach((item: Product) => {
        item.discount = 0;
        if (cupom.toUpperCase() === 'RARO') {
          item.discount = 25;
        }
        if (cupom.toUpperCase() === 'COMUM' && !item.rare) {
          item.discount = 10;
        }
      });
      setProducts(newProducts);

      await AsyncStorage.setItem(
        '@PhComics:items',
        JSON.stringify(newProducts),
      );
    },
    [products],
  );

  const totalItensInCart = React.useMemo(() => {
    const quantitySum = products.reduce((a, b) => a + b.quantity, 0);

    return quantitySum;
  }, [products]);

  const value = React.useMemo(
    () => ({
      addToCart,
      increment,
      decrement,
      products,
      clearCart,
      totalItensInCart,
      applyCupom,
    }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
