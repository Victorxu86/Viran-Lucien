import { NextRequest, NextResponse } from "next/server";
import { fetchProductBySlug } from "@/lib/sanity.server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug") || "";
    const doc = slug ? await fetchProductBySlug(slug) : null;
    const images = (doc?.images || [])
      .map((i) => i?.asset?.url)
      .filter((u): u is string => !!u);
    const related = (doc?.related || []).map((r) => {
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
    return NextResponse.json({
      ok: true,
      slug,
      found: !!doc,
      doc: doc
        ? {
            title: doc.title,
            material: doc.material || "",
            price: doc.price || 0,
            category: (doc.category || "").toLowerCase(),
            images: images.length > 0 ? images : ["/feature-1.svg"],
            sizes: (doc.sizes || []).map((s) => ({ label: s.label || "", available: s.available !== false })),
            craftsmanship: (doc.craftsmanship || []) as string[],
            description: doc.description || "",
            related,
          }
        : null,
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err?.message || err) }, { status: 500 });
  }
}


