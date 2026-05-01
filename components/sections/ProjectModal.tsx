"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { Project } from "@/types/project";

// ──────────────────────────────────────────────────────────────
// Icons
// ──────────────────────────────────────────────────────────────
const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.7"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const ExternalIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.7"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6" />
    <path d="M10 14L21 3" />
    <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
  </svg>
);

const CloseIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.7"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

// ──────────────────────────────────────────────────────────────
// Reusable bits
// ──────────────────────────────────────────────────────────────
function SubSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h4 className="font-mono text-[11px] tracking-widest
                     text-[var(--accent-green)] uppercase mb-5">
        // {label}
      </h4>
      {children}
    </section>
  );
}

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

function methodColor(method: string) {
  const m = method.toUpperCase();
  if (m === "GET")    return "text-[#3b82f6]";   // blue
  if (m === "POST")   return "text-[#00ff64]";   // green
  if (m === "PUT" || m === "PATCH") return "text-[#fbbf24]"; // amber
  if (m === "DELETE") return "text-[#ef4444]";   // red
  return "text-[var(--muted)]";
}

// ──────────────────────────────────────────────────────────────
// Modal
// ──────────────────────────────────────────────────────────────
type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  // Lock body scroll, hide the navbar (via .modal-open class), handle Escape
  useEffect(() => {
    if (!project) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200]
                     bg-[rgba(10,10,12,0.85)] backdrop-blur-sm
                     flex items-start justify-center
                     p-4 md:p-8 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-5xl
                       border border-[var(--border)] rounded-xl
                       bg-[#0f0f12]
                       my-4 md:my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header (no longer sticky) */}
            <div className="flex items-start justify-between
                            gap-4 p-6 md:p-8
                            border-b border-[var(--border)]
                            rounded-t-xl">
              <div>
                {project.badge && (
                  <span className="inline-block font-mono text-[9px] tracking-[2px]
                                   text-[var(--accent-green)]
                                   border border-[rgba(0,255,100,0.35)]
                                   bg-[rgba(0,255,100,0.06)]
                                   px-2 py-1 rounded uppercase mb-3">
                    {project.badge}
                  </span>
                )}
                <h3 className="font-mono text-2xl md:text-3xl font-bold
                               text-[var(--text)] leading-tight">
                  {project.name}
                </h3>
                <p className="font-mono text-[11px] text-[var(--muted)]
                              tracking-wider mt-2">
                  {project.year} · {project.role}
                </p>
              </div>

              <div className="flex items-center gap-3 text-[var(--muted)] pt-2">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                     aria-label="GitHub"
                     className="hover:text-[var(--accent-green)] transition-colors">
                    <GithubIcon size={20} />
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer"
                     aria-label="Live demo"
                     className="hover:text-[var(--accent-green)] transition-colors">
                    <ExternalIcon size={20} />
                  </a>
                )}
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="hover:text-[var(--accent-green)] transition-colors
                             ml-2 p-1"
                >
                  <CloseIcon size={22} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 md:p-10">

              {/* Tagline / elevator pitch */}
              <p className="font-mono text-base md:text-lg text-[var(--text)]
                            leading-relaxed mb-10 border-l-2
                            border-[var(--accent-green)] pl-5">
                {project.tagline}
              </p>

              {/* Stats grid */}
              {project.stats && project.stats.length > 0 && (
                <SubSection label="at a glance">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {project.stats.map((s) => (
                      <div
                        key={s.label}
                        className="border border-[var(--border)] rounded-lg
                                   p-5 bg-[rgba(255,255,255,0.015)]"
                      >
                        <p className="font-mono text-2xl md:text-3xl
                                      text-[var(--accent-green)] font-bold mb-1">
                          {s.value}
                        </p>
                        <p className="font-mono text-[10px] text-[var(--muted)]
                                      tracking-widest uppercase">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </SubSection>
              )}

              {/* Description (multiple paragraphs) */}
              {project.description && project.description.length > 0 && (
                <SubSection label="overview">
                  <div className="space-y-4">
                    {project.description.map((p, i) => (
                      <p key={i} className="font-mono text-sm md:text-base
                                            text-[var(--muted)]
                                            leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </SubSection>
              )}

              {/* Architecture */}
              {project.architecture && (
                <SubSection label="architecture">
                  <pre className="font-mono text-[11px] text-[var(--muted)]
                                  border border-[var(--border)] p-6
                                  overflow-x-auto leading-relaxed
                                  bg-[rgba(255,255,255,0.02)] rounded">
{project.architecture}
                  </pre>
                </SubSection>
              )}

              {/* Tech stack grouped */}
              {project.techStack && project.techStack.length > 0 && (
                <SubSection label="tech stack">
                  <div className="space-y-5">
                    {project.techStack.map((g) => (
                      <div key={g.category}>
                        <p className="font-mono text-[11px] tracking-wider
                                      text-[var(--text)] mb-3">
                          // {g.category}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {g.items.map((t) => (
                            <Tag key={t}>{t}</Tag>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </SubSection>
              )}

              {/* Database schema */}
              {project.dbModels && project.dbModels.length > 0 && (
                <SubSection label="database schema">
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.dbModels.map((d) => (
                      <div
                        key={d.domain}
                        className="border border-[var(--border)] rounded-lg
                                   p-4 bg-[rgba(255,255,255,0.015)]"
                      >
                        <p className="font-mono text-[11px] tracking-wider
                                      text-[var(--accent-green)] mb-3 uppercase">
                          {d.domain}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {d.models.map((m) => (
                            <Tag key={m}>{m}</Tag>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </SubSection>
              )}

              {/* API endpoints */}
              {project.apis && project.apis.length > 0 && (
                <SubSection label="api endpoints">
                  <div className="border border-[var(--border)] rounded-lg
                                  divide-y divide-[var(--border)]
                                  bg-[rgba(255,255,255,0.015)] overflow-hidden">
                    {project.apis.map((a, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 px-4 py-3
                                   font-mono text-xs"
                      >
                        <span className={`${methodColor(a.method)} font-bold w-12 shrink-0`}>
                          {a.method.toUpperCase()}
                        </span>
                        <span className="text-[var(--text)] flex-1 truncate">
                          {a.path}
                        </span>
                        {a.description && (
                          <span className="text-[var(--muted)] hidden md:inline truncate">
                            {a.description}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </SubSection>
              )}

              {/* How it works */}
              {project.howItWorks && (
                <SubSection label="how it works">
                  <p className="font-mono text-sm md:text-base text-[var(--muted)]
                                leading-relaxed">
                    {project.howItWorks}
                  </p>
                </SubSection>
              )}

              {/* Customer journey / end-to-end flow */}
              {project.journey && project.journey.length > 0 && (
                <SubSection label="end-to-end flow">
                  <div className="space-y-5">
                    {project.journey.map((j, i) => (
                      <div
                        key={j.title}
                        className="grid grid-cols-[40px_1fr] gap-4 items-start"
                      >
                        <span className="font-mono text-xs
                                         text-[var(--accent-green)]
                                         border border-[rgba(0,255,100,0.35)]
                                         rounded w-9 h-9 flex items-center
                                         justify-center font-bold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h5 className="font-mono text-sm md:text-base
                                         text-[var(--text)] font-bold mb-1">
                            {j.title}
                          </h5>
                          <p className="font-mono text-sm text-[var(--muted)]
                                        leading-relaxed">
                            {j.body}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </SubSection>
              )}

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <SubSection label="features">
                  <div className="space-y-6">
                    {project.features.map((f) => (
                      <div key={f.title}>
                        <h5 className="font-mono text-sm md:text-base
                                       text-[var(--text)] font-bold mb-2">
                          {f.title}
                        </h5>
                        <p className="font-mono text-sm text-[var(--muted)]
                                      leading-relaxed">
                          {f.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </SubSection>
              )}

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <SubSection label="why this isn't a crud demo">
                  <ul className="space-y-3">
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="font-mono text-sm text-[var(--muted)]
                                   leading-relaxed flex gap-3"
                      >
                        <span className="text-[var(--accent-green)] shrink-0">›</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </SubSection>
              )}

              {/* Decisions */}
              {project.decisions.length > 0 && (
                <SubSection label="key decisions">
                  <div className="space-y-6">
                    {project.decisions.map((d) => (
                      <div key={d.title}>
                        <h5 className="font-mono text-sm md:text-base
                                       text-[var(--text)] font-bold mb-2">
                          {d.title}
                        </h5>
                        <p className="font-mono text-sm text-[var(--muted)]
                                      leading-relaxed">
                          {d.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </SubSection>
              )}

              {/* Security measures */}
              {project.security.length > 0 && (
                <SubSection label="security measures">
                  <ul className="space-y-3">
                    {project.security.map((s) => (
                      <li
                        key={s}
                        className="font-mono text-sm text-[var(--muted)]
                                   leading-relaxed flex gap-3"
                      >
                        <span className="text-[var(--accent-green)] shrink-0">›</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </SubSection>
              )}

              {/* Security debt — honest "next steps" */}
              {project.securityDebt && project.securityDebt.length > 0 && (
                <SubSection label="next steps · known debt">
                  <ul className="space-y-3">
                    {project.securityDebt.map((s) => (
                      <li
                        key={s}
                        className="font-mono text-sm text-[var(--muted)]
                                   leading-relaxed flex gap-3"
                      >
                        <span className="text-[#fbbf24] shrink-0">›</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </SubSection>
              )}

              {/* Tradeoffs */}
              {project.tradeoffs.length > 0 && (
                <SubSection label="tradeoffs">
                  <div className="space-y-4">
                    {project.tradeoffs.map((t, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4
                                   border-t border-[var(--border)] pt-4"
                      >
                        <div>
                          <p className="font-mono text-[10px] tracking-[3px]
                                        text-[var(--muted)] uppercase mb-2">
                            gave up
                          </p>
                          <p className="font-mono text-sm text-[var(--text)]">
                            {t.gave_up}
                          </p>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] tracking-[3px]
                                        text-[var(--accent-green)] uppercase mb-2">
                            got
                          </p>
                          <p className="font-mono text-sm text-[var(--text)]">
                            {t.got}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </SubSection>
              )}

              {/* Stack tags */}
              <SubSection label="stack">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </SubSection>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
