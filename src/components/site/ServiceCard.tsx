import Link from "next/link";
import type { Service } from "@/content/services";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="card-warm flex h-full flex-col p-7">
      <span className="proof-badge">{service.priceRange}</span>
      <h3
        className="mt-5 text-2xl"
        style={{
          color: "var(--color-text-heading)",
          fontFamily: "var(--font-display)",
        }}
      >
        {service.title}
      </h3>
      <p className="mt-4 flex-1 leading-7" style={{ color: "var(--color-text-muted)" }}>
        {service.summary}
      </p>
      <ul className="mt-6 space-y-3">
        {service.homepageBullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-3 text-sm leading-6"
            style={{ color: "var(--color-text-primary)" }}
          >
            <span
              aria-hidden="true"
              className="mt-2 h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--color-burnt-orange)" }}
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <Link href={`/services#${service.id}`} className="mt-8 font-semibold" style={{ color: "var(--color-burnt-orange)" }}>
        See details →
      </Link>
    </article>
  );
}
