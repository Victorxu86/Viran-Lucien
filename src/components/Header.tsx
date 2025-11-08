import Container from "@/components/Container";
import Nav from "@/components/Nav";

export default function Header() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b bg-background/90"
      style={{ borderColor: "var(--accent-12)" }}
    >
      <Container className="flex items-center justify-between py-4">
        <a href="/" className="text-lg font-medium tracking-wide">
          Viran Lucien
        </a>
        <div className="hidden sm:block">
          <Nav />
        </div>
        <a href="/cart" className="text-sm hover:opacity-80">
          Cart
        </a>
      </Container>
    </header>
  );
}


