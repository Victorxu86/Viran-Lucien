"use client";

import { useState } from "react";

const items = [
  { label: "Collection", href: "/collection" },
  { label: "The Materials", href: "/the-material" },
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Account", href: "/account" },
  { label: "Cart", href: "/cart" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="sm:hidden">
      <button
        aria-label="Open navigation"
        className="icon-link"
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      {open ? (
        <div className="mobile-nav-panel">
          <nav className="flex flex-col">
            {items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                className="px-6 py-4 border-b text-sm"
                style={{ borderColor: "var(--accent-12)" }}
                onClick={() => setOpen(false)}
              >
                {it.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}


