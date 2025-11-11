import { NextRequest, NextResponse } from "next/server";
import { fetchProducts } from "@/lib/sanity.server";
import { loadPdpBySlug } from "@/lib/pdp";
import groq from "groq";
import { sanityClient } from "@/lib/sanity.server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = (searchParams.get("slug") || "").toString();

    const env = {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gidffpzl",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      vercelUrl: process.env.VERCEL_URL || null,
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || null,
      nodeEnv: process.env.NODE_ENV || null,
    };

    const headers = {
      host: req.headers.get("host"),
      forwardedHost: req.headers.get("x-forwarded-host"),
      forwardedProto: req.headers.get("x-forwarded-proto"),
      forwardedFor: req.headers.get("x-forwarded-for"),
    };

    const sanityAll = await sanityClient.fetch(
      groq`*[_type=="product"]{_id,title,gender,category,"slug":slug.current} | order(_createdAt desc)[0...50]`
    );
    const men = await fetchProducts({ gender: "men", limit: 80 });
    const women = await fetchProducts({ gender: "women", limit: 80 });
    const pdp = slug ? await loadPdpBySlug(slug) : null;

    return NextResponse.json({
      ok: true,
      env,
      headers,
      sanityCount: Array.isArray(sanityAll) ? sanityAll.length : 0,
      sanitySample: (sanityAll || []).slice(0, 8),
      plp: {
        men: { count: men.length, sample: men.slice(0, 4).map((p) => p.slug?.current) },
        women: { count: women.length, sample: women.slice(0, 4).map((p) => p.slug?.current) },
      },
      pdp: {
        slug,
        found: !!pdp,
        product: pdp,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: String(err?.message || err) },
      { status: 500 }
    );
  }
}


