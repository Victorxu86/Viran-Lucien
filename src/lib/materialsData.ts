export type Material = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  properties: string[];
  care: string[];
  image: string;
};

export const MATERIALS: Material[] = [
  {
    id: "double-faced-wool",
    name: "Double-faced Wool",
    subtitle: "双面羊毛 · 轻盈保型",
    description:
      "两层织物结构无需里衬即可获得立体轮廓与顺滑触感，兼顾保暖与轻量，非常适合外套与大衣。",
    properties: ["双层结构，立体保型", "触感顺滑、穿着轻盈", "适合外套、披肩与大衣"],
    care: ["建议干洗", "避免高温熨烫，低温垫布蒸汽处理"],
    image: "/feature-1.svg",
  },
  {
    id: "cashmere",
    name: "Cashmere",
    subtitle: "羊绒 · 细腻恒温",
    description:
      "源自高寒地区的珍稀纤维，触感柔软且具有出色的恒温性，是贴肤层与针织的理想选择。",
    properties: ["纤维细腻、手感柔软", "优良的保温与恒温性", "适合贴肤层与高端针织"],
    care: ["建议干洗或温和手洗", "平铺阴干，避免悬挂变形"],
    image: "/feature-2.svg",
  },
  {
    id: "tencel-cotton-linen",
    name: "TENCEL Cotton/Linen Blend",
    subtitle: "天丝 + 棉麻混纺 · 清透垂坠",
    description:
      "将天丝的丝滑垂坠与棉麻的挺括透气结合，呈现自然肌理与清透触感，适合春夏多场景穿着。",
    properties: ["丝滑垂坠与自然肌理兼具", "透气清爽，适合春夏", "抗皱性较好，日常易打理"],
    care: ["冷水清洗，避免拧绞", "低温垫布熨烫，翻面晾晒"],
    image: "/feature-3.svg",
  },
  {
    id: "matte-high-density-stretch",
    name: "Matte High-density Stretch",
    subtitle: "哑光四面弹高支纱 · 克制运动感",
    description:
      "高密织造的四面弹纱线，表面哑光，具有良好回弹与支撑，满足移动舒适同时保持克制审美。",
    properties: ["四面弹力，活动自由", "哑光质感，低调稳重", "版型保持佳，抗起皱"],
    care: ["机洗可行，建议洗衣袋保护", "低温熨烫，避免长时烘干"],
    image: "/story-1.svg",
  },
  {
    id: "supima-high-count",
    name: "Supima Cotton (High Count)",
    subtitle: "高支数 Supima 棉 · 细腻光泽",
    description:
      "超长绒棉纤维带来自然细腻的光泽与更高的强度，高支织造手感更顺滑，适合衬衫与贴肤层。",
    properties: ["超长绒、高强度", "高支织造，触感顺滑", "自然柔和光泽"],
    care: ["与近色清洗，避免染色", "中温熨烫，悬挂存放"],
    image: "/feature-2.svg",
  },
];

