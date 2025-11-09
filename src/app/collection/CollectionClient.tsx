"use client";

import Container from "@/components/Container";
import { SERIES } from "@/lib/seriesData";

export default function CollectionClient() {
  return (
    <>
      {/* Hero */}
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
                  每一季，我们以材质为核心，构建若干清晰的系列。它们在风格、廓形与织物上有所侧重，但共同遵循“克制、专注、可持续”的设计信念。
                </p>
                <a className="btn btn--text mt-4" href="/the-material">了解材质理念</a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Series Showcase */}
      {SERIES.map((s, i) => (
        <section key={s.slug} className="section">
          <Container>
            <div className={`grid grid-cols-1 gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="media-frame appear is-in">
                <img src={s.hero} alt={s.title} className="w-full h-auto" />
              </div>
              <div className="flex items-center">
                <div>
                  <div className="text-xs text-zinc-600">{s.season}</div>
                  <h2 className="mt-2 text-2xl font-semibold">{s.title}</h2>
                  <p className="mt-1 text-sm text-zinc-600">{s.subtitle}</p>
                  <p className="mt-4 text-sm text-zinc-700 max-w-prose">{s.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.materials.map((m) => (
                      <span key={m} className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: "var(--accent-12)" }}>
                        {m}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <a className="btn" href={`/collection/series/${s.slug}`}>查看系列</a>
                    <a className="btn btn--text" href="/lookbook">查看 Lookbook</a>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}


