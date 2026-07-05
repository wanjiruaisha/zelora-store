import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import CartItem from "@/components/cart/CartItem";
import FeedbackState from "@/components/common/FeedbackState";

import { useCart } from "@/context/CartContext";

function Cart() {
  const { cartItems, cartSummary, clearCart } = useCart();

  const {
    subtotal,
    shipping,
    tax,
    total,
    itemCount,
    amountUntilFreeShipping,
  } = cartSummary;

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <FeedbackState
          type="cart"
          title="Your shopping bag is empty"
          message="Start exploring the Zelora collection and add your favorite pieces to your bag."
          actionLabel="Shop products"
          actionTo="/products"
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Shopping bag</p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950">
            Review your cart
          </h1>

          <p className="mt-3 text-slate-500">
            You have {itemCount} {itemCount === 1 ? "item" : "items"} in your
            bag.
          </p>
        </div>

        <Button variant="outline" onClick={clearCart}>
          Clear cart
        </Button>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <aside className="h-fit rounded-3xl border bg-white p-6 shadow-sm lg:sticky lg:top-28">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white">
              <ShoppingBag className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold text-slate-950">Order summary</h2>
              <p className="text-sm text-slate-500">Calculated before payment</p>
            </div>
          </div>

          {amountUntilFreeShipping > 0 ? (
            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Add{" "}
              <span className="font-semibold text-slate-950">
                ${amountUntilFreeShipping.toFixed(2)}
              </span>{" "}
              more to unlock free shipping.
            </div>
          ) : (
            <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
              You qualify for free shipping.
            </div>
          )}

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-medium text-slate-950">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Shipping</span>
              <span className="font-medium text-slate-950">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Estimated tax</span>
              <span className="font-medium text-slate-950">
                ${tax.toFixed(2)}
              </span>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-base">
                <span className="font-semibold text-slate-950">Total</span>
                <span className="font-bold text-slate-950">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <Link to="/checkout">
            <Button className="mt-6 w-full" size="lg">
              Continue to checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link to="/products">
            <Button variant="outline" className="mt-3 w-full">
              Continue shopping
            </Button>
          </Link>
        </aside>
      </section>
    </main>
  );
}

export default Cart;