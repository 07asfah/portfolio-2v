"use client";

import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

/** Bolded keyword — heavier weight + brighter text. Same K as the hero. */
function K({ children }: { children: React.ReactNode }) {
  return <strong className="font-bold text-[var(--text)]">{children}</strong>;
}

// Order is intentional: 9 items in a 2-col grid become
//  col1: Next.js, React, Vue, TypeScript, JavaScript   (frontend / language)
//  col2: Laravel, PHP, Python, SQL                     (backend / data)
const techStack = [
  "Next.js",
  "Laravel",
  "React",
  "PHP",
  "Vue",
  "Python",
  "TypeScript",
  "SQL",
  "JavaScript",
];

const timeline = [
  {
    year: "origin",
    title: "Physics → code → robotics",
    body: "Started in physics, then drifted into code and robotics. What kept me there was the question of how systems actually work — and how you keep them secure, from the code all the way up to the cloud.",
  },
  {
    year: "training",
    title: "ALX · Lions Geek · Coursera",
    body: "Certifications and courses across the stack — AI Career, Professional Foundations, Frontend and Backend at ALX, Full Stack Developer at Lions Geek, plus additional coursework on Coursera.",
  },
  {
    year: "now",
    title: "Cybersecurity engineering",
    body: "Still studying — currently going deeper into cybersecurity. Interested in how secure systems get designed, not just how vulnerabilities get patched.",
  },
];

export default function About() {
  return (
    <Section id="about">

      {/* Centered .about("me") title */}
      <Reveal>
        <h2 className="font-mono text-4xl md:text-6xl font-normal
                       text-center tracking-tight mb-20">
          <span className="text-[var(--text)]">.about</span>
          <span style={{ color: "rgba(0, 255, 100, 0.55)" }}>(&quot;</span>
          <span className="text-[var(--accent-green)]">me</span>
          <span style={{ color: "rgba(0, 255, 100, 0.55)" }}>&quot;)</span>
        </h2>
      </Reveal>

      {/* Bio — single centered column, no photo */}
      <div className="max-w-2xl mx-auto">

        <Reveal>
          <div className="space-y-6 mb-20">
            <p className="font-mono text-sm md:text-base
                          text-[var(--muted)] leading-relaxed">
              I came into software the long way. <K>Physics</K>{" "}
              was my main subject in school, but my curiosity for how
              systems actually work kept pulling me toward code — until
              what started as a hobby became something I couldn&apos;t
              put down.
            </p>

            <p className="font-mono text-sm md:text-base
                          text-[var(--muted)] leading-relaxed">
              I followed it. I started at <K>ALX</K> with the{" "}
              <K>AI Career</K> program, then <K>Professional Foundations</K>,
              and went on to earn both <K>Frontend</K> and <K>Backend</K>{" "}
              certifications. From there I earned my{" "}
              <K>Full Stack Developer</K> certification at <K>Lions Geek</K>{" "}
              — and I&apos;m now going deeper into{" "}
              <K>cybersecurity engineering</K>.
            </p>

            <p className="font-mono text-sm md:text-base
                          text-[var(--muted)] leading-relaxed">
              I&apos;m drawn to the seams of a system: how they hold, how
              they leak, and what it takes to make them solid. I care about{" "}
              <K>clean architecture</K>, <K>secure design</K>, and the
              small details most people skip.
            </p>
          </div>
        </Reveal>

        {/* Path — moved up, above the tech stack, centered like the bio */}
        <Reveal>
          <div className="mb-20">
            <h3 className="font-mono text-xs tracking-widest
                           text-[var(--accent-green)] uppercase mb-10">
              // path
            </h3>
            <div className="space-y-10">
              {timeline.map((entry) => (
                <div
                  key={entry.year}
                  className="grid md:grid-cols-[140px_1fr] gap-6
                             border-l border-[var(--border)] pl-6
                             md:border-l-0 md:pl-0"
                >
                  <p className="font-mono text-xs tracking-[3px]
                                text-[var(--accent-green)] uppercase pt-1">
                    / {entry.year}
                  </p>
                  <div>
                    <h4 className="font-mono text-lg md:text-xl
                                   text-[var(--text)] mb-3 font-normal">
                      {entry.title}
                    </h4>
                    <p className="font-mono text-sm md:text-base
                                  text-[var(--muted)] leading-relaxed">
                      {entry.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Tech stack list — last in the section */}
        <Reveal>
          <p className="font-mono text-sm md:text-base
                        text-[var(--muted)] leading-relaxed mb-6">
            I primarily use the following technologies, tools and
            libraries, but always open to pick up more:
          </p>
          <div className="border border-[var(--border)] p-6 md:p-8
                          bg-[rgba(255,255,255,0.01)]">
            <ul className="grid grid-cols-1 md:grid-cols-2
                           gap-y-3 gap-x-12">
              {techStack.map((tech) => (
                <li
                  key={tech}
                  className="flex items-center gap-3 font-mono text-sm
                             text-[var(--text)]"
                >
                  <span className="text-[var(--accent-green)]">▸</span>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

      </div>

    </Section>
  );
}
