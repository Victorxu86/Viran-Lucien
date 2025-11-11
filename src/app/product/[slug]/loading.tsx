export default function Loading() {
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="media-frame h-80 w-full animate-pulse bg-neutral-200/40" />
            <div className="media-frame h-24 w-full animate-pulse bg-neutral-200/40" />
          </div>
          <div>
            <div className="h-7 w-2/3 animate-pulse bg-neutral-200/40" />
            <div className="mt-3 h-4 w-1/3 animate-pulse bg-neutral-200/40" />
            <div className="mt-5 h-6 w-20 animate-pulse bg-neutral-200/40" />
            <div className="mt-8 grid grid-cols-4 gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-9 animate-pulse bg-neutral-200/40" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Loading() {
  return (
    <section className="section">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="h-[400px] w-full animate-pulse rounded-sm" style={{ background: "var(--accent-06)" }} />
            <div className="h-[200px] w-full animate-pulse rounded-sm" style={{ background: "var(--accent-06)" }} />
          </div>
          <div>
            <div className="h-8 w-1/2 animate-pulse rounded-sm" style={{ background: "var(--accent-06)" }} />
            <div className="mt-4 h-4 w-1/3 animate-pulse rounded-sm" style={{ background: "var(--accent-06)" }} />
            <div className="mt-6 h-6 w-24 animate-pulse rounded-sm" style={{ background: "var(--accent-06)" }} />
            <div className="mt-10 h-32 w-full animate-pulse rounded-sm" style={{ background: "var(--accent-06)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}


