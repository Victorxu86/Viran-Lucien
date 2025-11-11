import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity.server";
import groq from "groq";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gidffpzl") as string;
    const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || "production") as string;
    const docs = await sanityClient.fetch(
      groq`*[_type=="product"]{_id,title,gender,category, "slug": slug.current}[0...20]`
    );
    return NextResponse.json({
      ok: true,
      projectId,
      dataset,
      count: Array.isArray(docs) ? docs.length : 0,
      sample: docs,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: String(err?.message || err),
      },
      { status: 500 }
    );
  }
}


