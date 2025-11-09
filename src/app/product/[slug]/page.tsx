import Container from "@/components/Container";
import Grid from "@/components/Grid";
import ProductCard from "@/components/ProductCard";
import { getProductBySlug } from "@/lib/productData";
import Gallery from "@/components/Gallery";

type Props = { params: { slug: string } };

export const dynamic = "force-dynamic";

export default function ProductDetailPage({ params }: Props) {
  let product;
  try {
    product = getProductBySlug(params.slug);
  } catch (e) {
    // 容错：若解析失败，回退到一个可展示的占位数据，避免 SSR 崩溃
    product = {
      slug: params.slug,
      title: "Product",
      material: "Material",
      price: 0,
      images: ["/feature-1.svg", "/feature-2.svg"],
      highlights: [],
      description: "",
      sizes: [],
      shippingInfo: "",
      returnsInfo: "",
      related: [],
    };
  }
  const priceText = `¥${product.price}`;

  return (
    <section className="section">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* 左：图像展示 */}
          <div className="space-y-6">
            <Gallery images={product.images} />
          </div>

          {/* 右：信息区 */}
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{product.title}</h1>
            <p className="mt-2 text-sm text-zinc-700">{product.material}</p>
            <div className="mt-4 text-lg">{priceText}</div>

            {/* 尺码与数量 */}
            <div className="mt-6">
              <div className="text-sm text-zinc-700">选择尺码</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.label}
                    className="h-9 min-w-[44px] rounded-sm border px-3 text-sm disabled:opacity-40"
                    disabled={!s.available}
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

            {/* 工艺亮点 */}
            <div className="mt-10">
              <h2 className="text-base">Craftsmanship</h2>
              <ul className="mt-3 list-disc pl-5 text-sm text-zinc-700">
                {product.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>

            {/* 描述 */}
            <div className="mt-8">
              <h2 className="text-base">Description</h2>
              <p className="mt-3 text-sm text-zinc-700">{product.description}</p>
            </div>

            {/* 售后与配送信息入口 */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-sm border p-4 text-sm" style={{ borderColor: "var(--accent-12)" }}>
                <div className="font-medium">配送</div>
                <p className="mt-2 text-zinc-700">{product.shippingInfo}</p>
                <a className="mt-2 inline-block underline hover:opacity-80" href="/client-service/shipping-returns">
                  查看详情
                </a>
              </div>
              <div className="rounded-sm border p-4 text-sm" style={{ borderColor: "var(--accent-12)" }}>
                <div className="font-medium">退换</div>
                <p className="mt-2 text-zinc-700">{product.returnsInfo}</p>
                <a className="mt-2 inline-block underline hover:opacity-80" href="/client-service/shipping-returns">
                  查看详情
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 推荐区 */}
        <div className="mt-16">
          <h2 className="text-base">You may also like</h2>
          <div className="mt-6">
            <Grid cols={4} className="md:grid-cols-3">
              {product.related.slice(0, 4).map((r, idx) => (
                <ProductCard
                  key={r.slug}
                  title={r.title}
                  subtitle={r.material}
                  price={`¥${r.price}`}
                  imageSrc={r.image}
                  secondaryImageSrc={r.image}
                  href={`/product/${r.slug}`}
                />
              ))}
            </Grid>
          </div>
        </div>
      </Container>
    </section>
  );
}


