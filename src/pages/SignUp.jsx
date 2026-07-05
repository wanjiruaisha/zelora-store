import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Lock, Mail, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/context/AuthContext";

function SignUp() {
  const { user, signUp, authError } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [localError, setLocalError] = useState("");

  if (user) {
    return <Navigate to="/checkout" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setLocalError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      setLocalError("Please fill in all fields.");
      return;
    }

    const success = signUp(formData);

    if (success) {
      navigate("/checkout", { replace: true });
    }
  };

  return (
    <main className="mx-auto grid min-h-[calc(100vh-160px)] max-w-7xl items-center gap-10 px-4 py-10 lg:grid-cols-2">
      <section>
        <p className="text-sm font-medium text-muted-foreground">
          Create your account
        </p>

        <h1 className="mt-2 max-w-xl text-5xl font-bold tracking-tight text-foreground">
          Join Zelora and make checkout faster.
        </h1>

        <p className="mt-5 max-w-lg leading-7 text-muted-foreground">
          Create an account to save your shopping session, continue to checkout,
          and enjoy a smoother shopping experience.
        </p>

        <div className="mt-8 rounded-3xl bg-muted p-5 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Account benefits</p>

          <ul className="mt-3 space-y-2">
            <li>• Faster protected checkout</li>
            <li>• Saved shopping session</li>
            <li>• Wishlist and cart access</li>
          </ul>
        </div>
      </section>

      <section className="rounded-[2rem] border bg-card p-6 shadow-sm sm:p-8">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">
            Create account
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Enter your details to get started.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-foreground"
            >
              Full name
            </label>

            <div className="relative mt-2">
              <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="h-11 pl-9"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email address
            </label>

            <div className="relative mt-2">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="h-11 pl-9"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </label>

            <div className="relative mt-2">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="h-11 pl-9"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-foreground"
            >
              Confirm password
            </label>

            <div className="relative mt-2">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                className="h-11 pl-9"
              />
            </div>
          </div>

          {(localError || authError) && (
            <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
              {localError || authError}
            </div>
          )}

          <Button type="submit" className="w-full" size="lg">
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-foreground hover:underline"
          >
            Sign in
          </Link>
        </p>

        <p className="mt-3 text-center text-sm text-muted-foreground">
          Just browsing?{" "}
          <Link
            to="/products"
            className="font-semibold text-foreground hover:underline"
          >
            Return to shop
          </Link>
        </p>
      </section>
    </main>
  );
}

export default SignUp;