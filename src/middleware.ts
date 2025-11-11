import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = new URL(req.url);
  // /product/<slug> → /product?slug=<slug>
  if (pathname.startsWith("/product/")) {
    const slug = pathname.replace(/^\/product\//, "").replace(/\/+$/, "");
    if (slug) {
      const url = new URL(req.url);
      url.pathname = "/product";
      url.searchParams.set("slug", slug);
      // 保留原有查询参数
      searchParams.forEach((v, k) => {
        if (k !== "slug") url.searchParams.set(k, v);
      });
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/product/:path*"],
};


