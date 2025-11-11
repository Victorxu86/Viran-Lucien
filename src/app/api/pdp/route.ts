import { NextRequest, NextResponse } from "next/server";
import { fetchProductBySlug } from "@/lib/sanity.server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug") || "";
    const doc = slug ? await fetchProductBySlug(slug) : null;
    return NextResponse.json({
      ok: true,
      slug,
      found: !!doc,
      title: doc?.title,
      gender: doc?.gender,
      category: doc?.category,
      imagesCount: doc?.images?.length || 0,
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err?.message || err) }, { status: 500 });
  }
}


