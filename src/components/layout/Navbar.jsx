import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LogOut, Menu, ShoppingBag, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-slate-950 font-semibold"
      : "text-slate-500 hover:text-slate-950 transition-colors";

  const mobileNavLinkClass = ({ isActive }) =>
    isActive
      ? "rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
      : "rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950";

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
            Z
          </div>

          <div className="leading-tight">
            <h1 className="text-xl font-bold tracking-tight text-slate-950">
              Zelora
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block">
              Curated essentials
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            Shop
          </NavLink>

          <NavLink to="/cart" className={navLinkClass}>
            Cart
          </NavLink>

          <NavLink to="/checkout" className={navLinkClass}>
            Checkout
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/cart" className="relative" onClick={closeMobileMenu}>
            <Button variant="outline" size="icon" aria-label="Open cart">
              <ShoppingBag className="h-5 w-5" />
            </Button>

            {cartCount > 0 && (
              <Badge className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs">
                {cartCount}
              </Badge>
            )}
          </Link>

          {user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="hidden sm:flex"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button size="sm" className="hidden sm:flex">
                <User className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen((currentValue) => !currentValue)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t bg-white px-4 py-4 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            <NavLink
              to="/"
              className={mobileNavLinkClass}
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={mobileNavLinkClass}
              onClick={closeMobileMenu}
            >
              Shop
            </NavLink>

            <NavLink
              to="/cart"
              className={mobileNavLinkClass}
              onClick={closeMobileMenu}
            >
              Cart
            </NavLink>

            <NavLink
              to="/checkout"
              className={mobileNavLinkClass}
              onClick={closeMobileMenu}
            >
              Checkout
            </NavLink>

            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-2xl px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className={mobileNavLinkClass}
                onClick={closeMobileMenu}
              >
                Login
              </NavLink>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;