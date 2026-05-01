import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

const principles = [
  {
    label: "01",
    quote: "The strongest layer wins.",
    body: "A constraint that lives in the database schema beats a check that lives in a controller. A type that can't represent the bad state beats a runtime guard. I push the rule to the layer that can't be bypassed.",
  },
  {
    label: "02",
    quote: "Validate at the boundary, trust at the core.",
    body: "Every request, every param, every query string gets validated at the API edge. The handler receives data it can trust. Trust ends at the system boundary — never inside it.",
  },
  {
    label: "03",
    quote: "Boring code beats clever code.",
    body: "I write code the next person — including future-me at 3am — can read without thinking twice. Small functions, named branches, no nested ternaries. The cleverness belongs in the architecture, not the syntax.",
  },
  {
    label: "04",
    quote: "If you can't see it in production, it isn't shipped.",
    body: "Logs and metrics aren't optional. They're how you prove the system works — and the only thing you have when something breaks. I treat them as part of the feature, not the afterthought.",
  },
];

export default function Engineering() {
  return (
    <Section id="engineering">

      {/* Centered .engineering() title — matches the .about("me") style */}
      <Reveal>
        <h2 className="font-mono text-4xl md:text-6xl font-normal
                       text-center tracking-tight mb-20">
          <span className="text-[var(--text)]">.engineering</span>
          <span style={{ color: "rgba(0, 255, 100, 0.55)" }}>()</span>
        </h2>
      </Reveal>

      {/* Principles — wider centered column with generous spacing */}
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <h3 className="font-mono text-xs tracking-widest
                         text-[var(--accent-green)] uppercase mb-16">
            // principles
          </h3>

          <div className="space-y-24">
            {principles.map((p) => (
              <div key={p.label}>
                <p className="font-mono text-xs tracking-[3px]
                              text-[var(--accent-green)] uppercase mb-6">
                  / {p.label}
                </p>
                <p className="font-mono text-lg md:text-xl
                              text-[var(--text)] mb-6 leading-snug">
                  &ldquo;{p.quote}&rdquo;
                </p>
                <p className="font-mono text-sm md:text-base
                              text-[var(--muted)] leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

    </Section>
  );
}
