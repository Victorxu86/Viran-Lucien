"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
      image: "/hero.svg" 
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
];

export default function Nav({ hidePanels = false }: { hidePanels?: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const isMobileMode = hidePanels;

  // 用于判断滑动的方向
  const [previousOpenIndex, setPreviousOpenIndex] = useState<number>(-1);
  const currentIndex = open ? NAV_ITEMS.findIndex((item) => item.label === open) : -1;
  const direction = currentIndex > previousOpenIndex ? 1 : -1;

  const handleOpen = useCallback((key: string | null) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    if (key === null) {
      // 稍微延时关闭，给用户移动鼠标的时间
      timerRef.current = setTimeout(() => {
        setOpen((prev) => {
          if (prev) {
            const idx = NAV_ITEMS.findIndex(i => i.label === prev);
            setPreviousOpenIndex(idx);
          }
          return null;
        });
      }, 150);
    } else {
       setOpen((prev) => {
         if (prev && prev !== key) {
           const idx = NAV_ITEMS.findIndex(i => i.label === prev);
           setPreviousOpenIndex(idx);
         } else if (!prev) {
           // 第一次打开，设置一个默认的前一个索引，或者不设置
           setPreviousOpenIndex(-1); 
         }
         return key;
       });
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

  // 查找当前打开的面板对应的 item
  const activeItem = NAV_ITEMS.find((item) => item.label === open);

  return (
    <nav className={`relative ${hidePanels ? "nav-mobile" : ""}`} ref={navRef}>
      <ul className={`flex items-center gap-8 whitespace-nowrap ${isMobileMode ? "justify-center" : ""}`}>
        {NAV_ITEMS.map((item, index) => {
          const hasPanel = !!item.panel?.length;
          const isOpen = open === item.label;
          const isHovered = hoveredIndex === index;

          return (
            <li
              key={item.label}
              onMouseEnter={() => {
                if (!isMobileMode) {
                  if (hasPanel) handleOpen(item.label);
                  setHoveredIndex(index);
                }
              }}
              onMouseLeave={() => {
                if (!isMobileMode) {
                  if (hasPanel) handleOpen(null);
                  setHoveredIndex(null);
                }
              }}
              className="relative flex h-full items-center"
            >
              <Link
                href={item.href}
                className={`nav-link text-sm tracking-wide transition-colors duration-200 
                  ${isOpen ? "text-foreground font-medium" : "text-zinc-600 hover:text-foreground"}`}
                onFocus={isMobileMode ? undefined : (() => hasPanel && handleOpen(item.label))}
                onBlur={isMobileMode ? undefined : (() => hasPanel && handleOpen(null))}
                onClick={(e) => handleTopLinkClick(e, item, hasPanel, isOpen)}
                aria-haspopup={hasPanel ? "menu" : undefined}
                aria-expanded={isOpen}
              >
                {item.label}
                {/* 下划线动画: 悬停或打开时显示 */}
                <span 
                  className={`absolute left-0 right-0 -bottom-1 h-[1.5px] bg-black transform origin-center transition-transform duration-300 ease-out ${isOpen || isHovered ? "scale-x-100" : "scale-x-0"}`} 
                />
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Desktop Mega Menu: 统一渲染，实现 Shared Layout 动画 */}
      {!isMobileMode && (
        <AnimatePresence>
          {open && activeItem && activeItem.panel && (
            <div
              className="absolute left-0 right-0 w-full"
              style={{ top: "100%", paddingTop: "1.5rem" }} // 增加 paddingTop 以给鼠标移动留出缓冲区
              onMouseEnter={() => handleOpen(open)} // 保持打开
              onMouseLeave={() => handleOpen(null)}
            >
               {/* 
                 使用 fixed 定位或者 w-screen absolute 定位来确保全宽。
                 这里为了防止左侧溢出，我们使用 fixed 定位，根据 header 高度动态调整 top。
                 或者使用 absolute + left-0 + w-screen 结合 relative parent (Nav or Header)。
                 
                 由于 Nav 组件是放在 Container 里的，直接 absolute w-screen 会有问题（相对于 Container）。
                 最佳实践是：Portal 或者使用 fixed。
                 为了简单且高性能，我们这里尝试 fixed + 居中布局。
               */}
               <motion.div
                 initial={{ opacity: 0, y: -10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.2, ease: "easeOut" }}
                 className="fixed left-0 right-0 z-50 w-full bg-transparent"
                 style={{ top: "var(--header-height, 80px)" }} // 假设 header 高度约为 80px，可调整
               >
                 {/* 
                    滑动内容容器 
                    我们使用 key={activeItem.label} 来触发 framer-motion 的 exit/enter 动画，实现横向滑动
                 */}
                 <div className="relative mx-auto max-w-screen-xl px-6">
                    <motion.div
                       key={activeItem.label}
                       initial={{ opacity: 0, x: direction * 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: direction * -20, position: "absolute", top: 0, left: 0, width: "100%" }} // exit absolute 防止布局跳动
                       transition={{ type: "tween", ease: "easeInOut", duration: 0.25 }}
                       className="bg-background border border-accent-12 shadow-xl rounded-sm overflow-hidden"
                    >
                       <div className="flex min-h-[280px]">
                          {/* 左侧：链接列表 */}
                          <div className="flex-1 p-8 md:p-10 bg-background">
                             <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-6">
                               Explore {activeItem.label}
                             </h3>
                             <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                {activeItem.panel.map((link) => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    className="group flex items-center gap-2 text-sm text-black hover:opacity-70 transition-opacity"
                                    onClick={() => setOpen(null)}
                                  >
                                    <span className="w-0 h-[1px] bg-black group-hover:w-3 transition-all duration-300"></span>
                                    {link.label}
                                  </Link>
                                ))}
                             </div>
                             
                             <div className="mt-10 pt-6 border-t border-black/10">
                                <Link href={activeItem.href} className="text-xs font-medium text-black uppercase tracking-wide border-b border-black pb-0.5 hover:opacity-70" onClick={() => setOpen(null)}>
                                  View All {activeItem.label}
                                </Link>
                             </div>
                          </div>

                          {/* 右侧：精选内容 / 图片 */}
                          {activeItem.featured && (
                            <div className="hidden md:flex w-1/3 lg:w-2/5 bg-zinc-50 relative overflow-hidden group">
                              {activeItem.featured.image && (
                                <div className="absolute inset-0">
                                   <img 
                                     src={activeItem.featured.image} 
                                     alt={activeItem.featured.title}
                                     className="h-full w-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                                   />
                                   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                                </div>
                              )}
                              
                              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white">
                                <h4 className="text-xl font-serif font-medium mb-1">{activeItem.featured.title}</h4>
                                {activeItem.featured.description && (
                                  <p className="text-sm text-white/90 line-clamp-2">{activeItem.featured.description}</p>
                                )}
                              </div>
                              
                              <Link href={activeItem.featured.href} className="absolute inset-0 z-10" aria-label={activeItem.featured.title} onClick={() => setOpen(null)} />
                            </div>
                          )}
                        </div>
                    </motion.div>
                 </div>
               </motion.div>
            </div>
          )}
        </AnimatePresence>
      )}

      
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
