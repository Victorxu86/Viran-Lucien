import Container from "@/components/Container";

export default function Footer() {
  return (
    <footer
      className="border-t py-10 text-center text-sm text-zinc-500"
      style={{ borderColor: "var(--accent-12)" }}
    >
      <Container>
        © {new Date().getFullYear()} Viran Lucien. All rights reserved.
      </Container>
    </footer>
  );
}


