import { useOutletContext } from "react-router-dom";

function Specifications() {
  const { product } = useOutletContext();

  const specifications = [
    {
      label: "Product ID",
      value: `ZEL-${String(product.id).padStart(4, "0")}`,
    },
    {
      label: "Category",
      value: product.category,
    },
    {
      label: "Availability",
      value: "In stock",
    },
    {
      label: "Rating",
      value: product.rating ? `${product.rating.rate}/5` : "Not rated yet",
    },
    {
      label: "Return eligibility",
      value: "Eligible for standard return support",
    },
    {
      label: "Checkout",
      value: "Secure checkout enabled",
    },
  ];

  return (
    <div className="py-8">
      <div className="rounded-3xl border bg-white p-6">
        <h2 className="text-2xl font-bold text-slate-950">
          Product specifications
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
          Review the key product information before adding this item to your
          shopping bag.
        </p>

        <div className="mt-6 divide-y">
          {specifications.map((specification) => (
            <div
              key={specification.label}
              className="grid gap-2 py-4 sm:grid-cols-[220px_1fr]"
            >
              <p className="text-sm font-medium text-slate-500">
                {specification.label}
              </p>

              <p className="text-sm font-semibold capitalize text-slate-950">
                {specification.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Specifications;