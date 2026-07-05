import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";

function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const itemTotal = item.price * item.quantity;

  return (
    <Card className="border-slate-200">
      <CardContent className="grid gap-5 p-4 sm:grid-cols-[110px_1fr_auto] sm:items-center">
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
          <Link to={`/products/${item.id}`}>
            <h3 className="font-semibold leading-6 text-slate-950 hover:text-slate-700">
              {item.title}
            </h3>
          </Link>

          <p className="mt-1 text-sm capitalize text-slate-500">
            {item.category}
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Unit price:{" "}
            <span className="font-medium text-slate-950">${item.price}</span>
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <p className="text-lg font-bold text-slate-950">
            ${itemTotal.toFixed(2)}
          </p>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-full border bg-white">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => decreaseQuantity(item.id)}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="min-w-8 text-center text-sm font-semibold">
                {item.quantity}
              </span>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => increaseQuantity(item.id)}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeFromCart(item.id)}
              aria-label="Remove item"
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CartItem;