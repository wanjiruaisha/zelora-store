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
        <p className="text-sm font-medium text-muted-foreground">
          Secure access
        </p>

        <h1 className="mt-2 max-w-xl text-5xl font-bold tracking-tight text-foreground">
          Sign in to continue your checkout.
        </h1>

        <p className="mt-5 max-w-lg leading-7 text-muted-foreground">
          Access your account, continue your shopping session, and complete your
          order securely.
        </p>

        <div className="mt-8 rounded-3xl bg-muted p-5 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">New here?</p>

          <p className="mt-2">
            Create an account first, then use the same email and password to
            sign in.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border bg-card p-6 shadow-sm sm:p-8">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">
            Welcome back
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Enter your details to continue.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
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

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New to Zelora?{" "}
          <Link
            to="/signup"
            className="font-semibold text-foreground hover:underline"
          >
            Create an account
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

export default Login;