import { Suspense } from "react";
import TheMaterialClient from "./TheMaterialClient";

export const dynamic = "force-dynamic";

export default function TheMaterialPage() {
  return (
    <Suspense fallback={null}>
      <TheMaterialClient />
    </Suspense>
  );
}


