import "server-only";
import { createClient } from "@sanity/client";
import groq from "groq";

const defaultProjectId = "gidffpzl";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || defaultProjectId;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-07-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
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

const productListQuery = groq`*[_type == "product" 
  && (!defined($gender) || gender == $gender) 
  && (!defined($category) || category == $category)
]{
  _id,
  title,
  slug,
  price,
  material,
  category,
  gender,
  "images": coalesce(images[]{ asset->{url} }, [])
} | order(_createdAt desc)[0...$limit]`;

const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0]{
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
    const docs = await sanityClient.fetch<ProductCardDoc[]>(productListQuery, { gender, category, limit });
    return docs || [];
  } catch {
    return [];
  }
}

export async function fetchProductBySlug(slug: string): Promise<ProductDetailDoc | null> {
  try {
    const doc = await sanityClient.fetch<ProductDetailDoc>(productBySlugQuery, { slug });
    return doc || null;
  } catch {
    return null;
  }
}

export async function fetchProductBySlugRobust(slug: string): Promise<ProductDetailDoc | null> {
  const doc = await fetchProductBySlug(slug);
  if (doc) return doc;
  try {
    // 再尝试一次，避免 Sanity CDN 短暂缓存 miss
    const fresh = await sanityClient.withConfig({ useCdn: false }).fetch<ProductDetailDoc>(productBySlugQuery, { slug });
    return fresh || null;
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

