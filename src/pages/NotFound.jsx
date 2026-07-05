import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-16">
      <section className="max-w-xl rounded-[2rem] border bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-slate-500">404 error</p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
          Page not found
        </h1>

        <p className="mt-4 text-slate-500">
          The page you’re looking for may have moved, expired, or no longer
          exists.
        </p>

        <Link to="/products">
          <Button className="mt-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to shop
          </Button>
        </Link>
      </section>
    </main>
  );
}

export default NotFound;