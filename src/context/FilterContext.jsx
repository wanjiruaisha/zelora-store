import { createContext, useContext, useMemo, useState } from "react";

const FilterContext = createContext(null);

function FilterProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("featured");

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortOption("featured");
  };

  const filterAndSortProducts = (products) => {
    let filteredProducts = [...products];

    if (searchTerm.trim()) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    switch (sortOption) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;

      case "name-az":
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "rating-high":
        filteredProducts.sort(
          (a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)
        );
        break;

      default:
        break;
    }

    return filteredProducts;
  };

  const hasActiveFilters = useMemo(() => {
    return (
      searchTerm.trim() !== "" ||
      selectedCategory !== "all" ||
      sortOption !== "featured"
    );
  }, [searchTerm, selectedCategory, sortOption]);

  const value = {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption,
    clearFilters,
    filterAndSortProducts,
    hasActiveFilters,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

function useFilter() {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error("useFilter must be used inside FilterProvider");
  }

  return context;
}

export { FilterProvider, useFilter };