import { NextResponse } from "next/server";
import { fetchProductBySlug, sanityClient } from "@/lib/sanity.server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }
  try {
    const doc = await fetchProductBySlug(slug);
    const config = sanityClient.config();
    return NextResponse.json({ doc, slug, projectId: config.projectId, dataset: config.dataset });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message, stack: (error as Error).stack },
      { status: 500 }
    );
  }
}


