import "server-only";
import { createClient } from "next-sanity";
import groq from "groq";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-07-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
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


