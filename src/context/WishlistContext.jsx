import { createContext, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext(null);

const WISHLIST_STORAGE_KEY = "zelora_wishlist";

function getStoredWishlist() {
  try {
    const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  } catch (error) {
    console.error("Failed to load wishlist:", error);
    return [];
  }
}

function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(getStoredWishlist);

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems((currentItems) => {
      const alreadyExists = currentItems.some((item) => item.id === product.id);

      if (alreadyExists) {
        return currentItems;
      }

      const wishlistProduct = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        description: product.description,
        rating: product.rating,
      };

      return [...currentItems, wishlistProduct];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  const toggleWishlistItem = (product) => {
    const alreadyExists = wishlistItems.some((item) => item.id === product.id);

    if (alreadyExists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const wishlistCount = useMemo(() => {
    return wishlistItems.length;
  }, [wishlistItems]);

  const value = {
    wishlistItems,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlistItem,
    isInWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
}

export { WishlistProvider, useWishlist };