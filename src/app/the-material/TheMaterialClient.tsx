"use client";

import Container from "@/components/Container";
import { MATERIALS } from "@/lib/materialsData";
import { useEffect, useRef, useState } from "react";

function Accordion({ title, items }: { title: string; items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-sm border" style={{ borderColor: "var(--accent-12)" }}>
      <button
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-sm">{title}</span>
        <span className="text-sm">{open ? "−" : "+"}</span>
      </button>
      {open ? (
        <ul className="px-6 pb-4 text-sm text-zinc-700">
          {items.map((i) => (
            <li key={i} className="list-disc pl-2">
              {i}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function TheMaterialClient() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = useState<string>(MATERIALS[0].id);

  // 细微 parallax
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--tx", `${cx * 6}px`);
      el.style.setProperty("--ty", `${cy * 6}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  // 侧边索引高亮
  useEffect(() => {
    const sections = MATERIALS.map((m) => document.getElementById(m.id)).filter(
      Boolean
    ) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="section pt-10">
        <Container>
          <div
            ref={heroRef}
            className="material-hero media-frame relative overflow-hidden"
            style={{ transform: "translate3d(var(--tx, 0), var(--ty, 0), 0)" }}
          >
            <img src="/story-1.svg" alt="The Material" className="w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,249,245,0.6)] to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h1 className="text-3xl font-semibold tracking-tight">The Material</h1>
              <p className="mt-2 max-w-prose text-sm text-zinc-700">
                Viran Lucien 的材质理念：通过优质纤维与精密织造构建可持续的衣橱基底。以下材质为我们的核心语言。
              </p>
              <div className="mt-2 text-xs">
                <a className="underline hover:opacity-80" href="/the-material/fabric-story">Fabric Story</a>
                <span className="mx-2">·</span>
                <a className="underline hover:opacity-80" href="/the-material/craftsmanship">Craftsmanship</a>
                <span className="mx-2">·</span>
                <a className="underline hover:opacity-80" href="/the-material/color-philosophy">Color Philosophy</a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Content with sticky index */}
      <section className="section">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px,1fr]">
            {/* Sticky index */}
            <aside className="hidden lg:block sticky top-24 self-start">
              <nav className="text-sm">
                <div className="text-xs text-zinc-600">Materials</div>
                <ul className="mt-3 space-y-2">
                  {MATERIALS.map((m) => (
                    <li key={m.id}>
                      <a
                        href={`#${m.id}`}
                        className={`hover:opacity-80 ${activeId === m.id ? "underline" : ""}`}
                      >
                        {m.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Sections */}
            <div className="space-y-16">
              {MATERIALS.map((m, i) => (
                <section id={m.id} key={m.id} className="space-y-6 appear is-in">
                  <div className={`grid grid-cols-1 gap-8 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                    <div className="media-frame relative overflow-hidden group">
                      <img src={m.image} alt={m.name} className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]" />
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20" style={{ background: "radial-gradient(circle at 30% 30%, rgba(0,0,0,.15), transparent 50%)" }} />
                    </div>
                    <div className="flex items-center">
                      <div>
                        <div className="text-xs text-zinc-600">Core Material</div>
                        <h2 className="mt-2 text-2xl font-semibold">{m.name}</h2>
                        <p className="mt-1 text-sm text-zinc-600">{m.subtitle}</p>
                        <p className="mt-4 text-sm text-zinc-700 max-w-prose">{m.description}</p>
                        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                          <Accordion title="Properties" items={m.properties} />
                          <Accordion title="Care" items={m.care} />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}


