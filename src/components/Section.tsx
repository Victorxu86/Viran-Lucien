import Container from "@/components/Container";

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export default function Section({
  title,
  description,
  children,
  className = "",
  id,
}: Props) {
  return (
    <section id={id} className={`section ${className}`}>
      <Container>
        {title ? <h2>{title}</h2> : null}
        {description ? <p className="mt-4 max-w-2xl">{description}</p> : null}
        <div className={title || description ? "mt-12" : ""}>{children}</div>
      </Container>
    </section>
  );
}


