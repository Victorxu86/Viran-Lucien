import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Grid from "@/components/Grid";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/Button";
import { fetchHome } from "@/lib/sanity.server";

export default async function Home() {
  const home = await fetchHome();
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="media-hover media-frame">
          <img
            src={home?.heroImage?.asset?.url || "/hero.svg"}
            alt="Viran Lucien — Quiet luxury editorial hero"
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Material narrative */}
      <Section
        id="second-section"
        title="The Material"
        description="从纱线到织物，讲述我们对触感与结构的坚持。"
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h3>Fabric Story</h3>
            <p>
              选用经久耐穿的高品质面料，强调纱支、织法与触感。我们相信，好的材质能在时间里愈发动人。
            </p>
            <Link href="/the-material/fabric-story" className="btn btn--text">
              了解更多
            </Link>
          </div>
          <div className="media-hover media-frame rounded-sm">
            <img src="/feature-1.svg" alt="Fabric texture" className="w-full h-auto" />
          </div>
        </div>
      </Section>

      {/* Featured products */}
      <Section title="Featured" description="精选单品，材质与版型的安静表达。">
        {home?.featuredProducts && home.featuredProducts.length > 0 ? (
          <Grid cols={3}>
            {home.featuredProducts.slice(0, 3).map((p) => (
              <ProductCard
                key={p.slug?.current || p._id}
                title={p.title}
                subtitle={p.material || ""}
                price={`¥${p.price || 0}`}
                imageSrc={p.images?.[0]?.asset?.url || "/feature-2.svg"}
                secondaryImageSrc={p.images?.[1]?.asset?.url || p.images?.[0]?.asset?.url || "/feature-3.svg"}
                href={`/product/${p.slug?.current || ""}`}
              />
            ))}
          </Grid>
        ) : (
          <>
            <Grid cols={3}>
              <ProductCard title="Single-Color Knit" subtitle="Merino Wool" price="¥2,980" imageSrc="/feature-2.svg" />
              <ProductCard title="Structured Shirt" subtitle="Egyptian Cotton" price="¥1,980" imageSrc="/feature-3.svg" />
              <ProductCard title="Minimal Coat" subtitle="Double-Face Wool" price="¥5,980" imageSrc="/feature-1.svg" />
            </Grid>
          </>
        )}
        <div className="mt-10">
          <Button asChild href="/collection">查看全部</Button>
        </div>
      </Section>

      {/* Lookbook */}
      <Section title="Lookbook" description="以编辑视角呈现结构与质感。">
        <div className="media-hover media-frame rounded-sm">
          <img src="/story-1.svg" alt="Lookbook editorial" className="w-full h-auto" />
        </div>
        <div className="mt-6">
          <Button asChild href="/lookbook" variant="text">
            浏览 Lookbook
          </Button>
        </div>
      </Section>
    </>
  );
}
