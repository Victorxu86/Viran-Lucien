import { NextResponse } from "next/server";
import { fetchProducts, sanityClient } from "@/lib/sanity.server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gender = searchParams.get("gender") as "men" | "women" | null;
  const category = searchParams.get("category");

  const data = await fetchProducts({
    gender: gender ?? undefined,
    category: category ?? undefined,
    limit: Number(searchParams.get("limit") || 40),
  });

  const config = sanityClient.config();

  return NextResponse.json({
    count: data.length,
    projectId: config.projectId,
    dataset: config.dataset,
    products: data,
  });
}


