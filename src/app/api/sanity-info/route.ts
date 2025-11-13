import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || null,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || null,
  });
}


