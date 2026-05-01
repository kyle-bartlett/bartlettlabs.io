import { Star, Quote } from "lucide-react";
import ScrollFadeIn from "./ScrollFadeIn";

const reviews = [
  {
    name: "Michael R.",
    rating: 5,
    text: "Sergio and his team completely transformed our master bathroom. The tile work is flawless, every line is straight, and the attention to detail is incredible. They've been doing this for decades and it shows. Worth every penny.",
    timeAgo: "2 weeks ago",
  },
  {
    name: "Patricia L.",
    rating: 5,
    text: "We hired them for our kitchen backsplash and ended up having them redo both bathrooms too. They showed up on time every day, kept the workspace clean, and the finished product looks like something out of a magazine. Can't recommend them enough.",
    timeAgo: "1 month ago",
  },
  {
    name: "Robert H.",
    rating: 5,
    text: "I got three bids for my flooring project and Sergio's was the most competitive. But what sold me was the quality. I've had tile work done before by other companies and it doesn't even compare. These guys are the real deal.",
    timeAgo: "3 weeks ago",
  },
  {
    name: "Sandra M.",
    rating: 5,
    text: "We've used Sergio's for two different homes now. They did a custom walk-in shower with a mosaic accent wall that our guests always compliment. Forty years of experience really does make a difference. True craftsmen.",
    timeAgo: "2 months ago",
  },
  {
    name: "James K.",
    rating: 5,
    text: "Had them tile the entryway and living room of our new build. Over 800 square feet of porcelain tile, perfectly level, no lippage. They worked with the general contractor seamlessly and finished ahead of schedule.",
    timeAgo: "1 month ago",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "text-amber-400 fill-amber-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn>
          <div className="text-center mb-16">
            <span className="text-cyan font-semibold text-sm uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy mt-3 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-slate-secondary text-lg max-w-2xl mx-auto">
              Our 4.78-star Google rating didn&apos;t happen by accident. Here&apos;s
              what homeowners across the Houston area say about working with us.
            </p>
          </div>
        </ScrollFadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <ScrollFadeIn key={review.name} delay={index * 80}>
              <div className="bg-offwhite border border-slate-border rounded-2xl p-6 hover:shadow-lg hover:shadow-cyan/5 transition-all duration-300 h-full flex flex-col">
                <Quote className="w-8 h-8 text-cyan/20 mb-3" />
                <p className="text-slate-text text-sm leading-relaxed flex-grow mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-border">
                  <div>
                    <p className="font-semibold text-navy text-sm">
                      {review.name}
                    </p>
                    <p className="text-slate-secondary text-xs">
                      {review.timeAgo}
                    </p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
              </div>
            </ScrollFadeIn>
          ))}
        </div>

        <ScrollFadeIn delay={400}>
          <p className="text-center text-slate-secondary/60 text-xs mt-8 italic">
            Reviews shown for demonstration purposes. Based on actual Google review sentiment.
          </p>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
