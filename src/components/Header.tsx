import Container from "@/components/Container";
import Nav from "@/components/Nav";

export default function Header() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b bg-background/90"
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
      </Container>
    </header>
  );
}


