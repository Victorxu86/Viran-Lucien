export type MaterialInfo = {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  properties: string[];
  care: string[];
  hero: string;
  swatches: string[];
};

export const MATERIALS: MaterialInfo[] = [
  {
    slug: "double-faced-wool",
    name: "Double-faced Wool",
    subtitle: "双面羊毛 · 立体与保型",
    description:
      "双层织造结构，外内一致的肌理与色感。轻量却保型，适合大衣与外套廓形，穿着时保持线条的克制与力量。",
    properties: ["双层织造", "轻量保暖", "良好垂坠", "利于立体剪裁"],
    care: ["悬挂通风晾置", "避免长期折叠", "干洗为宜"],
    hero: "/feature-1.svg",
    swatches: ["/feature-1.svg", "/feature-2.svg"],
  },
  {
    slug: "cashmere",
    name: "Cashmere",
    subtitle: "羊绒 · 细腻与温润",
    description:
      "精选绒纤维，触感细腻轻盈，保暖性极佳。适宜近身层穿着，呈现被自然拥抱的温度与柔和。",
    properties: ["极佳保暖", "轻薄细腻", "亲肤不刺激"],
    care: ["轻柔手洗或干洗", "平铺阴干", "存放防虫袋"],
    hero: "/feature-2.svg",
    swatches: ["/feature-2.svg", "/feature-3.svg"],
  },
  {
    slug: "tencel-cotton-linen",
    name: "TENCEL Cotton/Linen Blend",
    subtitle: "天丝 + 棉麻混纺 · 透气与柔顺",
    description:
      "以天丝的丝滑触感与棉麻的自然肌理结合，兼顾垂坠、透气与弹性回弹，适合夏季与贴身层。",
    properties: ["良好透气", "柔顺垂坠", "天然肌理"],
    care: ["冷水轻柔手洗", "低温熨烫", "避免日晒"],
    hero: "/story-1.svg",
    swatches: ["/feature-3.svg", "/feature-2.svg"],
  },
  {
    slug: "matte-high-density-stretch",
    name: "Matte High-density Stretch",
    subtitle: "哑光四面弹高支纱 · 稳定与弹性",
    description:
      "高密度织造配合四面弹，表面哑光，兼顾结构稳定与贴身的弹性反馈，适用于贴体与运动风廓形。",
    properties: ["四面弹力", "表面哑光", "不易变形"],
    care: ["机洗请使用洗袋", "低温烘干或平铺", "避免高温熨烫"],
    hero: "/feature-3.svg",
    swatches: ["/feature-1.svg", "/feature-2.svg"],
  },
  {
    slug: "supima-cotton",
    name: "High-count Supima Cotton",
    subtitle: "高支数 Supima 棉 · 细致与耐穿",
    description:
      "更长更细的纤维带来更高的纱支与更致密的织物，触感细致、耐穿耐洗，适合衬衫与贴身层。",
    properties: ["高支高密", "耐穿耐洗", "细腻亲肤"],
    care: ["冷水机洗", "低温烘干", "及时整理与悬挂"],
    hero: "/feature-2.svg",
    swatches: ["/feature-2.svg", "/feature-1.svg"],
  },
];

