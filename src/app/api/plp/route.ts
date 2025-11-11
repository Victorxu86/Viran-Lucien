import { NextRequest, NextResponse } from "next/server";
import { fetchProducts } from "@/lib/sanity.server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const gender = (searchParams.get("gender") as "men" | "women" | null) || null;
    const docs = await fetchProducts({ gender: gender || undefined, limit: 80 });
    const mapped = (docs || []).map((d, i) => {
      const slug = d.slug?.current || `${gender || "all"}-${i}`;
      const firstImage = d.images?.[0]?.asset?.url || "/feature-1.svg";
      const catSrc = (d.category || "").toLowerCase();
      const category =
        catSrc.includes("outer")
          ? "outerwear"
          : catSrc.includes("bottom") || catSrc.includes("pant") || catSrc.includes("skirt")
          ? "bottoms"
          : "tops";
      return {
        slug,
        title: d.title,
        material: d.material || "",
        price: d.price || 0,
        category,
        image: firstImage,
      };
    });
    return NextResponse.json({ ok: true, gender, count: mapped.length, sample: mapped.slice(0, 8) });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err?.message || err) }, { status: 500 });
  }
}


