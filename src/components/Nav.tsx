"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type NavItem = {
  label: string;
  href: string;
  panel?: Array<{ label: string; href: string }>;
  featured?: {
    title: string;
    href: string;
    image?: string; // 可以是图片路径
    description?: string;
  };
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
    featured: {
      title: "New Arrivals",
      href: "/collection/all",
      description: "Explore the latest additions to our collection.",
      image: "/hero.svg" // 暂时使用现有资源作为占位
    }
  },
  { 
    label: "The Materials", 
    href: "/the-material", 
    panel: [
      { label: "Fabric Story", href: "/the-material/fabric-story" },
      { label: "Craftsmanship", href: "/the-material/craftsmanship" },
      { label: "Color Philosophy", href: "/the-material/color-philosophy" },
    ],
    featured: {
      title: "Our Philosophy",
      href: "/the-material/fabric-story",
      description: "Discover the essence of our materials.",
      image: "/feature-1.svg"
    }
  },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Brand", href: "/brand", panel: [
    { label: "About", href: "/brand/about" },
    { label: "Design Ethos", href: "/brand/design-ethos" },
    { label: "Journal", href: "/brand/journal" },
  ]},
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
    featured: {
      title: "Men's Collection",
      href: "/men",
      image: "/feature-2.svg"
    }
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
    featured: {
      title: "Women's Collection",
      href: "/women",
      image: "/feature-3.svg"
    }
  },
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
  const isMobileMode = hidePanels;

  const handleOpen = useCallback((key: string | null) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    // 延迟关闭，避免光标移动抖动
    if (key === null) {
      timerRef.current = window.setTimeout(() => setOpen(null), 150);
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

  const handleTopLinkClick = (e: React.MouseEvent, item: NavItem, hasPanel: boolean, isOpen: boolean) => {
    if (!isMobileMode) return;
    if (hasPanel) {
      if (!isOpen) {
        e.preventDefault();
        setOpen(item.label);
      } else {
        // 第二次点击允许跳转
      }
    }
  };

  return (
    <nav className={`relative ${hidePanels ? "nav-mobile" : ""}`} ref={navRef}>
      <ul className={`flex items-center gap-8 whitespace-nowrap ${isMobileMode ? "justify-center" : ""}`}>
        {NAV_ITEMS.map((item) => {
          const hasPanel = !!item.panel?.length;
          const isOpen = open === item.label;
          
          // 判断是否为主要导航项（用于样式区分）
          const isPrimary = ["Collection", "The Materials", "Men", "Women"].includes(item.label);

          return (
            <li
              key={item.label}
              onMouseEnter={isMobileMode ? undefined : (() => hasPanel && handleOpen(item.label))}
              onMouseLeave={isMobileMode ? undefined : (() => hasPanel && handleOpen(null))}
              className="relative flex h-full items-center"
            >
              <Link
                href={item.href}
                className={`nav-link text-sm tracking-wide transition-colors duration-200 ${isPrimary ? "font-medium text-foreground" : "text-zinc-600 hover:text-foreground"}`}
                onFocus={isMobileMode ? undefined : (() => hasPanel && handleOpen(item.label))}
                onBlur={isMobileMode ? undefined : (() => hasPanel && handleOpen(null))}
                onClick={(e) => handleTopLinkClick(e, item, hasPanel, isOpen)}
                aria-haspopup={hasPanel ? "menu" : undefined}
                aria-expanded={isOpen}
              >
                {item.label}
                {/* 下划线动画 */}
                <span 
                  className={`absolute left-0 right-0 -bottom-1 h-[1px] bg-accent transform origin-center transition-transform duration-300 ease-out ${isOpen ? "scale-x-100" : "scale-x-0"}`} 
                />
              </Link>

              {/* Desktop Full-Width Mega Menu */}
              {!isMobileMode && hasPanel && (
                <div
                  className={`
                    absolute left-1/2 -translate-x-1/2 top-full w-screen cursor-default
                    transition-all duration-300 ease-out origin-top pt-6
                    ${isOpen 
                      ? "opacity-100 translate-y-0 visible pointer-events-auto" 
                      : "opacity-0 -translate-y-2 invisible pointer-events-none"}
                  `}
                  role="menu"
                >
                  {/* Inner Card - 限制最大宽度并居中 */}
                  <div className="mx-auto max-w-screen-xl px-6">
                     <div className="relative bg-background border border-accent-12 shadow-xl rounded-sm overflow-hidden">
                        <div className="flex min-h-[280px]">
                          {/* 左侧：链接列表 */}
                          <div className="flex-1 p-8 md:p-10 bg-background">
                             <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">
                               Explore {item.label}
                             </h3>
                             <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                {item.panel!.map((link) => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    className="group flex items-center gap-2 text-sm text-zinc-600 hover:text-black transition-colors"
                                    role="menuitem"
                                  >
                                    <span className="w-0 h-[1px] bg-accent group-hover:w-3 transition-all duration-300"></span>
                                    {link.label}
                                  </Link>
                                ))}
                             </div>
                             
                             {/* 额外的底部链接或 CTA */}
                             <div className="mt-10 pt-6 border-t border-accent-12">
                                <Link href={item.href} className="text-xs font-medium uppercase tracking-wide border-b border-black pb-0.5 hover:opacity-70">
                                  View All {item.label}
                                </Link>
                             </div>
                          </div>

                          {/* 右侧：精选内容 / 图片 */}
                          {item.featured && (
                            <div className="hidden md:flex w-1/3 lg:w-2/5 bg-zinc-50 relative overflow-hidden group">
                              {/* 图片层 */}
                              {item.featured.image && (
                                <div className="absolute inset-0">
                                   {/* 
                                     注意：这里使用的是 img 标签作为简单的演示。
                                     生产环境建议使用 Next.js Image，但为了样式方便直接用 img
                                   */}
                                   <img 
                                     src={item.featured.image} 
                                     alt={item.featured.title}
                                     className="h-full w-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                                   />
                                   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                                </div>
                              )}
                              
                              {/* 文字层 */}
                              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white">
                                <h4 className="text-xl font-serif font-medium mb-1">{item.featured.title}</h4>
                                {item.featured.description && (
                                  <p className="text-sm text-white/90 line-clamp-2">{item.featured.description}</p>
                                )}
                              </div>
                              
                              <Link href={item.featured.href} className="absolute inset-0 z-10" aria-label={item.featured.title} />
                            </div>
                          )}
                        </div>
                     </div>
                  </div>
                </div>
              )}

              {/* Mobile floating dropdown handled globally below */}
            </li>
          );
        })}
      </ul>
      
      {/* Mobile: global floating dropdown + backdrop */}
      {isMobileMode && open && (
        <>
          <button aria-label="Close menu" className="nav-backdrop" onClick={() => setOpen(null)} />
          <div className="nav-panel-mobile" role="menu">
            <div className="nav-mobile-title uppercase tracking-widest font-medium text-xs">{open}</div>
            <div className="py-1">
              {(NAV_ITEMS.find((n) => n.label === open)?.panel || []).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 border-b text-sm hover:bg-zinc-50"
                  style={{ borderColor: "var(--accent-12)" }}
                  role="menuitem"
                  onClick={() => setOpen(null)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
