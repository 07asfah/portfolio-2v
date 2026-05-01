import type { ReactNode } from "react";

type Props = {
  id: string;
  children: ReactNode;
};

/**
 * Section wrapper for the single landing page.
 * scroll-mt-24 leaves room for the fixed navbar when anchor-scrolled.
 */
export default function Section({ id, children }: Props) {
  return (
    <section
      id={id}
      className="relative px-8 md:px-20 py-24 md:py-32 scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto">{children}</div>
    </section>
  );
}
