import ProductCard from "@/components/product/ProductCard";
import ProductToolbar from "@/components/product/ProductToolbar";
import FeedbackState from "@/components/common/FeedbackState";
import LoadingState from "@/components/common/LoadingState";

import { useProducts } from "@/context/ProductContext";
import { useFilter } from "@/context/FilterContext";

function Products() {
  const {
    products,
    productsLoading,
    productsError,
    categories,
    fetchProducts,
  } = useProducts();

  const { filterAndSortProducts, clearFilters } = useFilter();

  const displayedProducts = filterAndSortProducts(products);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="mb-10">
        <p className="text-sm font-medium text-slate-500">Zelora collection</p>

        <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950">
              Shop curated essentials
            </h1>

            <p className="mt-3 max-w-2xl text-slate-500">
              Browse refined everyday pieces across fashion, accessories,
              electronics, and lifestyle picks.
            </p>
          </div>
        </div>
      </section>

      {productsLoading && (
        <LoadingState message="Loading the latest collection..." />
      )}

      {!productsLoading && productsError && (
        <FeedbackState
          type="error"
          title="We could not load the collection"
          message={productsError}
          actionLabel="Retry"
          onAction={fetchProducts}
        />
      )}

      {!productsLoading && !productsError && (
        <>
          <ProductToolbar
            categories={categories}
            resultCount={displayedProducts.length}
          />

          {displayedProducts.length === 0 ? (
            <FeedbackState
              type="empty"
              title="No products matched your search"
              message="Try clearing your filters or searching for a different product."
              actionLabel="Clear filters"
              onAction={clearFilters}
            />
          ) : (
            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default Products;