import type { ReactNode } from "react";

type MdxContentProps = {
  children: ReactNode;
};

export function MdxContent({ children }: MdxContentProps) {
  return <div className="prose prose-slate max-w-none dark:prose-invert">{children}</div>;
}
