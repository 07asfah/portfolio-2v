"use client";

import Reveal from "@/components/ui/Reveal";

const EMAIL = "moussaid.hafsa8@gmail.com";

const MailIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative px-8 md:px-20 py-24 md:py-32 scroll-mt-24"
    >
      <div className="max-w-3xl mx-auto text-center">

        <Reveal>
          <h2 className="font-mono text-4xl md:text-6xl font-normal
                         tracking-tight mb-10">
            <span className="text-[var(--text)]">.contact</span>
            <span style={{ color: "rgba(0, 255, 100, 0.55)" }}>()</span>
          </h2>
        </Reveal>

        <Reveal>
          <p className="font-mono text-base md:text-lg text-[var(--muted)]
                        leading-relaxed mb-12 max-w-2xl mx-auto">
            Always eager for new challenges and opportunities to grow.
            Have a project or idea I could help with? Reach out via the
            contact button below or through my social links.
          </p>
        </Reveal>

        <Reveal>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-3
                       font-mono text-base
                       border border-[var(--accent-green)]
                       text-[var(--accent-green)]
                       px-7 py-4 rounded
                       hover:bg-[rgba(0,255,100,0.1)]
                       transition-colors"
          >
            <MailIcon size={18} />
            Say hello!
          </a>
        </Reveal>

      </div>
    </section>
  );
}
