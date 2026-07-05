import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, CreditCard, MapPin, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FeedbackState from "@/components/common/FeedbackState";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

function Checkout() {
  const { cartItems, cartSummary, clearCart } = useCart();
  const { user } = useAuth();

  const { subtotal, shipping, tax, total } = cartSummary;

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const [error, setError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (orderPlaced) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <FeedbackState
          type="success"
          title="Order placed successfully"
          message="Thank you for shopping with Zelora. Your order has been received and is being prepared for confirmation."
          actionLabel="Continue shopping"
          actionTo="/products"
        />
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <FeedbackState
          type="cart"
          title="Your bag is empty"
          message="Add items to your shopping bag before proceeding to checkout."
          actionLabel="Shop products"
          actionTo="/products"
        />
      </main>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "address",
      "city",
    ];

    const hasEmptyField = requiredFields.some(
      (field) => !formData[field].trim()
    );

    if (hasEmptyField) {
      setError("Please fill in all required delivery details.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setOrderPlaced(true);
    clearCart();
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="mb-8">
        <p className="text-sm font-medium text-slate-500">Secure checkout</p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
          Complete your order
        </h1>

        <p className="mt-3 max-w-2xl text-slate-500">
          Review your items and provide delivery details to place your Zelora
          order.
        </p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white">
              <User className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold text-slate-950">
                Contact information
              </h2>
              <p className="text-sm text-slate-500">
                We’ll use this to confirm your order.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-slate-700"
              >
                Full name *
              </label>

              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="mt-2 h-11"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Email address *
              </label>

              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-2 h-11"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="text-sm font-medium text-slate-700"
              >
                Phone number *
              </label>

              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+254..."
                className="mt-2 h-11"
              />
            </div>

            <div>
              <label
                htmlFor="city"
                className="text-sm font-medium text-slate-700"
              >
                City *
              </label>

              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Nairobi"
                className="mt-2 h-11"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="text-sm font-medium text-slate-700"
              >
                Delivery address *
              </label>

              <div className="relative mt-2">
                <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />

                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Apartment, street, building, or delivery notes"
                  rows="4"
                  className="w-full rounded-md border border-input bg-background px-9 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="notes"
                className="text-sm font-medium text-slate-700"
              >
                Order notes
              </label>

              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Optional delivery instructions"
                rows="3"
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {error && (
            <div className="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <Button type="submit" className="mt-6 w-full" size="lg">
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Place order
          </Button>
        </form>

        <aside className="h-fit rounded-3xl border bg-white p-6 shadow-sm lg:sticky lg:top-28">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white">
              <CreditCard className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold text-slate-950">Order summary</h2>
              <p className="text-sm text-slate-500">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>

          <div className="mt-6 max-h-72 space-y-4 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-50 p-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full object-contain"
                  />
                </div>

                <div className="flex-1">
                  <p className="line-clamp-1 text-sm font-medium text-slate-950">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="text-sm font-semibold text-slate-950">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4 border-t pt-5 text-sm">
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
              <span className="text-slate-500">Tax</span>
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

          <Link to="/cart">
            <Button variant="outline" className="mt-5 w-full">
              Back to cart
            </Button>
          </Link>
        </aside>
      </section>
    </main>
  );
}

export default Checkout;