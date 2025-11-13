"use client";

export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <div className="rounded-sm border p-6" style={{ borderColor: "var(--accent-12)" }}>
          <div className="text-base font-medium">页面加载出现问题</div>
          <div className="mt-2 text-sm text-zinc-700">{error?.message || "Unknown error"}</div>
          <button className="btn mt-4" onClick={() => reset()}>
            重试
          </button>
        </div>
      </div>
    </section>
  );
}

