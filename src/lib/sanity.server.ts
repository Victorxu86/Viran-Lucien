import "server-only";
import { createClient } from "@sanity/client";
import groq from "groq";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gidffpzl";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-07-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export type MaterialDoc = {
  _id: string;
  id?: string;
  name: string;
  subtitle?: string;
  description?: string;
  properties?: string[];
  care?: string[];
  image?: { url?: string } | string;
};

const materialsQuery = groq`*[_type == "material"]{
  _id,
  "id": coalesce(id, _id),
  name,
  subtitle,
  description,
  properties,
  care,
  "image": {"url": coalesce(image.asset->url, imageUrl)}
} | order(order asc)`;

export async function fetchMaterials(): Promise<MaterialDoc[]> {
  try {
    const docs = await sanityClient.fetch<MaterialDoc[]>(materialsQuery);
    return docs || [];
  } catch {
    return [];
  }
}

// ========== Product ==========
export type ProductCardDoc = {
  _id: string;
  title: string;
  slug?: { current: string };
  price?: number;
  material?: string;
  category?: string;
  gender?: "men" | "women" | "unisex";
  images?: Array<{ asset?: { url?: string } }>;
};

export type ProductDetailDoc = ProductCardDoc & {
  craftsmanship?: string[];
  description?: string;
  sizes?: Array<{ label: string; available?: boolean }>;
  related?: Array<{
    title: string;
    slug?: { current: string };
    price?: number;
    material?: string;
    images?: Array<{ asset?: { url?: string } }>;
    category?: string;
    gender?: string;
  }>;
};

const productListQuery = groq`*[_type == "product"]{
  _id,
  title,
  slug,
  price,
  material,
  category,
  gender,
  "images": coalesce(images[]{ asset->{url} }, [])
} | order(_createdAt desc)[0...$limit]`;

const productBySlugQuery = groq`*[_type == "product" && lower(slug.current) == lower($slug)][0]{
  _id,
  title,
  slug,
  price,
  material,
  category,
  gender,
  "images": coalesce(images[]{ asset->{url} }, []),
  craftsmanship,
  description,
  "sizes": coalesce(sizes[], []),
  "related": related[]->{
    title, slug, price, material, category, gender,
    "images": coalesce(images[]{ asset->{url} }, [])
  }
}`;

export async function fetchProducts(params: { gender?: "men" | "women"; category?: string; limit?: number } = {}): Promise<ProductCardDoc[]> {
  try {
    const { gender, category, limit = 40 } = params;
    const docs = await sanityClient.fetch<ProductCardDoc[]>(productListQuery, { limit });
    let list = docs || [];
    if (gender) {
      list = list.filter((d) => (d.gender || "").toLowerCase() === gender);
    }
    if (category) {
      const cat = category.toLowerCase();
      list = list.filter((d) => (d.category || "").toLowerCase() === cat);
    }
    return list;
  } catch {
    return [];
  }
}

export async function fetchProductBySlug(slug: string): Promise<ProductDetailDoc | null> {
  try {
    const normalized = decodeURIComponent(String(slug || ""))
      .trim()
      .replace(/^\/+|\/+$/g, "");
    const doc = await sanityClient.fetch<ProductDetailDoc>(productBySlugQuery, { slug: normalized });
    return doc || null;
  } catch {
    return null;
  }
}

// 兜底：当直接按 slug 查询失败时，先拉列表再匹配 slug（忽略大小写），再回查详情
export async function fetchProductBySlugRobust(slug: string): Promise<ProductDetailDoc | null> {
  const primary = await fetchProductBySlug(slug);
  if (primary) return primary;
  try {
    const all = await sanityClient.fetch<ProductCardDoc[]>(productListQuery, { limit: 200 });
    const normalized = decodeURIComponent(String(slug || "")).trim().replace(/^\/+|\/+$/g, "");
    const hit = (all || []).find((p) => (p.slug?.current || "").toLowerCase() === normalized.toLowerCase());
    if (!hit?.slug?.current) return null;
    return await fetchProductBySlug(hit.slug.current);
  } catch {
    return null;
  }
}

// ========== Series ==========
export type SeriesDoc = {
  _id: string;
  title: string;
  slug?: { current: string };
  summary?: string;
  hero?: { asset?: { url?: string } };
  cover?: { asset?: { url?: string } };
};

const seriesQuery = groq`*[_type == "series"]{
  _id, title, slug, summary,
  "hero": hero{ asset->{url} },
  "cover": cover{ asset->{url} }
} | order(order asc, _createdAt desc)`;

export async function fetchSeries(): Promise<SeriesDoc[]> {
  try {
    const docs = await sanityClient.fetch<SeriesDoc[]>(seriesQuery);
    return docs || [];
  } catch {
    return [];
  }
}

// ========== Home ==========
export type HomeDoc = {
  heroVideoUrl?: string;
  heroImage?: { asset?: { url?: string } };
  featuredProducts?: Array<{
    _id: string;
    title: string;
    slug?: { current: string };
    price?: number;
    material?: string;
    images?: Array<{ asset?: { url?: string } }>;
  }>;
};

const homeQuery = groq`*[_type == "home"][0]{
  heroVideoUrl,
  "heroImage": heroImage{ asset->{url} },
  "featuredProducts": featuredProducts[]->{
    _id, title, slug, price, material,
    "images": coalesce(images[]{ asset->{url} }, [])
  }
}`;

export async function fetchHome(): Promise<HomeDoc | null> {
  try {
    const doc = await sanityClient.fetch<HomeDoc>(homeQuery);
    return doc || null;
  } catch {
    return null;
  }
}

