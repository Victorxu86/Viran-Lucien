import { Suspense } from "react";
import WomenClient from "./WomenClient";

export const dynamic = "force-dynamic";

export default function WomenPage() {
  return (
    <Suspense fallback={null}>
      <WomenClient />
    </Suspense>
  );
}


