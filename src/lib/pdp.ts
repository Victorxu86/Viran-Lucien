import { fetchProductBySlug, fetchProducts } from "@/lib/sanity.server";

export type PdpProduct = {
  title: string;
  material: string;
  price: number;
  category: string;
  images: string[];
  sizes: Array<{ label: string; available: boolean }>;
  craftsmanship: string[];
  description: string;
  related: Array<{ slug: string; title: string; material: string; price: number; image: string; category: string }>;
};

export async function loadPdpBySlug(slugParam: string): Promise<PdpProduct | null> {
  const normalized = decodeURIComponent(String(slugParam || "")).trim();
  let doc = await fetchProductBySlug(normalized);
  if (!doc) {
    doc = await fetchProductBySlug(normalized.toLowerCase());
  }
  if (!doc) {
    const all = await fetchProducts({ limit: 200 });
    const hit = (all || []).find((p) => (p.slug?.current || "").toLowerCase() === normalized.toLowerCase());
    if (hit?.slug?.current) {
      doc = await fetchProductBySlug(hit.slug.current);
    }
  }
  if (!doc) return null;

  const images = (doc.images || [])
    .map((i) => i?.asset?.url)
    .filter((u): u is string => !!u);

  const related = (doc.related || []).map((r) => {
    const rImg = (r.images || []).map((i) => i?.asset?.url).find(Boolean) || "/feature-2.svg";
    return {
      slug: r.slug?.current || "",
      title: r.title,
      material: r.material || "",
      price: r.price || 0,
      image: rImg,
      category: (r.category || "").toLowerCase(),
    };
  });

  return {
    title: doc.title,
    material: doc.material || "",
    price: doc.price || 0,
    category: (doc.category || "").toLowerCase(),
    images: images.length > 0 ? images : ["/feature-1.svg"],
    sizes: (doc.sizes || []).map((s) => ({ label: s.label || "", available: s.available !== false })),
    craftsmanship: (doc.craftsmanship || []) as string[],
    description: doc.description || "",
    related,
  };
}


