import type { ReactNode } from "react";

type ResponsiveGridProps = {
  children: ReactNode;
  columns?: {
    base?: 1 | 2;
    md?: 2 | 3;
    lg?: 3 | 4;
  };
};

function resolveColumns(columns: ResponsiveGridProps["columns"]): string {
  const base = columns?.base ?? 1;
  const md = columns?.md ?? 2;
  const lg = columns?.lg ?? 3;

  const map = {
    base: base === 2 ? "grid-cols-2" : "grid-cols-1",
    md: md === 3 ? "md:grid-cols-3" : "md:grid-cols-2",
    lg: lg === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
  };

  return `${map.base} ${map.md} ${map.lg}`;
}

export function ResponsiveGrid({ children, columns }: ResponsiveGridProps) {
  return <div className={`grid gap-4 md:gap-6 ${resolveColumns(columns)}`}>{children}</div>;
}
