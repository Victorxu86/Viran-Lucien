import { Suspense } from "react";
import CollectionClient from "./CollectionClient";

export const dynamic = "force-dynamic";

export default function CollectionPage() {
  return (
    <Suspense fallback={null}>
      <CollectionClient />
    </Suspense>
  );
}


