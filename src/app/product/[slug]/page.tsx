import Container from "@/components/Container";
import Grid from "@/components/Grid";
import ProductCard from "@/components/ProductCard";
import { fetchProductBySlug, fetchProducts } from "@/lib/sanity.server";
import Gallery from "@/components/Gallery";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: Props) {
  const doc = await fetchProductBySlug(params.slug);
  if (!doc) {
    notFound();
  }
  const images = (doc.images || [])
    .map((i) => i?.asset?.url)
    .filter((u): u is string => !!u);
  const galleryImages = images.length > 0 ? images : ["/feature-1.svg"];
  const priceText = `¥${doc.price || 0}`;
  const related = (doc.related || []).map((r) => {
    const rImg = (r.images || []).map((i) => i?.asset?.url).find(Boolean) || "/feature-2.svg";
    const slug = r.slug?.current || "";
    return {
      slug,
      title: r.title,
      material: r.material || "",
      price: r.price || 0,
      image: rImg,
      category: (r.category || "").toLowerCase(),
    };
  });

  // 计算面包屑与回链
  const gender = (doc.gender || "").toLowerCase();
  const plpPath = gender === "women" ? "/women" : "/men";
  const mapCategory = (src?: string) => {
    const s = (src || "").toLowerCase();
    if (s.includes("outer")) return "outerwear";
    if (s.includes("bottom") || s.includes("pant") || s.includes("skirt")) return "bottoms";
    // Knitwear、Tops 都归并 tops
    return "tops";
  };
  const categoryParam = mapCategory(doc.category);

  // 若无 related，则回退到同性别同类目的最新产品（排除自身）
  let fallbackRelated: Array<{
    slug: string;
    title: string;
    material: string;
    price: number;
    image: string;
    category: string;
  }> = [];
  if (related.length === 0) {
    const pool = await fetchProducts({ gender: gender === "women" ? "women" : "men", limit: 40 });
    fallbackRelated = (pool || [])
      .map((d) => {
        const slug = d.slug?.current || "";
        const firstImage = d.images?.[0]?.asset?.url || "/feature-2.svg";
        return {
          slug,
          title: d.title,
          material: d.material || "",
          price: d.price || 0,
          image: firstImage,
          category: mapCategory(d.category),
        };
      })
      .filter((r) => r.slug && r.slug !== params.slug)
      .filter((r) => r.category === categoryParam)
      .slice(0, 8);
  }
  const relatedToShow = related.length > 0 ? related : fallbackRelated;

  return (
    <section className="section">
      <Container>
        {/* 面包屑 */}
        <nav className="mb-6 text-sm text-zinc-600">
          <Link href="/" className="hover:opacity-80">Home</Link>
          <span className="mx-2">/</span>
          <Link href={plpPath} className="hover:opacity-80">{gender === "women" ? "Women" : "Men"}</Link>
          <span className="mx-2">/</span>
          <Link href={`${plpPath}?cat=${categoryParam}`} className="hover:opacity-80">
            {categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-800">{doc.title}</span>
        </nav>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* 左：图像展示 */}
          <div className="space-y-6">
            <Gallery images={galleryImages} />
          </div>

          {/* 右：信息区 */}
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{doc.title}</h1>
            <p className="mt-2 text-sm text-zinc-700">{doc.material || ""}</p>
            <div className="mt-4 text-lg">{priceText}</div>

            {/* 尺码与数量 */}
            <div className="mt-6">
              <div className="text-sm text-zinc-700">选择尺码</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(doc.sizes || []).map((s) => (
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

            {/* 工艺亮点 */}
            <div className="mt-10">
              <h2 className="text-base">Craftsmanship</h2>
              <ul className="mt-3 list-disc pl-5 text-sm text-zinc-700">
                {(doc.craftsmanship || []).map((h) => (
                  <li key={h as string}>{h}</li>
                ))}
              </ul>
            </div>

            {/* 描述 */}
            <div className="mt-8">
              <h2 className="text-base">Description</h2>
              <p className="mt-3 text-sm text-zinc-700">{doc.description || ""}</p>
            </div>

            {/* 售后与配送信息入口 */}
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

        {/* 推荐区 */}
        <div className="mt-16">
          <h2 className="text-base">You may also like</h2>
          <div className="mt-6">
            <Grid cols={4} className="md:grid-cols-3">
              {relatedToShow.slice(0, 4).map((r, idx) => (
                <ProductCard
                  key={r.slug || idx}
                  title={r.title}
                  subtitle={r.material}
                  price={`¥${r.price}`}
                  imageSrc={r.image}
                  secondaryImageSrc={r.image}
                  href={`/product/${r.slug || ""}`}
                />
              ))}
            </Grid>
          </div>
          {/* 同类型推荐一行 */}
          <div className="mt-8">
            <Grid cols={4} className="md:grid-cols-3">
              {relatedToShow
                .filter((r) => r.category === categoryParam)
                .slice(0, 4)
                .map((r, i) => (
                <ProductCard
                  key={`same-${r.slug || i}`}
                  title={r.title}
                  subtitle={r.material}
                  price={`¥${r.price}`}
                  imageSrc={r.image}
                  secondaryImageSrc={r.image}
                  href={`/product/${r.slug || ""}`}
                />
              ))}
            </Grid>
          </div>
        </div>
      </Container>
    </section>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = await fetchProductBySlug(params.slug);
  if (!doc) {
    return {
      title: "Product",
    };
  }
  const title = doc.title || "Product";
  const description =
    doc.description ||
    `${doc.material || ""} · Quiet, restrained and material-first design by Viran Lucien.`;
  const images = (doc.images || []).map((i) => i?.asset?.url).filter(Boolean) as string[];
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: images.length ? images.slice(0, 1) : undefined,
      type: "website",
    },
  };
}


