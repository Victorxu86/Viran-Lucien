import Container from "@/components/Container";
import Gallery from "@/components/Gallery";
import { SERIES } from "@/lib/seriesData";

type Props = { params: { slug: string } };

export const dynamic = "force-dynamic";

export default function SeriesDetailPage({ params }: Props) {
  const series = SERIES.find((s) => s.slug === params.slug) || SERIES[0];
  return (
    <section className="section">
      <Container>
        <header className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="media-frame">
            <img src={series.hero} alt={series.title} className="w-full h-auto" />
          </div>
          <div className="flex items-center">
            <div>
              <div className="text-xs text-zinc-600">{series.season}</div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">{series.title}</h1>
              <p className="mt-2 text-sm text-zinc-700">{series.subtitle}</p>
              <p className="mt-4 text-sm text-zinc-700 max-w-prose">{series.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {series.materials.map((m) => (
                  <span key={m} className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: "var(--accent-12)" }}>
                    {m}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-4">
                <a className="btn btn--text" href="/the-material">材质理念</a>
                <a className="btn btn--text" href="/lookbook">Lookbook</a>
              </div>
            </div>
          </div>
        </header>

        <div className="mt-12">
          <Gallery images={series.gallery} />
        </div>
      </Container>
    </section>
  );
}


