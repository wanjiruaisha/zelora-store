import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ProductContext = createContext(null);

const PRODUCTS_API_URL = "https://fakestoreapi.com/products";

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      setProductsError("");

      const response = await fetch(PRODUCTS_API_URL);

      if (!response.ok) {
        throw new Error("Product request failed");
      }

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProductsError(
        "We could not load products right now. Please try again."
      );
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = products.map((product) => product.category);
    return [...new Set(uniqueCategories)];
  }, [products]);

  const getProductById = (productId) => {
    return products.find((product) => String(product.id) === String(productId));
  };

  const getRelatedProducts = (productId, category, limit = 4) => {
    return products
      .filter(
        (product) =>
          String(product.id) !== String(productId) &&
          product.category === category
      )
      .slice(0, limit);
  };

  const value = {
    products,
    productsLoading,
    productsError,
    categories,
    fetchProducts,
    getProductById,
    getRelatedProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used inside ProductProvider");
  }

  return context;
}

export { ProductProvider, useProducts };