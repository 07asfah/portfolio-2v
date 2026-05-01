import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

const channels = [
  { label: "email",  value: "ayman.dofus@gmail.com", href: "mailto:ayman.dofus@gmail.com" },
  { label: "github", value: "github.com/07asfah",    href: "https://github.com/07asfah"   },
];

export default function Contact() {
  return (
    <Section id="contact">
      <SectionHeader
        label="contact()"
        title="Let's talk."
        description="I read everything. Best for collaborations, security reviews, or hard architecture questions."
      />

      <Reveal>
        <ul className="border-t border-[var(--border)] max-w-2xl">
          {channels.map((c) => (
            <li
              key={c.label}
              className="border-b border-[var(--border)]"
            >
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-baseline justify-between py-6
                           group transition-colors"
              >
                <span className="font-mono text-[10px] tracking-[3px]
                                 text-[var(--muted)] uppercase">
                  .{c.label}
                </span>
                <span className="text-sm text-[var(--text)]
                                 group-hover:text-[var(--accent)]
                                 transition-colors">
                  {c.value}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
