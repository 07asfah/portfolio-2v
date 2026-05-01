"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import type { Project } from "@/types/project";
import ProjectModal from "@/components/sections/ProjectModal";

// ──────────────────────────────────────────────────────────────
// Icons
// ──────────────────────────────────────────────────────────────
const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.7"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const ExternalIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.7"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M15 3h6v6" />
    <path d="M10 14L21 3" />
    <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
  </svg>
);

const ArrowIcon = ({ size = 12 }: { size?: number }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M13 5l7 7-7 7" />
  </svg>
);

// ──────────────────────────────────────────────────────────────
// Pill-shaped tech tag
// ──────────────────────────────────────────────────────────────
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-mono text-[10px] tracking-wider
                 border border-[var(--border)] rounded
                 px-2 py-1 text-[var(--text)]
                 bg-[rgba(255,255,255,0.02)]"
    >
      {children}
    </span>
  );
}

// ──────────────────────────────────────────────────────────────
// Project card
// ──────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  const isClickable = !!project.rich;

  return (
    <article
      onClick={isClickable ? () => onOpen(project) : undefined}
      className={`group flex flex-col h-full
                  border border-[var(--border)] rounded-xl
                  bg-[rgba(255,255,255,0.015)]
                  p-6 transition-colors
                  hover:border-[rgba(0,255,100,0.4)]
                  hover:bg-[rgba(0,255,100,0.025)]
                  ${isClickable ? "cursor-pointer" : ""}`}
    >
      {project.screenshot && (
        <div
          className="aspect-video bg-[#141417] mb-5
                     rounded overflow-hidden
                     border border-[var(--border)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.screenshot}
            alt={project.name}
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-3 mb-5">
        {project.badge ? (
          <span
            className="font-mono text-[9px] tracking-[2px]
                       text-[var(--accent-green)]
                       border border-[rgba(0,255,100,0.35)]
                       bg-[rgba(0,255,100,0.06)]
                       px-2 py-1 rounded uppercase"
          >
            {project.badge}
          </span>
        ) : (
          <span />
        )}

        <div
          className="flex items-center gap-3 text-[var(--muted)]"
          // Stop click propagation so icon clicks don't open modal
          onClick={(e) => e.stopPropagation()}
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-[var(--accent-green)] transition-colors"
            >
              <GithubIcon />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live demo"
              className="hover:text-[var(--accent-green)] transition-colors"
            >
              <ExternalIcon />
            </a>
          )}
        </div>
      </div>

      <h3 className="font-mono text-base md:text-lg font-bold
                     text-[var(--text)] mb-3 leading-tight">
        {project.name}
      </h3>

      <p className="font-mono text-sm text-[var(--muted)]
                    leading-relaxed mb-6 flex-1">
        {project.tagline}
      </p>

      {project.stack.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.slice(0, 6).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      )}

      {/* Read more affordance for rich cards */}
      {isClickable && (
        <div className="flex items-center gap-2
                        font-mono text-[10px] tracking-[2px]
                        text-[var(--accent-green)] uppercase
                        mt-auto pt-2
                        group-hover:gap-3 transition-all">
          read more
          <ArrowIcon />
        </div>
      )}
    </article>
  );
}

// ──────────────────────────────────────────────────────────────
// Projects section
// ──────────────────────────────────────────────────────────────
export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative px-8 md:px-20 py-24 md:py-32 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">

        {/* Centered title + subtitle */}
        <Reveal>
          <h2 className="font-mono text-4xl md:text-6xl font-normal
                         text-center tracking-tight mb-4">
            <span className="text-[var(--text)]">.projects</span>
            <span style={{ color: "rgba(0, 255, 100, 0.55)" }}>()</span>
          </h2>
          <p className="font-mono text-sm text-center text-[var(--muted)] mb-16">
            Here are some of my projects
          </p>
        </Reveal>

        {/* Card grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5
                        auto-rows-fr">
          {projects.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={i * 0.05}
              className="h-full"
            >
              <ProjectCard project={project} onOpen={setSelected} />
            </Reveal>
          ))}
        </div>

      </div>

      {/* Deep-dive modal */}
      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
