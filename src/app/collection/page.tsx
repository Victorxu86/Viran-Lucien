import { Suspense } from "react";
import CollectionClient from "./CollectionClient";
import { fetchSeries } from "@/lib/sanity.server";

export const dynamic = "force-dynamic";

export default async function CollectionPage() {
  let series:
    | Array<{ slug: string; title: string; subtitle?: string; description?: string; season?: string; hero?: string; materials?: string[] }>
    | undefined;
  try {
    const docs = await fetchSeries();
    series = (docs || []).map((d) => ({
      slug: d.slug?.current || d._id,
      title: d.title,
      subtitle: d.summary,
      description: d.summary,
      season: "",
      hero: d.hero?.asset?.url || d.cover?.asset?.url,
      materials: [],
    }));
  } catch {}
  return (
    <Suspense fallback={null}>
      <CollectionClient series={series} />
    </Suspense>
  );
}


