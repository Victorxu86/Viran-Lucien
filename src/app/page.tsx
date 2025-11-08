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
        <nav className="mt-10 flex gap-6">
          <Link href="/collection" className="btn">
            浏览系列
          </Link>
          <Link href="/the-material" className="btn btn--text">
            材质理念
          </Link>
        </nav>
      </section>
    </div>
  );
}
