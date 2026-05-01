"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { experiences, sidebarSkills } from "@/data/experiences";

// ──────────────────────────────────────────────────────────────
// Timeline data
// ──────────────────────────────────────────────────────────────
const DATA_MIN = 2018;
const DATA_MAX = 2026.6;
const MIN_RANGE = 1 / 12; // 1 month, max zoom-in
const MAX_RANGE = DATA_MAX - DATA_MIN;

type TimelineEntry = {
  role: string;
  place: string;
  start: number; // decimal year (2024.5 = mid 2024)
  end: number;
  barColor: string;
  placeColor: string;
  ongoing?: boolean;
};

const timelineEntries: TimelineEntry[] = [
  // Education / school (academic — muted)
  {
    role: "Bachelor's degree in Physics",
    place: "University",
    start: 2018,
    end: 2021,
    barColor: "rgba(255, 255, 255, 0.4)",
    placeColor: "rgba(255, 255, 255, 0.55)",
  },
  {
    role: "Software Engineering",
    place: "Engineering School",
    start: 2021,
    end: 2023,
    barColor: "rgba(255, 255, 255, 0.55)",
    placeColor: "rgba(255, 255, 255, 0.7)",
  },

  // Coding training (green)
  {
    role: "Frontend · Backend · AI Career · Pro Foundations",
    place: "ALX",
    start: 2024,
    end: 2025,
    barColor: "rgba(0, 255, 100, 0.55)",
    placeColor: "var(--accent-green)",
  },
  {
    role: "Full Stack Developer",
    place: "Lions Geek",
    start: 2025,
    end: 2026,
    barColor: "var(--accent-green)",
    placeColor: "var(--accent-green)",
  },
  {
    role: "Cybersecurity Engineering",
    place: "HESTIM · ongoing",
    start: 2026,
    end: 2026.6,
    barColor: "var(--accent-green)",
    placeColor: "var(--accent-green)",
    ongoing: true,
  },

  // Freelance — runs concurrently with school / training
  {
    role: "Freelance — Web Development",
    place: "Various clients",
    start: 2022,
    end: 2024,
    barColor: "rgba(0, 255, 100, 0.35)",
    placeColor: "rgba(0, 255, 100, 0.7)",
  },
  {
    role: "Freelance — Full Stack",
    place: "Various clients · ongoing",
    start: 2024.5,
    end: 2026.6,
    barColor: "rgba(0, 255, 100, 0.5)",
    placeColor: "rgba(0, 255, 100, 0.85)",
    ongoing: true,
  },
];

// ──────────────────────────────────────────────────────────────
// External-link icon for company URLs in the cards
// ──────────────────────────────────────────────────────────────
const LinkIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block opacity-70"
  >
    <path d="M15 3h6v6" />
    <path d="M10 14L21 3" />
    <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
  </svg>
);

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
// Interactive timeline with zoom (Ctrl/Cmd + wheel) and pan (drag)
// ──────────────────────────────────────────────────────────────
type Viewport = { start: number; end: number };

const clamp = (v: Viewport): Viewport => {
  const range = v.end - v.start;
  if (range > MAX_RANGE) return { start: DATA_MIN, end: DATA_MAX };
  if (v.start < DATA_MIN) return { start: DATA_MIN, end: DATA_MIN + range };
  if (v.end > DATA_MAX) return { start: DATA_MAX - range, end: DATA_MAX };
  return v;
};

