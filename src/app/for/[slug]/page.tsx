import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProspectPage } from "../ProspectPage";
import { getProspect, prospects } from "../prospects";
import "../prospect.css";

// Only the listed prospects exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return prospects.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProspect((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name} | Personalized Booking Concept`,
    description: `${p.packageName}: ${p.packageSummary}`,
    alternates: { canonical: `/for/${p.slug}` },
    // One-to-one sales pages: keep them out of search results.
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: Params) {
  const p = getProspect((await params).slug);
  if (!p) notFound();
  return <ProspectPage prospect={p} />;
}
