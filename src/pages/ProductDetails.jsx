import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LoadingState from "@/components/common/LoadingState";
import FeedbackState from "@/components/common/FeedbackState";

import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const {
    productsLoading,
    productsError,
    fetchProducts,
    getProductById,
    getRelatedProducts,
  } = useProducts();

  const { addToCart } = useCart();

  const product = getProductById(id);

  const relatedProducts = product
    ? getRelatedProducts(product.id, product.category, 4)
    : [];

  const tabClass = ({ isActive }) =>
    isActive
      ? "border-slate-950 text-slate-950"
      : "border-transparent text-slate-500 hover:text-slate-950";

  if (productsLoading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <LoadingState message="Loading product details..." />
      </main>
    );
  }

  if (productsError) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <FeedbackState
          type="error"
          title="Product details could not load"
          message={productsError}
          actionLabel="Try again"
          onAction={fetchProducts}
        />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <FeedbackState
          type="empty"
          title="Product not found"
          message="The product you are looking for may have been removed or is currently unavailable."
          actionLabel="Back to shop"
          actionTo="/products"
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <Link
        to="/products"
        className="mb-8 inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-950"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to shop
      </Link>

      <section className="grid gap-10 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-slate-50 p-6">
          <div className="flex min-h-[520px] items-center justify-center rounded-[1.5rem] bg-white p-10">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[430px] object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <Badge variant="secondary" className="w-fit capitalize">
            {product.category}
          </Badge>

          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-950">
            {product.title}
          </h1>

          {product.rating && (
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <Star className="h-4 w-4 fill-current text-yellow-500" />
              <span className="font-medium text-slate-950">
                {product.rating.rate}
              </span>
              <span>({product.rating.count} reviews)</span>
            </div>
          )}

          <p className="mt-6 text-3xl font-bold text-slate-950">
            ${product.price}
          </p>

          <p className="mt-5 max-w-xl leading-7 text-slate-500">
            {product.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={() => addToCart(product)}>
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to cart
            </Button>

            <Link to="/cart">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View bag
              </Button>
            </Link>
          </div>

          <div className="mt-8 grid gap-3 rounded-3xl border bg-white p-5 text-sm text-slate-500 sm:grid-cols-3">
            <div>
              <p className="font-semibold text-slate-950">Delivery</p>
              <p className="mt-1">Trackable shipping</p>
            </div>

            <div>
              <p className="font-semibold text-slate-950">Returns</p>
              <p className="mt-1">Eligible returns supported</p>
            </div>

            <div>
              <p className="font-semibold text-slate-950">Checkout</p>
              <p className="mt-1">Secure order flow</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <div className="border-b">
          <nav className="flex gap-6 overflow-x-auto">
            <NavLink
              to="."
              end
              className={({ isActive }) =>
                `border-b-2 px-1 py-4 text-sm font-semibold transition ${tabClass({
                  isActive,
                })}`
              }
            >
              Overview
            </NavLink>

            <NavLink
              to="reviews"
              className={({ isActive }) =>
                `border-b-2 px-1 py-4 text-sm font-semibold transition ${tabClass({
                  isActive,
                })}`
              }
            >
              Reviews
            </NavLink>

            <NavLink
              to="specifications"
              className={({ isActive }) =>
                `border-b-2 px-1 py-4 text-sm font-semibold transition ${tabClass({
                  isActive,
                })}`
              }
            >
              Specifications
            </NavLink>
          </nav>
        </div>

        <Outlet context={{ product, relatedProducts }} />
      </section>
    </main>
  );
}

export default ProductDetails;