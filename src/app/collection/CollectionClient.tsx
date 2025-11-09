"use client";

import Container from "@/components/Container";
import Grid from "@/components/Grid";
import ProductCard from "@/components/ProductCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type Category = "all" | "tops" | "bottoms" | "outerwear";
type Gender = "all" | "men" | "women";
type Sort = "newest" | "price-asc" | "price-desc";

type Item = {
  slug: string;
  title: string;
  material: string;
  price: number;
  category: Category;
  gender: Gender;
  image: string;
};

const BASE_ITEMS: Item[] = [
  { slug: "vl-knit", title: "VL Knit", material: "Merino Wool", price: 2980, category: "tops", gender: "men", image: "/feature-2.svg" },
  { slug: "vl-shirt", title: "VL Shirt", material: "Egyptian Cotton", price: 1980, category: "tops", gender: "men", image: "/feature-3.svg" },
  { slug: "vl-coat", title: "VL Coat", material: "Double-Face Wool", price: 5980, category: "outerwear", gender: "men", image: "/feature-1.svg" },
  { slug: "vl-trouser", title: "VL Trouser", material: "Virgin Wool", price: 2680, category: "bottoms", gender: "men", image: "/feature-2.svg" },
  { slug: "vl-cardigan", title: "VL Cardigan", material: "Cashmere", price: 4280, category: "tops", gender: "women", image: "/feature-2.svg" },
  { slug: "vl-top", title: "VL Top", material: "Silk Cotton", price: 1780, category: "tops", gender: "women", image: "/feature-3.svg" },
  { slug: "vl-longcoat", title: "VL Long Coat", material: "Wool Cashmere", price: 6980, category: "outerwear", gender: "women", image: "/feature-1.svg" },
  { slug: "vl-skirt", title: "VL Skirt", material: "Wool Blend", price: 2480, category: "bottoms", gender: "women", image: "/feature-3.svg" },
];

const ITEMS: Item[] = Array.from({ length: 48 }).map((_, i) => {
  const base = BASE_ITEMS[i % BASE_ITEMS.length];
  const idx = i + 1;
  return {
    ...base,
    slug: `${base.slug}-${idx}`,
    title: `${base.title} ${idx}`,
    price: base.price + (idx % 7) * 50,
  };
});

export default function CollectionClient() {
  const router = useRouter();
  const params = useSearchParams();
  const [cat, setCat] = useState<Category>((params.get("cat") as Category) || "all");
  const [gender, setGender] = useState<Gender>((params.get("gender") as Gender) || "all");
  const [sort, setSort] = useState<Sort>((params.get("sort") as Sort) || "newest");
  const [visible, setVisible] = useState(12);
  const appearRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const sp = new URLSearchParams(params.toString());
    sp.set("cat", cat);
    sp.set("gender", gender);
    sp.set("sort", sort);
    router.replace(`/collection?${sp.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat, gender, sort]);

  const filtered = useMemo(() => {
    let list = ITEMS.filter((p) =>
      (cat === "all" ? true : p.category === cat) &&
      (gender === "all" ? true : p.gender === gender)
    );
    if (sort === "newest") list = list.slice().reverse();
    if (sort === "price-asc") list = list.slice().sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = list.slice().sort((a, b) => b.price - a.price);
    return list;
  }, [cat, gender, sort]);

  const visibleList = useMemo(() => filtered.slice(0, visible), [filtered, visible]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
        });
      },
      { threshold: 0.15 }
    );
    appearRefs.current.slice(0, visibleList.length).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [visibleList]);

  const setRefAt = (idx: number) => (el: HTMLDivElement | null) => {
    appearRefs.current[idx] = el;
  };

  return (
    <>
      {/* Hero / Editorial Header */}
      <section className="section pt-10">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="media-frame">
                <img src="/hero.svg" alt="Collection editorial" className="w-full h-auto" />
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight">Collection</h1>
                <p className="mt-4 text-sm text-zinc-700 max-w-prose">
                  材质为先的系列展示：以单色与结构表达克制的现代美学。在这里，你可以按类目、性别与价格节奏筛选，顺畅地浏览与进入详情。
                </p>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="media-frame">
                    <img src="/feature-1.svg" alt="Material shot" />
                  </div>
                  <div className="media-frame">
                    <img src="/feature-2.svg" alt="Detail shot" />
                  </div>
                  <div className="media-frame">
                    <img src="/feature-3.svg" alt="Silhouette shot" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Sticky filter bar */}
      <section className="sticky top-20 z-40 border-y bg-background/90" style={{ borderColor: "var(--accent-12)" }}>
        <Container className="py-3">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <label className="text-sm text-zinc-700">Category</label>
              <select
                className="border bg-transparent px-2 py-1 text-sm"
                style={{ borderColor: "var(--accent-12)" }}
                value={cat}
                onChange={(e) => setCat(e.target.value as Category)}
              >
                <option value="all">All</option>
                <option value="tops">Tops</option>
                <option value="bottoms">Bottoms</option>
                <option value="outerwear">Outerwear</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-zinc-700">Gender</label>
              <select
                className="border bg-transparent px-2 py-1 text-sm"
                style={{ borderColor: "var(--accent-12)" }}
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
              >
                <option value="all">All</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-zinc-700">Sort</label>
              <select
                className="border bg-transparent px-2 py-1 text-sm"
                style={{ borderColor: "var(--accent-12)" }}
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
              </select>
            </div>
          </div>
        </Container>
      </section>

      {/* Grid */}
      <section className="section">
        <Container>
          <Grid cols={4} className="md:grid-cols-3">
            {visibleList.map((p, idx) => (
              <div
                key={p.slug}
                className="appear"
                ref={setRefAt(idx)}
                style={{ transitionDelay: `${(idx % 12) * 40}ms` }}
              >
                <ProductCard
                  title={p.title}
                  subtitle={p.material}
                  price={`¥${p.price}`}
                  imageSrc={p.image}
                  secondaryImageSrc={p.image}
                  href={`/product/${p.slug}`}
                />
              </div>
            ))}
          </Grid>
          {visible < filtered.length ? (
            <div className="mt-10 flex justify-center">
              <button className="btn" onClick={() => setVisible((n) => Math.min(n + 12, filtered.length))}>
                加载更多（剩余 {Math.max(filtered.length - visible, 0)}）
              </button>
            </div>
          ) : null}
        </Container>
      </section>

      {/* Editorial band */}
      <section className="section">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="media-frame">
              <img src="/story-1.svg" alt="Editorial band" />
            </div>
            <div className="flex items-center">
              <div>
                <h2 className="text-base">The Material</h2>
                <p className="mt-3 text-sm text-zinc-700 max-w-prose">
                  通过克制的设计与高品质织造，传递“触感即价值”的品牌核⼼。我们的系列强调纱线、织法与结构线条，保持轻盈耐穿的体验。
                </p>
                <a className="btn btn--text mt-4" href="/the-material">了解材质理念</a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}


