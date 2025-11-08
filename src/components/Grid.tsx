type Props = {
  children: React.ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
};

export default function Grid({ children, cols = 3, className = "" }: Props) {
  const base =
    cols === 4
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      : cols === 2
      ? "grid grid-cols-1 sm:grid-cols-2 gap-8"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8";
  return <div className={`${base} ${className}`}>{children}</div>;
}


