import { Suspense } from "react";
import WomenClient from "./WomenClient";
import { fetchProducts } from "@/lib/sanity.server";

export const dynamic = "force-dynamic";

export default async function WomenPage() {
  let initialProducts:
    | Array<{ slug: string; title: string; material: string; price: number; category: "all" | "tops" | "bottoms" | "outerwear"; image: string; imageAlt: string }>
    | undefined;
  try {
    const docs = await fetchProducts({ gender: "women", limit: 80 });
    initialProducts = (docs || []).map((d, i) => {
      const slug = d.slug?.current || `women-${i}`;
      const firstImage = d.images?.[0]?.asset?.url || "/feature-1.svg";
      const catSrc = (d.category || "").toLowerCase();
      const category = catSrc.includes("outer") ? "outerwear" : catSrc.includes("bottom") || catSrc.includes("pant") || catSrc.includes("skirt") ? "bottoms" : "tops";
      return {
        slug,
        title: d.title,
        material: d.material || "",
        price: d.price || 0,
        category,
        image: firstImage,
        imageAlt: d.title,
      };
    });
  } catch {}
  return (
    <Suspense fallback={null}>
      <WomenClient initialProducts={initialProducts} />
    </Suspense>
  );
}


