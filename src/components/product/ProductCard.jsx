import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { useCart } from "@/context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardHeader className="relative bg-slate-50 p-4">
        <Link to={`/products/${product.id}`}>
          <div className="flex h-64 items-center justify-center rounded-2xl bg-white p-6">
            <img
              src={product.image}
              alt={product.title}
              className="h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-6 top-6 rounded-full bg-white"
          aria-label="Add to wishlist"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="secondary" className="capitalize">
            {product.category}
          </Badge>

          {product.rating && (
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <Star className="h-4 w-4 fill-current text-yellow-500" />
              <span>{product.rating.rate}</span>
            </div>
          )}
        </div>

        <Link to={`/products/${product.id}`}>
          <h3 className="line-clamp-2 text-base font-semibold leading-6 text-slate-950 transition hover:text-slate-700">
            {product.title}
          </h3>
        </Link>

        <p className="line-clamp-2 text-sm leading-6 text-slate-500">
          {product.description}
        </p>

        <p className="mt-auto text-xl font-bold text-slate-950">
          ${product.price}
        </p>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-3 p-5 pt-0">
        <Link to={`/products/${product.id}`}>
          <Button variant="outline" className="w-full">
            View details
          </Button>
        </Link>

        <Button className="w-full" onClick={() => addToCart(product)}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;