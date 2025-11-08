import Container from "@/components/Container";

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
        <nav className="hidden items-center gap-6 text-sm sm:flex">
          <a className="hover:opacity-70" href="/collection">
            Collection
          </a>
          <a className="hover:opacity-70" href="/the-material">
            The Material
          </a>
          <a className="hover:opacity-70" href="/lookbook">
            Lookbook
          </a>
          <a className="hover:opacity-70" href="/brand">
            Brand
          </a>
          <a className="hover:opacity-70" href="/client-service">
            Client Service
          </a>
          <a className="hover:opacity-70" href="/account">
            Account
          </a>
          <a className="hover:opacity-70" href="/cart">
            Cart
          </a>
        </nav>
      </Container>
    </header>
  );
}


