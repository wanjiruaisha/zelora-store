import { useOutletContext } from "react-router-dom";

import ProductCard from "@/components/product/ProductCard";

function Overview() {
  const { product, relatedProducts } = useOutletContext();

  return (
    <div className="py-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border bg-white p-6">
          <h2 className="text-2xl font-bold text-slate-950">
            Product overview
          </h2>

          <p className="mt-4 leading-7 text-slate-500">
            {product.description}
          </p>

          <p className="mt-4 leading-7 text-slate-500">
            This piece is selected for shoppers who want dependable quality,
            clean presentation, and everyday usefulness without overcomplicating
            the shopping experience.
          </p>
        </div>

        <div className="rounded-3xl border bg-slate-50 p-6">
          <h3 className="font-semibold text-slate-950">Why you’ll like it</h3>

          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li>• Carefully selected for the Zelora collection</li>
            <li>• Easy to add to your bag and checkout securely</li>
            <li>• Clear product information before purchase</li>
            <li>• Suitable for everyday use or gifting</li>
          </ul>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <div className="mb-6">
            <p className="text-sm font-medium text-slate-500">
              You may also like
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Related products
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Overview;