import { Star, Quote } from "lucide-react";
import ScrollFadeIn from "./ScrollFadeIn";

const reviews = [
  {
    name: "Maria G.",
    rating: 5,
    text: "Best mechanic in Baytown, hands down. They fixed my AC in the middle of July and charged me way less than the dealership quoted. Honest people who do great work.",
    timeAgo: "2 weeks ago",
  },
  {
    name: "James T.",
    rating: 5,
    text: "Brought my truck in for a weird noise in the front end. They diagnosed it fast, explained everything clearly, and had it fixed the same day. Fair price, no games. I'm a customer for life.",
    timeAgo: "1 month ago",
  },
  {
    name: "Rosa M.",
    rating: 5,
    text: "I was nervous about finding a new mechanic after moving to Baytown. A neighbor recommended Santiago's and I'm so glad she did. They treated me like family from day one.",
    timeAgo: "3 weeks ago",
  },
  {
    name: "David L.",
    rating: 5,
    text: "These guys saved me from a breakdown on my way to work. Towed my car in, found the issue was just a loose connection, and only charged me for the diagnostic. That kind of honesty is rare.",
    timeAgo: "2 months ago",
  },
  {
    name: "Carlos R.",
    rating: 5,
    text: "I've been bringing all three of our family cars here for over a year now. Consistent quality every single time. They remember your name and actually care about your vehicle.",
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
              Don&apos;t just take our word for it. Here&apos;s what Baytown residents
              have to say about their experience.
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
            Reviews from Google — displayed for demonstration purposes.
          </p>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
