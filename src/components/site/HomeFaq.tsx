import type { FaqItem } from "@/content/faqs";

type HomeFaqProps = {
  items: readonly FaqItem[];
};

export function HomeFaq({ items }: HomeFaqProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((item) => (
        <article key={item.question} className="card-warm p-6 md:p-7">
          <h3
            className="text-2xl leading-tight"
            style={{
              color: "var(--color-text-heading)",
              fontFamily: "var(--font-display)",
            }}
          >
            {item.question}
          </h3>
          <p className="mt-4 leading-7" style={{ color: "var(--color-text-muted)" }}>
            {item.answer}
          </p>
        </article>
      ))}
    </div>
  );
}
