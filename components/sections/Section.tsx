import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
  id?: string;
  className?: string;
};

export function Section({ title, children, id, className = "" }: SectionProps) {
  return (
    <section className={`rounded-2xl border border-border/35 bg-card/60 p-6 md:p-8 ${className}`} id={id}>
      <h2 className="font-serif text-3xl font-medium">{title}</h2>
      <div className="prose mt-5 max-w-none">{children}</div>
    </section>
  );
}
