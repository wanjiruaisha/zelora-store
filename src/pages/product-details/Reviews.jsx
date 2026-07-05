import { useOutletContext } from "react-router-dom";
import { Star } from "lucide-react";

function Reviews() {
  const { product } = useOutletContext();

  const rating = product.rating?.rate || 4.5;
  const reviewCount = product.rating?.count || 0;

  const reviews = [
    {
      name: "Amelia R.",
      rating: 5,
      comment:
        "The product arrived looking exactly as expected. The shopping process was smooth and easy to follow.",
    },
    {
      name: "Jordan M.",
      rating: 4,
      comment:
        "Good quality and clean presentation. I liked that the product information was straightforward.",
    },
    {
      name: "Nadia K.",
      rating: 5,
      comment:
        "A reliable pick. I would shop again because the experience felt simple and polished.",
    },
  ];

  return (
    <div className="py-8">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border bg-white p-6">
          <h2 className="text-2xl font-bold text-slate-950">
            Customer reviews
          </h2>

          <div className="mt-5 flex items-end gap-2">
            <span className="text-5xl font-bold text-slate-950">
              {rating}
            </span>

            <span className="pb-2 text-sm text-slate-500">out of 5</span>
          </div>

          <div className="mt-4 flex gap-1 text-yellow-500">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-5 w-5 ${
                  index < Math.round(rating) ? "fill-current" : ""
                }`}
              />
            ))}
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Based on {reviewCount} customer ratings.
          </p>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <article key={review.name} className="rounded-3xl border bg-white p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-slate-950">
                  {review.name}
                </h3>

                <div className="flex gap-1 text-yellow-500">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {review.comment}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reviews;