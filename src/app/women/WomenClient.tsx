"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Container from "@/components/Container";
import Grid from "@/components/Grid";
import ProductCard from "@/components/ProductCard";
import { useRouter, useSearchParams } from "next/navigation";

type Category = "all" | "tops" | "bottoms" | "outerwear";
type Sort = "newest" | "price-asc" | "price-desc";

type Product = {
  slug: string;
  title: string;
  material: string;
  price: number;
  category: Category;
  image: string;
  imageAlt: string;
};

const BASE_PRODUCTS: Product[] = [
  { slug: "mono-knit", title: "Mono Knit", material: "Cashmere", price: 3280, category: "tops", image: "/feature-2.svg", imageAlt: "Knitwear" },
  { slug: "soft-shirt", title: "Soft Shirt", material: "Silk Cotton", price: 2380, category: "tops", image: "/feature-3.svg", imageAlt: "Shirt" },
  { slug: "minimal-coat-w", title: "Minimal Coat", material: "Wool-Cashmere", price: 6280, category: "outerwear", image: "/feature-1.svg", imageAlt: "Coat" },
  { slug: "tailored-skirt", title: "Tailored Skirt", material: "Wool Blend", price: 2480, category: "bottoms", image: "/feature-3.svg", imageAlt: "Skirt" },
  { slug: "cardigan-light", title: "Cardigan Light", material: "Merino Wool", price: 3580, category: "tops", image: "/feature-2.svg", imageAlt: "Cardigan" },
  { slug: "trench", title: "Trench", material: "Cotton Gabardine", price: 4680, category: "outerwear", image: "/feature-1.svg", imageAlt: "Trench" },
  { slug: "linen-top", title: "Linen Top", material: "Pure Linen", price: 1780, category: "tops", image: "/feature-3.svg", imageAlt: "Linen Top" },
  { slug: "classic-trouser-w", title: "Classic Trouser", material: "Virgin Wool", price: 2780, category: "bottoms", image: "/feature-2.svg", imageAlt: "Trouser" },
];

const PRODUCTS: Product[] = Array.from({ length: 40 }).map((_, i) => {
  const base = BASE_PRODUCTS[i % BASE_PRODUCTS.length];
  const idx = i + 1;
  return {
    ...base,
    slug: `${base.slug}-${idx}`,
    title: `${base.title} ${idx}`,
    price: base.price + (idx % 7) * 50,
  };
});

export default function WomenClient({ initialProducts }: { initialProducts?: Product[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const [cat, setCat] = useState<Category>((params.get("cat") as Category) || "all");
  const [sort, setSort] = useState<Sort>((params.get("sort") as Sort) || "newest");
  const [visible, setVisible] = useState<number>(8);
  const appearRefs = useRef<Array<HTMLDivElement | null>>([]);
  const data: Product[] = initialProducts && initialProducts.length > 0 ? initialProducts : PRODUCTS;

  useEffect(() => {
    const sp = new URLSearchParams(params.toString());
    sp.set("cat", cat);
    sp.set("sort", sort);
    router.replace(`/women?${sp.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat, sort]);

  const filtered = useMemo(() => {
    let list = data.filter((p) => (cat === "all" ? true : p.category === cat));
    if (sort === "newest") {
      list = list.slice().reverse();
    } else if (sort === "price-asc") {
      list = list.slice().sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list = list.slice().sort((a, b) => b.price - a.price);
    }
    return list;
  }, [cat, sort, data]);

  const visibleList = useMemo(() => filtered.slice(0, visible), [filtered, visible]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
          }
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
    <section className="section">
      <Container>
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Women</h1>
            <p className="mt-2 text-sm text-zinc-600">简洁、克制与材质优先的女装浏览。</p>
          </div>
          <div className="flex items-center gap-6">
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
        </header>

        <div className="mt-10">
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
              <button
                className="btn"
                onClick={() => setVisible((n) => Math.min(n + 20, filtered.length))}
              >
                加载更多（剩余 {Math.max(filtered.length - visible, 0)}）
              </button>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}


