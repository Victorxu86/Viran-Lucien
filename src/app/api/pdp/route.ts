import { NextRequest, NextResponse } from "next/server";
import { loadPdpBySlug } from "@/lib/pdp";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug") || "";
    const product = slug ? await loadPdpBySlug(slug) : null;
    return NextResponse.json({
      ok: true,
      slug,
      found: !!product,
      doc: product,
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err?.message || err) }, { status: 500 });
  }
}


