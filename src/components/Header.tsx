import Container from "@/components/Container";
import Nav from "@/components/Nav";
import MobileNav from "@/components/MobileNav";
import AnnouncementBar from "@/components/AnnouncementBar";

export default function Header() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b bg-background/90 site-header"
      style={{ borderColor: "var(--accent-12)" }}
    >
      {/* 顶部小广播条（轮播 + 滚动收起） */}
      <AnnouncementBar />
      <Container className="py-4 relative">
        {/* 顶部行：品牌名居中 */}
        <div className="relative flex items-center justify-center">
          <a href="/" className="brand-mark">
            Viran Lucien
          </a>
          {/* 品牌下方装饰行（不占据布局高度） */}
          <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 mt-0 hidden sm:flex items-center gap-2 brand-deco text-[12px] leading-none text-black">
            <span className="brand-deco-line w-20" />
            <span className="tracking-wide">255. 250. 245</span>
            <span className="brand-deco-line w-20" />
          </div>
          {/* 右侧用户与购物袋图标 */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-4">
            <a href="/account" aria-label="Account" className="icon-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </a>
            <a href="/cart" aria-label="Cart" className="icon-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.8h7.3a2 2 0 0 0 2-1.6L21 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="10" cy="20" r="1" fill="currentColor"/>
                <circle cx="18" cy="20" r="1" fill="currentColor"/>
              </svg>
            </a>
          </div>
          {/* Mobile hamburger */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 sm:hidden">
            <MobileNav />
          </div>
        </div>
        {/* 下方一排：导航居中 */}
        <div className="mt-3 hidden sm:flex items-center justify-center">
          <Nav />
        </div>
      </Container>
    </header>
  );
}


