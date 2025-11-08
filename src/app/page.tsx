import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Grid from "@/components/Grid";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/Button";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="media-hover media-frame">
          <img
            src="/hero.svg"
            alt="Viran Lucien — Quiet luxury editorial hero"
            className="w-full h-auto"
          />
        </div>
        <Container className="py-12">
          <h1 className="brand-display">Viran Lucien</h1>
          <p className="mt-6 max-w-2xl">
            材质先行，结构克制。以单色体系呈现安静而自信的现代风格。
          </p>
          <nav className="mt-8 flex gap-6">
            <Button asChild href="/collection">浏览系列</Button>
            <Button asChild href="/the-material" variant="text">
              材质理念
            </Button>
          </nav>
        </Container>
      </section>

      {/* Material narrative */}
      <Section
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
        <Grid cols={3}>
          <ProductCard title="Single-Color Knit" subtitle="Merino Wool" price="¥2,980" imageSrc="/feature-2.svg" />
          <ProductCard title="Structured Shirt" subtitle="Egyptian Cotton" price="¥1,980" imageSrc="/feature-3.svg" />
          <ProductCard title="Minimal Coat" subtitle="Double-Face Wool" price="¥5,980" imageSrc="/feature-1.svg" />
        </Grid>
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
