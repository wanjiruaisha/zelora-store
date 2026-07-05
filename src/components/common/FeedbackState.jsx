import { Link } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  PackageSearch,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const icons = {
  empty: PackageSearch,
  error: AlertCircle,
  success: CheckCircle2,
  info: Info,
  cart: ShoppingBag,
};

const styles = {
  empty: "bg-slate-50 text-slate-700",
  error: "bg-red-50 text-red-700",
  success: "bg-emerald-50 text-emerald-700",
  info: "bg-blue-50 text-blue-700",
  cart: "bg-slate-50 text-slate-700",
};

function FeedbackState({
  type = "empty",
  title = "Nothing to show",
  message = "There is currently no content available.",
  actionLabel,
  actionTo,
  onAction,
}) {
  const Icon = icons[type] || PackageSearch;

  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border bg-white p-8 text-center">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full ${
          styles[type] || styles.empty
        }`}
      >
        <Icon className="h-7 w-7" />
      </div>

      <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
        {message}
      </p>

      {actionLabel && actionTo && (
        <Link to={actionTo}>
          <Button className="mt-6">{actionLabel}</Button>
        </Link>
      )}

      {actionLabel && onAction && (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default FeedbackState;