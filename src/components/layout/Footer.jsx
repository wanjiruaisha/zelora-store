import { Link } from "react-router-dom";
import { Mail, ShieldCheck, Truck, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t bg-slate-950 text-slate-300">
      <section className="border-b border-slate-800">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <Truck className="mt-1 h-5 w-5 text-white" />
            <div>
              <h3 className="font-semibold text-white">Reliable delivery</h3>
              <p className="mt-1 text-sm text-slate-400">
                Trackable shipping on every confirmed order.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RefreshCcw className="mt-1 h-5 w-5 text-white" />
            <div>
              <h3 className="font-semibold text-white">Easy returns</h3>
              <p className="mt-1 text-sm text-slate-400">
                Simple return support for eligible purchases.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 h-5 w-5 text-white" />
            <div>
              <h3 className="font-semibold text-white">Secure checkout</h3>
              <p className="mt-1 text-sm text-slate-400">
                A safe shopping experience from cart to confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-bold text-slate-950">
              Z
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">Zelora</h2>
              <p className="text-xs text-slate-400">
                Curated essentials. Effortless shopping.
              </p>
            </div>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
            Discover a refined selection of everyday essentials, style pieces,
            and smart finds chosen for quality, usefulness, and modern living.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Shop
          </h3>

          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/products" className="text-slate-400 hover:text-white">
                All products
              </Link>
            </li>

            <li>
              <Link to="/products" className="text-slate-400 hover:text-white">
                New arrivals
              </Link>
            </li>

            <li>
              <Link to="/products" className="text-slate-400 hover:text-white">
                Best sellers
              </Link>
            </li>

            <li>
              <Link to="/products" className="text-slate-400 hover:text-white">
                Gift picks
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Customer Care
          </h3>

          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/cart" className="text-slate-400 hover:text-white">
                Shopping bag
              </Link>
            </li>

            <li>
              <Link to="/checkout" className="text-slate-400 hover:text-white">
                Checkout
              </Link>
            </li>

            <li>
              <a href="#" className="text-slate-400 hover:text-white">
                Shipping & delivery
              </a>
            </li>

            <li>
              <a href="#" className="text-slate-400 hover:text-white">
                Returns & exchanges
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Join the list
          </h3>

          <p className="mt-4 text-sm leading-6 text-slate-400">
            Get first access to new drops, private offers, and curated shopping
            edits.
          </p>

          <form className="mt-4 flex gap-2">
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                type="email"
                placeholder="Email address"
                className="bg-white pl-9 text-slate-950"
              />
            </div>

            <Button type="button">Join</Button>
          </form>

          <p className="mt-3 text-xs text-slate-500">
            No spam. Just useful updates.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} Zelora. All rights reserved.</p>

          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-white">
              Terms of Service
            </a>

            <a href="#" className="hover:text-white">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;