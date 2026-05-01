import type { WorkItem } from "@/content/work";
import { ScreenshotPlaceholder } from "./ScreenshotPlaceholder";

type WorkCardProps = {
  item: WorkItem;
};

export function WorkCard({ item }: WorkCardProps) {
  return (
    <article className="card-warm overflow-hidden p-6 md:p-7">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="proof-badge">{item.label}</span>
            <span
              className="text-sm uppercase tracking-[0.14em]"
              style={{
                color: "var(--color-text-light)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {item.industry} · {item.location}
            </span>
          </div>

          <h3
            className="mt-5 text-3xl"
            style={{
              color: "var(--color-text-heading)",
              fontFamily: "var(--font-display)",
            }}
          >
            {item.name}
          </h3>

          <p className="mt-4 text-lg leading-8" style={{ color: "var(--color-text-muted)" }}>
            {item.summary}
          </p>

          <dl className="mt-8 grid gap-5">
            <div>
              <dt
                className="eyebrow"
                style={{ fontSize: "0.7rem" }}
              >
                Problem
              </dt>
              <dd className="mt-2 leading-7" style={{ color: "var(--color-text-primary)" }}>
                {item.problem}
              </dd>
            </div>
            <div>
              <dt
                className="eyebrow"
                style={{ fontSize: "0.7rem" }}
              >
                What I built
              </dt>
              <dd className="mt-2 leading-7" style={{ color: "var(--color-text-primary)" }}>
                {item.whatIBuilt}
              </dd>
            </div>
          </dl>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="site-panel p-5">
              <p className="eyebrow" style={{ fontSize: "0.68rem" }}>
                Before
              </p>
              <p className="mt-3 leading-7" style={{ color: "var(--color-text-muted)" }}>
                {item.before}
              </p>
            </div>
            <div className="site-panel p-5">
              <p className="eyebrow" style={{ fontSize: "0.68rem" }}>
                After
              </p>
              <p className="mt-3 leading-7" style={{ color: "var(--color-text-muted)" }}>
                {item.after}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <ScreenshotPlaceholder
            label={item.screenshotLabel}
            asset={item.screenshotAsset}
          />
          {item.liveDemoUrl ? (
            <a
              href={item.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-fit"
            >
              View live demo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
