import Container from "@/components/Container";

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: "var(--accent-12)" }}
    >
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Left: Stay in touch */}
          <div>
            <h3 className="text-base">Stay in touch</h3>
            <p className="mt-4 text-sm text-zinc-700">
              订阅以获取新品与展览信息。（稍后接入）
            </p>
            <div className="mt-4 flex max-w-sm items-center gap-2">
              <input
                className="h-10 w-full rounded-sm border px-3 text-sm"
                style={{ borderColor: "var(--accent-12)", background: "transparent" }}
                placeholder="your@email"
                disabled
              />
              <button className="btn" disabled>Subscribe</button>
            </div>
          </div>
          {/* Right: Brand & Client Service */}
          <div>
            <h3 className="text-base">Brand</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700">
              <li><a className="hover:opacity-80" href="/brand/about">About</a></li>
              <li><a className="hover:opacity-80" href="/brand/design-ethos">Design Ethos</a></li>
              <li><a className="hover:opacity-80" href="/brand/journal">Journal</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-base">Client Service</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700">
              <li><a className="hover:opacity-80" href="/client-service/store-locator">Store Locator</a></li>
              <li><a className="hover:opacity-80" href="/client-service/contact">Contact</a></li>
              <li><a className="hover:opacity-80" href="/client-service/appointment">Appointment</a></li>
              <li><a className="hover:opacity-80" href="/client-service/shipping-returns">Shipping & Returns</a></li>
              <li><a className="hover:opacity-80" href="/client-service/faq">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-xs text-zinc-600" style={{ borderColor: "var(--accent-12)" }}>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <span>© {new Date().getFullYear()} Viran Lucien</span>
            <nav className="flex items-center gap-4">
              <a className="hover:opacity-80" href="/privacy">Privacy</a>
              <a className="hover:opacity-80" href="/terms">Terms</a>
              <a className="hover:opacity-80" href="/cookies">Cookies</a>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  );
}


