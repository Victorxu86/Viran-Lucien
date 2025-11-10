import { Suspense } from "react";
import TheMaterialClient from "./TheMaterialClient";
import { fetchMaterials } from "@/lib/sanity.server";
import { MATERIALS } from "@/lib/materialsData";

export const dynamic = "force-dynamic";

export default async function TheMaterialPage() {
  const materialsFromCMS = await fetchMaterials();
  const mapped =
    materialsFromCMS.length > 0
      ? materialsFromCMS.map((m) => ({
          id: m.id || m._id,
          name: m.name,
          subtitle: m.subtitle || "",
          description: m.description || "",
          properties: m.properties || [],
          care: m.care || [],
          image: typeof m.image === "string" ? m.image : m.image?.url || "/feature-1.svg",
        }))
      : MATERIALS;
  return (
    <Suspense fallback={null}>
      <TheMaterialClient initialMaterials={mapped} />
    </Suspense>
  );
}


