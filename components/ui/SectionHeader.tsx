"use client";

import Reveal from "@/components/ui/Reveal";

type Props = {
  label: string;
  title: string;
  description?: string;
};

/** Inline header for sections on the single landing page. */
export default function SectionHeader({ label, title, description }: Props) {
  return (
    <div className="mb-16">
      <Reveal>
        <p className="font-mono text-[10px] tracking-[5px]
                      text-[var(--accent)] mb-6 uppercase">
          // {label}
        </p>
        <h2 className="text-3xl md:text-5xl font-light tracking-tight
                       text-[var(--text)] mb-6">
          {title}
        </h2>
        {description && (
          <p className="text-base text-[var(--muted)] max-w-xl leading-relaxed">
            {description}
          </p>
        )}
        <div className="w-12 h-px bg-[var(--border)] mt-10" />
      </Reveal>
    </div>
  );
}
