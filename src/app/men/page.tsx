import { Suspense } from "react";
import MenClient from "./MenClient";

export const dynamic = "force-dynamic";

export default function MenPage() {
  return (
    <Suspense fallback={null}>
      <MenClient />
    </Suspense>
  );
}


