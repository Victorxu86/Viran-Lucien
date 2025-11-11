import { Suspense } from "react";
import MenClient from "./MenClient";
import { fetchProducts } from "@/lib/sanity.server";

export const dynamic = "force-dynamic";

export default async function MenPage() {
  // 从 Sanity 拉取数据并映射到客户端期望结构，失败时交给客户端回退
  let initialProducts:
    | Array<{ slug: string; title: string; material: string; price: number; category: "all" | "tops" | "bottoms" | "outerwear"; image: string; imageAlt: string }>
    | undefined;
  try {
    const docs = await fetchProducts({ gender: "men", limit: 80 });
    initialProducts = (docs || []).map((d, i) => {
      const slug = d.slug?.current || `men-${i}`;
      const firstImage = d.images?.[0]?.asset?.url || "/feature-1.svg";
      const catSrc = (d.category || "").toLowerCase();
      const category = catSrc.includes("outer") ? "outerwear" : catSrc.includes("bottom") || catSrc.includes("pant") ? "bottoms" : "tops";
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
  } catch {
    // 忽略，让客户端使用本地回退
  }
  return (
    <Suspense fallback={null}>
      <MenClient initialProducts={initialProducts} />
    </Suspense>
  );
}


