import Container from "@/components/Container";
import Grid from "@/components/Grid";
import ProductCard from "@/components/ProductCard";
import Gallery from "@/components/Gallery";
import { loadPdpBySlug } from "@/lib/pdp";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 0;

export default async function ProductDetailByQuery({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const slugParam = typeof searchParams?.slug === "string" ? searchParams?.slug : Array.isArray(searchParams?.slug) ? searchParams?.slug?.[0] : "";
  const product = await loadPdpBySlug(slugParam || "");
  if (!product) {
    return (
      <section className="section">
        <Container>
          <div className="py-24 text-center text-sm text-zinc-600">
            未找到该产品：{slugParam || "(空)"}
          </div>
        </Container>
      </section>
    );
  }
  const galleryImages = product.images;
  const priceText = `¥${product.price}`;
  const related = product.related;

  return (
    <section className="section">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <Gallery images={galleryImages} />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{product.title}</h1>
            <p className="mt-2 text-sm text-zinc-700">{product.material || ""}</p>
            <div className="mt-4 text-lg">{priceText}</div>

            <div className="mt-6">
              <div className="text-sm text-zinc-700">选择尺码</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.label || ""}
                    className="h-9 min-w-[44px] rounded-sm border px-3 text-sm disabled:opacity-40"
                    disabled={s.available === false}
                    style={{ borderColor: "var(--accent-12)", background: "transparent" }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <label className="text-sm text-zinc-700">数量</label>
                <input
                  type="number"
                  min={1}
                  defaultValue={1}
                  className="h-9 w-16 rounded-sm border px-2 text-sm"
                  style={{ borderColor: "var(--accent-12)", background: "transparent" }}
                />
              </div>
              <div className="mt-6">
                <button className="btn">加入购物袋</button>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-base">Craftsmanship</h2>
              <ul className="mt-3 list-disc pl-5 text-sm text-zinc-700">
                {product.craftsmanship.map((h) => (
                  <li key={h as string}>{h}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-base">Description</h2>
              <p className="mt-3 text-sm text-zinc-700">{product.description || ""}</p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-sm border p-4 text-sm" style={{ borderColor: "var(--accent-12)" }}>
                <div className="font-medium">配送</div>
                <p className="mt-2 text-zinc-700">订单 1–2 个工作日内处理；标准配送 3–5 天送达。</p>
                <a className="mt-2 inline-block underline hover:opacity-80" href="/client-service/shipping-returns">
                  查看详情
                </a>
              </div>
              <div className="rounded-sm border p-4 text-sm" style={{ borderColor: "var(--accent-12)" }}>
                <div className="font-medium">退换</div>
                <p className="mt-2 text-zinc-700">支持 30 天内退换，保持商品完整与吊牌齐全。</p>
                <a className="mt-2 inline-block underline hover:opacity-80" href="/client-service/shipping-returns">
                  查看详情
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-base">You may also like</h2>
          <div className="mt-6">
            <Grid cols={4} className="md:grid-cols-3">
              {related.slice(0, 4).map((r, idx) => (
                <ProductCard
                  key={r.slug || idx}
                  title={r.title}
                  subtitle={r.material}
                  price={`¥${r.price}`}
                  imageSrc={r.image}
                  secondaryImageSrc={r.image}
                  href={`/product?slug=${encodeURIComponent(r.slug || "")}`}
                />
              ))}
            </Grid>
          </div>
          <div className="mt-8">
            <Grid cols={4} className="md:grid-cols-3">
              {related.filter((r) => r.category === product.category).slice(0, 4).map((r, i) => (
                <ProductCard
                  key={`same-${r.slug || i}`}
                  title={r.title}
                  subtitle={r.material}
                  price={`¥${r.price}`}
                  imageSrc={r.image}
                  secondaryImageSrc={r.image}
                  href={`/product?slug=${encodeURIComponent(r.slug || "")}`}
                />
              ))}
            </Grid>
          </div>
        </div>
      </Container>
    </section>
  );
}


