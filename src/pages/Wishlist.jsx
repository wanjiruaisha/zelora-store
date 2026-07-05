import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FeedbackState from "@/components/common/FeedbackState";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

function Wishlist() {
  const { addToCart } = useCart();
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <FeedbackState
          type="empty"
          title="Your wishlist is empty"
          message="Save products you love and come back to them when you're ready to shop."
          actionLabel="Explore products"
          actionTo="/products"
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Saved items</p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950">
            Your wishlist
          </h1>

          <p className="mt-3 text-slate-500">
            Keep track of products you love before adding them to your bag.
          </p>
        </div>

        <Button variant="outline" onClick={clearWishlist}>
          Clear wishlist
        </Button>
      </section>

      <section className="grid gap-5">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="border-slate-200">
            <CardContent className="grid gap-5 p-4 sm:grid-cols-[120px_1fr_auto] sm:items-center">
              <Link
                to={`/products/${item.id}`}
                className="flex h-28 w-28 items-center justify-center rounded-2xl bg-slate-50 p-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full object-contain"
                />
              </Link>

              <div>
                <div className="mb-2 flex items-center gap-2 text-sm text-red-600">
                  <Heart className="h-4 w-4 fill-current" />
                  Saved item
                </div>

                <Link to={`/products/${item.id}`}>
                  <h2 className="font-semibold leading-6 text-slate-950 hover:text-slate-700">
                    {item.title}
                  </h2>
                </Link>

                <p className="mt-1 text-sm capitalize text-slate-500">
                  {item.category}
                </p>

                <p className="mt-3 text-lg font-bold text-slate-950">
                  ${item.price}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:items-end">
                <Button onClick={() => handleMoveToCart(item)}>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Move to cart
                </Button>

                <Button
                  variant="ghost"
                  className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}

export default Wishlist;