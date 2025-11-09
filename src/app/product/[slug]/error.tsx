"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 text-center">
      <h1 className="text-xl font-semibold">暂时无法加载该商品</h1>
      <p className="mt-3 text-sm text-zinc-600">
        {error.digest ? `Digest: ${error.digest}` : "发生了未知错误。"}
      </p>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button className="btn" onClick={() => reset()}>重试</button>
        <a className="btn btn--text" href="/men">返回 Men</a>
      </div>
    </section>
  );
}


