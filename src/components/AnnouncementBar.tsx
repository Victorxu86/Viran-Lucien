\"use client\";

import { useEffect, useMemo, useRef, useState } from \"react\";
import Container from \"@/components/Container\";

const MESSAGES = [
  { text: \"免费30天退换\", href: \"/client-service/shipping-returns\" },
  { text: \"门店与线下体验\", href: \"/client-service/store-locator\" },
  { text: \"预约试衣/沟通\", href: \"/client-service/appointment\" },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const tickingRef = useRef(false);
  const secondSectionTop = useRef<number | null>(null);

  const prev = () => setIndex((i) => (i - 1 + MESSAGES.length) % MESSAGES.length);
  const next = () => setIndex((i) => (i + 1) % MESSAGES.length);

  // 计算第二板块的起始位置（仅首页存在）
  useEffect(() => {
    const el = document.getElementById(\"second-section\");
    secondSectionTop.current = el ? el.offsetTop : null;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        const top = secondSectionTop.current;
        if (typeof top === \"number\") {
          const threshold = top - 40; // 提前 40px 收起
          setCollapsed(window.scrollY >= threshold);
        } else {
          // 非首页：滚动超过 160 也收起
          setCollapsed(window.scrollY >= 160);
        }
        tickingRef.current = false;
      });
    };
    window.addEventListener(\"scroll\", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener(\"scroll\", onScroll);
  }, []);

  const current = useMemo(() => MESSAGES[index], [index]);

  return (
    <div
      className={`announce-bar ${collapsed ? \"is-collapsed\" : \"\"}`}
      style={{ borderColor: \"var(--accent-12)\", background: \"var(--accent-06)\" }}
    >
      <Container className=\"relative py-1 text-center text-xs\">
        <a className=\"inline-block underline-offset-2 hover:opacity-80\" href={current.href}>
          {current.text}
        </a>
        <button
          aria-label=\"Previous\"
          className=\"announce-arrow left\"
          onClick={prev}
        >
          ‹
        </button>
        <button
          aria-label=\"Next\"
          className=\"announce-arrow right\"
          onClick={next}
        >
          ›
        </button>
      </Container>
    </div>
  );
}


