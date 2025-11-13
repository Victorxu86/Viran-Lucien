import { NextRequest, NextResponse } from "next/server";
import { fetchProductBySlug } from "@/lib/sanity.server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "";
  const doc = await fetchProductBySlug(slug);
  return NextResponse.json({
    ok: !!doc,
    slug,
    hasDoc: !!doc,
    title: doc?.title,
    images: (doc?.images || []).length,
  });
}


