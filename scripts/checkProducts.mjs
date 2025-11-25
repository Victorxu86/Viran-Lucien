import { createClient } from "@sanity/client";

const useCdn = process.argv.includes("--cdn");

const client = createClient({
  projectId: "gidffpzl",
  dataset: "production",
  apiVersion: "2024-07-01",
  useCdn,
});

async function main() {
  const men = await client.fetch(`*[_type == "product" && gender == "men"]{title, category, slug}`);
  const women = await client.fetch(`*[_type == "product" && gender == "women"]{title, category, slug}`);
  console.log("men", men);
  console.log("women", women);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


