import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/product/ProductCard";
import LoadingState from "@/components/common/LoadingState";
import FeedbackState from "@/components/common/FeedbackState";
import { useProducts } from "@/context/ProductContext";

function Home() {
  const { products, productsLoading, productsError, fetchProducts } =
    useProducts();

  const featuredProducts = products.slice(0, 4);

  return (
    <main>
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-4 py-20 lg:grid-cols-2">
          <div>
            <Badge className="mb-6 bg-white text-slate-950 hover:bg-white">
              New season essentials
            </Badge>

            <h1 className="max-w-2xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Curated essentials for modern everyday living.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Discover quality fashion, lifestyle pieces, accessories, and
              smart finds selected to make shopping feel simple, refined, and
              worth it.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/products">
                <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-100">
                  Shop collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link to="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white bg-transparent text-white hover:bg-white hover:text-slate-950"
                >
                  Explore best sellers
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] bg-white p-5 shadow-2xl">
              <div className="grid gap-4 sm:grid-cols-2">
                {featuredProducts.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    className="rounded-3xl bg-slate-50 p-5 text-slate-950"
                  >
                    <div className="flex h-40 items-center justify-center rounded-2xl bg-white p-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full object-contain"
                      />
                    </div>

                    <p className="mt-4 line-clamp-1 text-sm font-semibold">
                      {product.title}
                    </p>

                    <p className="mt-1 text-sm font-bold">${product.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-3xl bg-white p-5 text-slate-950 shadow-xl md:block">
              <p className="text-sm text-slate-500">Customer rating</p>
              <p className="mt-1 text-2xl font-bold">4.8/5</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 md:grid-cols-3">
        <div className="rounded-3xl border bg-white p-6">
          <Truck className="h-7 w-7 text-slate-950" />
          <h3 className="mt-4 font-semibold text-slate-950">
            Reliable delivery
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Trackable shipping and clear order updates from checkout to
            delivery.
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6">
          <Sparkles className="h-7 w-7 text-slate-950" />
          <h3 className="mt-4 font-semibold text-slate-950">
            Curated selection
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            A refined product edit built around quality, usefulness, and style.
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6">
          <ShieldCheck className="h-7 w-7 text-slate-950" />
          <h3 className="mt-4 font-semibold text-slate-950">
            Secure checkout
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            A smooth cart-to-checkout experience designed with trust in mind.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Featured picks</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              Fresh from the collection
            </h2>
          </div>

          <Link to="/products">
            <Button variant="outline">
              View all products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {productsLoading && (
          <LoadingState message="Finding the best products for you..." />
        )}

        {!productsLoading && productsError && (
          <FeedbackState
            type="error"
            title="Products could not load"
            message={productsError}
            actionLabel="Try again"
            onAction={fetchProducts}
          />
        )}

        {!productsLoading && !productsError && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;