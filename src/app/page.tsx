import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center">
      <section className="mx-auto w-full max-w-6xl px-6">
        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
          Viran Lucien
        </h1>
        <p className="mt-6 max-w-xl text-zinc-600 dark:text-zinc-400">
          独立服装品牌。即将上线：首发系列、Lookbook、订阅与门店信息。
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/shop"
            className="rounded-full bg-black px-6 py-3 text-sm text-white transition-colors hover:bg-[#383838] dark:bg-white dark:text-black dark:hover:bg-[#ccc]"
          >
            进入商店（即将上线）
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-black/10 px-6 py-3 text-sm transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
          >
            了解品牌
          </Link>
        </div>
      </section>
    </div>
  );
}
