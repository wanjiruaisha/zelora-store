import { Search, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFilter } from "@/context/FilterContext";

function ProductToolbar({ categories = [], resultCount = 0 }) {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption,
    clearFilters,
  } = useFilter();

  const hasActiveFilters =
    searchTerm || selectedCategory !== "all" || sortOption !== "featured";

  return (
    <section className="mb-8 rounded-3xl border bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Shop the edit</p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Curated products
          </h2>
        </div>

        <p className="text-sm text-slate-500">
          {resultCount} {resultCount === 1 ? "item" : "items"} found
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by product name..."
            className="h-11 pl-9"
          />
        </div>

        <div className="relative">
          <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="h-11 w-full rounded-md border border-input bg-background px-9 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <select
          value={sortOption}
          onChange={(event) => setSortOption(event.target.value)}
          className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to high</option>
          <option value="price-high">Price: High to low</option>
          <option value="name-az">Name: A to Z</option>
          <option value="rating-high">Highest rated</option>
        </select>

        <Button
          variant="outline"
          onClick={clearFilters}
          disabled={!hasActiveFilters}
          className="h-11"
        >
          <X className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>
    </section>
  );
}

export default ProductToolbar;