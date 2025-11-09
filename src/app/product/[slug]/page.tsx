type Props = {
  params: { slug: string };
};

export default function ProductDetailPage({ params }: Props) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Product Detail</h1>
      <p className="mt-3 text-zinc-600">占位详情页：{params.slug}</p>
    </section>
  );
}


