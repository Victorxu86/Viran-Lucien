export type ProductDetail = {
  slug: string;
  title: string;
  material: string;
  price: number;
  images: string[];
  highlights: string[];
  description: string;
  sizes: Array<{ label: string; available: boolean }>;
  shippingInfo: string;
  returnsInfo: string;
  related: Array<{
    slug: string;
    title: string;
    material: string;
    price: number;
    image: string;
  }>;
};

const BASES = [
  {
    baseSlug: "single-color-knit",
    title: "Single-Color Knit",
    material: "Merino Wool",
    price: 2980,
  },
  {
    baseSlug: "structured-shirt",
    title: "Structured Shirt",
    material: "Egyptian Cotton",
    price: 1980,
  },
  {
    baseSlug: "minimal-coat",
    title: "Minimal Coat",
    material: "Double-Face Wool",
    price: 5980,
  },
  {
    baseSlug: "tailored-pants",
    title: "Tailored Pants",
    material: "Wool Blend",
    price: 2280,
  },
];

function pickImages(idx: number): string[] {
  const imgs = ["/feature-1.svg", "/feature-2.svg", "/feature-3.svg", "/story-1.svg"];
  return [imgs[idx % imgs.length], imgs[(idx + 1) % imgs.length]];
}

export function getProductBySlug(slug: string): ProductDetail {
  // slug 可能为 baseSlug 或 baseSlug-idx
  const match = slug.match(/^(.*?)(?:-(\d+))?$/);
  const baseSlug = match?.[1] || slug;
  const idx = match?.[2] ? Number(match![2]) : 1;
  const base = BASES.find((b) => b.baseSlug === baseSlug) || BASES[idx % BASES.length];

  const price = base.price + ((idx % 7) * 50);
  const images = pickImages(idx);

  const sizes = ["XS", "S", "M", "L", "XL"].map((s, i) => ({
    label: s,
    available: (idx + i) % 4 !== 0, // 简单的可用性模拟
  }));

  const related = BASES.map((b, i) => ({
    slug: `${b.baseSlug}-${(idx + i + 1) % 9 || 1}`,
    title: b.title,
    material: b.material,
    price: b.price + ((idx + i) % 5) * 60,
    image: pickImages(idx + i)[0],
  }));

  return {
    slug,
    title: `${base.title} ${idx}`,
    material: base.material,
    price,
    images,
    highlights: [
      "精纺纱线，肌理细腻亲肤",
      "克制廓形，强调结构线条",
      "轻量保型，适合四季层搭",
    ],
    description:
      "以材质为核心的单色表达，呈现安静、自信的现代气质。面料与工艺经过反复打磨，兼顾触感、垂坠与耐久。",
    sizes,
    shippingInfo: "订单 1–2 个工作日内处理；标准配送 3–5 天送达。",
    returnsInfo: "支持 30 天内退换，保持商品完整与吊牌齐全。",
    related,
  };
}


