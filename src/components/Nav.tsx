"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type NavItem = {
  label: string;
  href: string;
  panel?: Array<{ label: string; href: string }>;
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Collection",
    href: "/collection",
    panel: [
      { label: "All Products", href: "/collection/all" },
      { label: "Tops", href: "/collection/tops" },
      { label: "Bottoms", href: "/collection/bottoms" },
      { label: "Outerwear", href: "/collection/outerwear" },
    ],
  },
  { label: "The Material", href: "/the-material", panel: [
    { label: "Fabric Story", href: "/the-material/fabric-story" },
    { label: "Craftsmanship", href: "/the-material/craftsmanship" },
    { label: "Color Philosophy", href: "/the-material/color-philosophy" },
  ]},
  { label: "Lookbook", href: "/lookbook" },
  { label: "Brand", href: "/brand", panel: [
    { label: "About", href: "/brand/about" },
    { label: "Design Ethos", href: "/brand/design-ethos" },
    { label: "Journal", href: "/brand/journal" },
  ]},
  { label: "Client Service", href: "/client-service", panel: [
    { label: "Store Locator", href: "/client-service/store-locator" },
    { label: "Contact", href: "/client-service/contact" },
    { label: "Appointment", href: "/client-service/appointment" },
    { label: "Shipping & Returns", href: "/client-service/shipping-returns" },
    { label: "FAQ", href: "/client-service/faq" },
  ]},
  { label: "Account", href: "/account", panel: [
    { label: "Login", href: "/account/login" },
    { label: "Register", href: "/account/register" },
    { label: "Orders", href: "/account/orders" },
    { label: "Wishlist", href: "/account/wishlist" },
    { label: "Settings", href: "/account/settings" },
  ]},
  { label: "Cart", href: "/cart" },
];

export default function Nav({ hidePanels = false }: { hidePanels?: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  const handleOpen = useCallback((key: string | null) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    // 延迟关闭，避免光标移动抖动
    if (key === null) {
      timerRef.current = window.setTimeout(() => setOpen(null), 120);
    } else {
      setOpen(key);
    }
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // 点击外部收起
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) setOpen(null);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div className={`relative ${hidePanels ? "nav-mobile" : ""}`} ref={navRef}>
      <ul className="flex items-center gap-6 whitespace-nowrap">
        {[
          {
            label: "Collection",
            href: "/collection",
            panel: [
              { label: "All Products", href: "/collection/all" },
              { label: "Tops", href: "/collection/tops" },
              { label: "Bottoms", href: "/collection/bottoms" },
              { label: "Outerwear", href: "/collection/outerwear" },
            ],
          },
          {
            label: "The Materials",
            href: "/the-material",
            panel: [
              { label: "Fabric Story", href: "/the-material/fabric-story" },
              { label: "Craftsmanship", href: "/the-material/craftsmanship" },
              {
                label: "Color Philosophy",
                href: "/the-material/color-philosophy",
              },
            ],
          },
          {
            label: "Men",
            href: "/men",
            panel: [
              { label: "Knitwear", href: "/men/knitwear" },
              { label: "Shirts", href: "/men/shirts" },
              { label: "Pants", href: "/men/pants" },
              { label: "Outerwear", href: "/men/outerwear" },
              { label: "Accessories", href: "/men/accessories" },
            ],
          },
          {
            label: "Women",
            href: "/women",
            panel: [
              { label: "Knitwear", href: "/women/knitwear" },
              { label: "Tops", href: "/women/tops" },
              { label: "Pants & Skirts", href: "/women/bottoms" },
              { label: "Outerwear", href: "/women/outerwear" },
              { label: "Accessories", href: "/women/accessories" },
            ],
          },
        ].map((item) => {
          const hasPanel = !!item.panel?.length;
          const isOpen = open === item.label;
          return (
            <li
              key={item.label}
              onMouseEnter={() => hasPanel && handleOpen(item.label)}
              onMouseLeave={() => hasPanel && handleOpen(null)}
              className="relative"
            >
              <Link
                href={item.href}
                className={`nav-link text-sm ${["Collection","The Materials","Men","Women"].includes(item.label) ? "nav-link--low" : ""}`}
                onFocus={() => hasPanel && handleOpen(item.label)}
                onBlur={() => hasPanel && handleOpen(null)}
                aria-haspopup={hasPanel ? "menu" : undefined}
                aria-expanded={isOpen}
              >
                {item.label}
                <span className={`nav-underline ${isOpen ? "is-active" : ""}`} />
              </Link>

              {!hidePanels && hasPanel ? (
                <div
                  className={`nav-panel ${isOpen ? "is-open" : ""}`}
                  role="menu"
                >
                  <div className="container py-6">
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                      {item.panel!.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block py-2 text-sm hover:opacity-80"
                          role="menuitem"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}


