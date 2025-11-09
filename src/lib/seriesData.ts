export type Series = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  season: string;
  hero: string;
  gallery: string[];
  materials: string[];
};

export const SERIES: Series[] = [
  {
    slug: "monochrome-knit",
    title: "Monochrome Knit",
    subtitle: "单色针织 · 触感与廓形",
    description:
      "以精纺羊毛与羊绒为主导，通过紧密织造呈现温润触感与克制廓形。强调面料肌理与线条秩序，适合四季层搭。",
    season: "AW 24/25",
    hero: "/feature-2.svg",
    gallery: ["/feature-2.svg", "/feature-3.svg", "/feature-1.svg"],
    materials: ["Merino Wool", "Cashmere"],
  },
  {
    slug: "tailored-structure",
    title: "Tailored Structure",
    subtitle: "结构剪裁 · 轻量保型",
    description:
      "从经典男装结构出发，精简缝线与衬布，获得兼顾立体与舒适的穿着体验。线条克制，比例精密。",
    season: "AW 24/25",
    hero: "/feature-3.svg",
    gallery: ["/feature-3.svg", "/feature-1.svg", "/feature-2.svg"],
    materials: ["Egyptian Cotton", "Wool Blend"],
  },
  {
    slug: "outer-silhouette",
    title: "Outer Silhouette",
    subtitle: "外套轮廓 · 纯粹与力量",
    description:
      "强调外衣的体积与轮廓，使主体与留白形成呼应。采用双面呢与技术性面料，既保型又具韧性。",
    season: "AW 24/25",
    hero: "/feature-1.svg",
    gallery: ["/feature-1.svg", "/story-1.svg", "/feature-2.svg"],
    materials: ["Double-Face Wool", "Technical Fabric"],
  },
  {
    slug: "summer-linen",
    title: "Summer Linen",
    subtitle: "夏季亚麻 · 呼吸的织物",
    description:
      "采用高支纯亚麻与混纺，舒展的纹理与良好透气性，在夏季呈现自然褶皱的优雅状态。",
    season: "SS 25",
    hero: "/story-1.svg",
    gallery: ["/story-1.svg", "/feature-3.svg", "/feature-2.svg"],
    materials: ["Pure Linen", "Linen Cotton"],
  },
];

