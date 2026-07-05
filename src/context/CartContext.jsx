import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "zelora_cart";

const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_FEE = 8.99;
const TAX_RATE = 0.08;

function getStoredCart() {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return [];
  }
}

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getStoredCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const cartProduct = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        description: product.description,
        rating: product.rating,
        quantity: 1,
      };

      return [...currentItems, cartProduct];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartSummary = useMemo(() => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const itemCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const shipping =
      subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

    const tax = subtotal * TAX_RATE;

    const total = subtotal + shipping + tax;

    return {
      subtotal,
      itemCount,
      shipping,
      tax,
      total,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      amountUntilFreeShipping: Math.max(
        FREE_SHIPPING_THRESHOLD - subtotal,
        0
      ),
    };
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartSummary,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}

export { CartProvider, useCart };