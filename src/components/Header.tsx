import Container from "@/components/Container";
import Nav from "@/components/Nav";

export default function Header() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b bg-background/90 relative"
      style={{ borderColor: "var(--accent-12)" }}
    >
      <Container className="py-4">
        {/* 顶部行：品牌名居中 */}
        <div className="flex items-center justify-center">
          <a href="/" className="text-lg font-medium tracking-wide">
            Viran Lucien
          </a>
        </div>
        {/* 下方一排：导航居中 */}
        <div className="mt-3 hidden sm:flex items-center justify-center">
          <Nav />
        </div>
        {/* 右侧图标：用户与购物袋 */}
        <div className="hidden sm:flex items-center gap-4 absolute right-6 top-4">
          <a href="/account" aria-label="Account" className="hover:opacity-80">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M5 19.5c0-3.59 3.134-5.75 7-5.75s7 2.16 7 5.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>
          <a href="/cart" aria-label="Cart" className="hover:opacity-80">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 4h2l2.4 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.95-1.55L21 7H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="10" cy="20" r="1" fill="currentColor"/>
              <circle cx="18" cy="20" r="1" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </Container>
    </header>
  );
}