function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState<Viewport>({
    start: DATA_MIN,
    end: DATA_MAX,
  });
  const [isDragging, setIsDragging] = useState(false);
  const range = viewport.end - viewport.start;

  // Mirror viewport in a ref so the wheel handler can read its
  // current value synchronously (needed to decide whether to
  // preventDefault before letting the page scroll past the edge).
  const viewportRef = useRef(viewport);
  useEffect(() => {
    viewportRef.current = viewport;
  }, [viewport]);

  const yearToPercent = (year: number) =>
    ((year - viewport.start) / range) * 100;

  // ── Wheel: Ctrl/Cmd zoom, plain wheel pans the timeline ────
  // Native listener so we can preventDefault (React's wheel
  // handler is passive and would silently allow page scroll).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const rect = el.getBoundingClientRect();
      const trackWidth = rect.width;
      const current = viewportRef.current;
      const r = current.end - current.start;

      // ── Zoom mode ────────────────────────────────────────
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const mouseX = Math.min(1, Math.max(0, (e.clientX - rect.left) / trackWidth));
        const factor = e.deltaY > 0 ? 1.15 : 1 / 1.15;
        setViewport((prev) => {
          const r2 = prev.end - prev.start;
          const mouseYear = prev.start + mouseX * r2;
          const newRange = Math.max(MIN_RANGE, Math.min(MAX_RANGE, r2 * factor));
          const newStart = mouseYear - mouseX * newRange;
          return clamp({ start: newStart, end: newStart + newRange });
        });
        return;
      }

      // ── Pan mode (plain wheel) ───────────────────────────
      // Use whichever axis is dominant (deltaX from trackpads, deltaY from mice)
      const rawDelta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      // Boundary check: if we're already pinned at an edge and the
      // user keeps scrolling in that direction, let the page scroll
      // through (UX: timeline doesn't trap them forever).
      if (rawDelta < 0 && current.start <= DATA_MIN + 1e-6) return;
      if (rawDelta > 0 && current.end >= DATA_MAX - 1e-6) return;

      e.preventDefault();
      const yearShift = (rawDelta / trackWidth) * r * 0.7;
      setViewport(
        clamp({
          start: current.start + yearShift,
          end: current.end + yearShift,
        }),
      );
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // ── Pan: mouse drag ────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const startX = e.clientX;
    const startViewport = viewport;

    const onMove = (ev: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const width = el.getBoundingClientRect().width;
      const dx = ev.clientX - startX;
      const r = startViewport.end - startViewport.start;
      const yearShift = -(dx / width) * r;
      setViewport(
        clamp({
          start: startViewport.start + yearShift,
          end: startViewport.end + yearShift,
        }),
      );
    };

    const onUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  // ── Pan: touch drag ────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const startX = e.touches[0].clientX;
    const startViewport = viewport;

    const onMove = (ev: TouchEvent) => {
      if (ev.touches.length !== 1) return;
      const el = containerRef.current;
      if (!el) return;
      const width = el.getBoundingClientRect().width;
      const dx = ev.touches[0].clientX - startX;
      const r = startViewport.end - startViewport.start;
      const yearShift = -(dx / width) * r;
      setViewport(
        clamp({
          start: startViewport.start + yearShift,
          end: startViewport.end + yearShift,
        }),
      );
    };

    const onEnd = () => {
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
    };

    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", onEnd);
  };

  // ── Preset zoom buttons ────────────────────────────────────
  const setRangeYears = (years: number) => {
    setViewport((prev) => {
      const center = (prev.start + prev.end) / 2;
      const half = years / 2;
      return clamp({ start: center - half, end: center + half });
    });
  };

  const zoom = (factor: number) => {
    setViewport((prev) => {
      const r = prev.end - prev.start;
      const center = (prev.start + prev.end) / 2;
      const newRange = Math.max(MIN_RANGE, Math.min(MAX_RANGE, r * factor));
      const half = newRange / 2;
      return clamp({ start: center - half, end: center + half });
    });
  };

  const reset = () =>
    setViewport({ start: DATA_MIN, end: DATA_MAX });

  // ── Axis labels ────────────────────────────────────────────
  // Whole-year ticks falling in the current viewport.
  const visibleYears: number[] = [];
  const startInt = Math.ceil(viewport.start);
  const endInt = Math.floor(viewport.end);
  for (let y = startInt; y <= endInt; y++) visibleYears.push(y);

  // Active state for preset buttons
  const isActive = (years: number) => Math.abs(range - years) < 0.01;
  const btnBase =
    "font-mono text-[11px] px-2.5 py-1 rounded border transition-colors select-none";
  const btnInactive =
    "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent-green)] hover:text-[var(--accent-green)]";
  const btnActive =
    "border-[var(--accent-green)] text-[var(--accent-green)] bg-[rgba(0,255,100,0.06)]";

  return (
    <div>
      {/* Zoom controls */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="font-mono text-[11px] text-[var(--muted)] mr-1">
          Zoom:
        </span>
        <button
          onClick={() => zoom(1.5)}
          className={`${btnBase} ${btnInactive}`}
          aria-label="Zoom out"
          title="Zoom out"
        >
          −
        </button>
        <button
          onClick={() => setRangeYears(1 / 12)}
          className={`${btnBase} ${isActive(1 / 12) ? btnActive : btnInactive}`}
        >
          1M
        </button>
        <button
          onClick={() => setRangeYears(0.25)}
          className={`${btnBase} ${isActive(0.25) ? btnActive : btnInactive}`}
        >
          3M
        </button>
        <button
          onClick={() => setRangeYears(0.5)}
          className={`${btnBase} ${isActive(0.5) ? btnActive : btnInactive}`}
        >
          6M
        </button>
        <button
          onClick={() => setRangeYears(1)}
          className={`${btnBase} ${isActive(1) ? btnActive : btnInactive}`}
        >
          1Y
        </button>
        <button
          onClick={() => zoom(1 / 1.5)}
          className={`${btnBase} ${btnInactive}`}
          aria-label="Zoom in"
          title="Zoom in"
        >
          +
        </button>
        <button
          onClick={reset}
          className={`${btnBase} ${btnInactive} ml-1`}
          title="Reset view"
        >
          reset
        </button>
        <span className="font-mono text-[11px] text-[var(--muted)] ml-2">
          (Scroll to pan · Ctrl/Cmd + Scroll to zoom · drag to pan)
        </span>
      </div>

      {/* Timeline canvas */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        className={`relative overflow-hidden select-none min-w-[600px] ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ touchAction: "pan-y" }}
      >
        {/* Year axis */}
        <div className="relative h-5 mb-1">
          {visibleYears.map((year) => (
            <span
              key={year}
              className="absolute font-mono text-[11px] text-[var(--muted)]"
              style={{
                left: `${yearToPercent(year)}%`,
                transform: "translateX(-50%)",
              }}
            >
              {year}
            </span>
          ))}
        </div>
        <div className="relative h-px bg-[var(--border)]">
          {visibleYears.map((year) => (
            <div
              key={year}
              className="absolute top-0 w-px h-2 bg-[var(--border)]"
              style={{ left: `${yearToPercent(year)}%` }}
            />
          ))}
        </div>

        {/* Bars */}
        <div className="mt-12 space-y-10 pb-2">
          {timelineEntries.map((entry, i) => {
            const left = yearToPercent(entry.start);
            const width = yearToPercent(entry.end) - left;
            const isVisible = entry.end > viewport.start && entry.start < viewport.end;
            const isGreen =
              entry.barColor.includes("0, 255, 100") ||
              entry.barColor.includes("--accent-green");

            return (
              <div
                key={`${entry.role}-${i}`}
                className="relative"
                style={{ opacity: isVisible ? 1 : 0.15 }}
              >
                {/* Label stack — sits above the bar at its starting position */}
                <div
                  className="font-mono text-[11px] mb-2 pointer-events-none"
                  style={{
                    marginLeft: `${left}%`,
                    maxWidth: `${Math.max(20, 100 - left)}%`,
                  }}
                >
                  <p
                    className="text-[var(--text)] font-bold leading-tight
                               whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {entry.role}
                  </p>
                  <p
                    style={{ color: entry.placeColor }}
                    className="font-bold mt-0.5 whitespace-nowrap
                               overflow-hidden text-ellipsis"
                  >
                    {entry.place}
                  </p>
                </div>

                {/* The bar */}
                <div
                  className="h-1.5 rounded-sm pointer-events-none"
                  style={{
                    marginLeft: `${left}%`,
                    width: `${Math.max(width, 0.5)}%`,
                    background: entry.ongoing
                      ? `linear-gradient(90deg, ${entry.barColor} 0%, ${entry.barColor} 70%, transparent 100%)`
                      : entry.barColor,
                    boxShadow: isGreen
                      ? "0 0 12px rgba(0, 255, 100, 0.3)"
                      : undefined,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrubber / mini-map — drag the green thumb to pan, click track to jump */}
      <Scrubber viewport={viewport} setViewport={setViewport} />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Scrubber: shows current viewport over the full data range,
// drag to pan, click track to jump.
// ──────────────────────────────────────────────────────────────
function Scrubber({
  viewport,
  setViewport,
}: {
  viewport: Viewport;
  setViewport: React.Dispatch<React.SetStateAction<Viewport>>;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);

    const startX = e.clientX;
    const startViewport = viewport;

    const onMove = (ev: MouseEvent) => {
      const track = trackRef.current;
      if (!track) return;
      const trackWidth = track.getBoundingClientRect().width;
      const dx = ev.clientX - startX;
      const yearShift = (dx / trackWidth) * MAX_RANGE;
      setViewport(
        clamp({
          start: startViewport.start + yearShift,
          end: startViewport.end + yearShift,
        }),
      );
    };

    const onUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  // Click on empty track jumps the viewport so its center lands at the click
  const onTrackClick = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) / rect.width;
    const clickYear = DATA_MIN + clickX * MAX_RANGE;
    setViewport((prev) => {
      const r = prev.end - prev.start;
      return clamp({ start: clickYear - r / 2, end: clickYear + r / 2 });
    });
  };

  const left = ((viewport.start - DATA_MIN) / MAX_RANGE) * 100;
  const width = ((viewport.end - viewport.start) / MAX_RANGE) * 100;

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between
                      font-mono text-[11px] text-[var(--muted)]
                      tracking-wider mb-3">
        <span>{DATA_MIN}</span>
        <span>{Math.floor(DATA_MAX)}</span>
      </div>
      <div
        ref={trackRef}
        onClick={onTrackClick}
        className="relative h-3 bg-[rgba(255,255,255,0.06)]
                   rounded-full cursor-pointer
                   border border-[var(--border)]
                   hover:bg-[rgba(255,255,255,0.09)]
                   transition-colors"
        title="Drag the green bar or click anywhere on the track to navigate the timeline"
      >
        <div
          onMouseDown={onThumbMouseDown}
          onClick={(e) => e.stopPropagation()}
          className={`absolute top-0 bottom-0
                      bg-[var(--accent-green)]
                      rounded-full
                      transition-all duration-150
                      ${isDragging
                        ? "cursor-grabbing brightness-125"
                        : "cursor-grab hover:brightness-110"}`}
          style={{
            left: `${left}%`,
            width: `${Math.max(3, width)}%`,
            boxShadow: isDragging
              ? "0 0 18px rgba(0, 255, 100, 0.7)"
              : "0 0 10px rgba(0, 255, 100, 0.45)",
          }}
        />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Resume section
// ──────────────────────────────────────────────────────────────
export default function Resume() {
  return (
    <section
      id="resume"
      className="relative px-8 md:px-20 py-24 md:py-32 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">

        {/* Centered .resume() title */}
        <Reveal>
          <h2 className="font-mono text-4xl md:text-6xl font-normal
                         text-center tracking-tight mb-16">
            <span className="text-[var(--text)]">.resume</span>
            <span style={{ color: "rgba(0, 255, 100, 0.55)" }}>()</span>
          </h2>
        </Reveal>

        {/* .timeline() subsection */}
        <Reveal>
          <h3 className="font-mono text-lg md:text-xl mb-6
                         text-[var(--text)]">
            <span>.timeline</span>
            <span style={{ color: "rgba(0, 255, 100, 0.55)" }}>()</span>
          </h3>

          <div className="border border-[var(--border)] rounded-xl
                          p-6 md:p-10
                          bg-[rgba(255,255,255,0.015)]
                          mb-12 overflow-x-auto">
            <Timeline />
          </div>
        </Reveal>

        {/* Two-column: experience cards + skills sidebar */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">

          {/* Left — experience cards */}
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <Reveal key={`${exp.company}-${i}`} delay={i * 0.05}>
                <article
                  className="border border-[var(--border)] rounded-xl
                             p-6 md:p-8
                             bg-[rgba(255,255,255,0.015)]"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-mono text-base md:text-lg
                                   text-[var(--accent-green)] font-bold">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-[11px]
                                     text-[var(--muted)] tracking-wider
                                     whitespace-nowrap pt-1">
                      {exp.dateRange}
                    </span>
                  </div>

                  <p className="font-mono text-sm text-[var(--text)] mb-5
                                flex items-center gap-1.5">
                    {exp.url ? (
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--accent-green)]
                                   transition-colors flex items-center gap-1.5"
                      >
                        {exp.company}, {exp.location} <LinkIcon />
                      </a>
                    ) : (
                      <span>
                        {exp.company}, {exp.location}
                      </span>
                    )}
                  </p>

                  <p className="font-mono text-sm text-[var(--muted)]
                                leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  {exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {exp.technologies.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  )}

                  {exp.details && exp.details.length > 0 && (
                    <div className="space-y-5 mt-2">
                      {exp.details.map((d, di) => (
                        <div key={di}>
                          <p className="font-mono text-sm
                                        text-[var(--muted)]
                                        leading-relaxed mb-3">
                            {d.body}
                          </p>
                          {d.technologies && d.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {d.technologies.map((t) => (
                                <Tag key={t}>{t}</Tag>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </div>

          {/* Right — sticky skills sidebar */}
          <Reveal delay={0.1}>
            <aside
              className="border border-[var(--border)] rounded-xl
                         p-6 md:p-7
                         bg-[rgba(255,255,255,0.015)]
                         lg:sticky lg:top-24 lg:self-start"
            >
              <h3 className="font-mono text-sm font-bold mb-6">
                <span className="text-[var(--text)]">.skills</span>
                <span style={{ color: "rgba(0, 255, 100, 0.55)" }}>()</span>
              </h3>

              <div className="space-y-6">
                {sidebarSkills.map((group) => (
                  <div key={group.label}>
                    <p className="font-mono text-[11px] tracking-wider
                                  text-[var(--muted)] mb-3">
                      // {group.label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <Tag key={item}>{item}</Tag>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
