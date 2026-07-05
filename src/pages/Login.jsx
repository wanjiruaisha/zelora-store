import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/context/AuthContext";

function Login() {
  const { user, login, authError } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || "/checkout";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [localError, setLocalError] = useState("");

  if (user) {
    return <Navigate to={redirectPath} replace />;
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

    if (!formData.email.trim() || !formData.password.trim()) {
      setLocalError("Please fill in both fields.");
      return;
    }

    const success = login(formData);

    if (success) {
      navigate(redirectPath, { replace: true });
    }
  };

  return (
    <main className="mx-auto grid min-h-[calc(100vh-160px)] max-w-7xl items-center gap-10 px-4 py-10 lg:grid-cols-2">
      <section>
        <p className="text-sm font-medium text-slate-500">Secure access</p>

        <h1 className="mt-2 max-w-xl text-5xl font-bold tracking-tight text-slate-950">
          Sign in to continue your checkout.
        </h1>

        <p className="mt-5 max-w-lg leading-7 text-slate-500">
          Access your shopping bag, complete your order, and keep your checkout
          details organized in one smooth flow.
        </p>

        <div className="mt-8 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
          <p className="font-semibold text-slate-950">Demo login</p>
          <p className="mt-2">
            Use any valid email address and a password with at least 6
            characters.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border bg-white p-6 shadow-sm sm:p-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-950">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-500">
            Enter your details to continue.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              Email address
            </label>

            <div className="relative mt-2">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

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
              className="text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <div className="relative mt-2">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

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

          {(localError || authError) && (
            <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
              {localError || authError}
            </div>
          )}

          <Button type="submit" className="w-full" size="lg">
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Just browsing?{" "}
          <Link
            to="/products"
            className="font-semibold text-slate-950 hover:underline"
          >
            Return to shop
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;