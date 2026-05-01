"use client";

const EMAIL = "moussaid.hafsa8@gmail.com";

// ──────────────────────────────────────────────────────────────
// Icons
// ──────────────────────────────────────────────────────────────
const iconBase = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const GithubIcon = () => (
  <svg {...iconBase}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const StackOverflowIcon = () => (
  <svg {...iconBase}>
    <path d="M17 21v-7" />
    <path d="M7 21v-7" />
    <path d="M7 21h10" />
    <path d="M7 17h10" />
    <path d="M8 14l9 1.5" />
    <path d="M9 11l8.5 3" />
    <path d="M11 7l7 5" />
    <path d="M14 4l5 6" />
  </svg>
);

const MailIcon = () => (
  <svg {...iconBase}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

// ──────────────────────────────────────────────────────────────
// SideRails — fixed email on the left, icons on the right
// ──────────────────────────────────────────────────────────────
export default function SideRails() {
  return (
    <div className="side-rails hidden md:block">

      {/* Left rail — vertical email */}
      <div className="fixed bottom-0 left-6 z-30 flex flex-col items-center
                      pointer-events-none">
        <a
          href={`mailto:${EMAIL}`}
          className="pointer-events-auto
                     font-mono text-[11px] tracking-[3px]
                     text-[var(--muted)]
                     hover:text-[var(--accent-green)] transition-colors"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          {EMAIL}
        </a>
        <div className="w-px h-24 bg-[var(--border)] mt-4" />
      </div>

      {/* Right rail — stacked social icons */}
      <div className="fixed bottom-0 right-6 z-30 flex flex-col items-center gap-6
                      pointer-events-none">
        <div className="flex flex-col items-center gap-6 pointer-events-auto">
          <a
            href="https://github.com/07asfah"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--muted)]
                       hover:text-[var(--accent-green)] transition-colors"
          >
            <GithubIcon />
          </a>
          <a
            href="https://stackoverflow.com/users/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Stack Overflow"
            className="text-[var(--muted)]
                       hover:text-[var(--accent-green)] transition-colors"
          >
            <StackOverflowIcon />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Email"
            className="text-[var(--muted)]
                       hover:text-[var(--accent-green)] transition-colors"
          >
            <MailIcon />
          </a>
        </div>
        <div className="w-px h-24 bg-[var(--border)] mt-4" />
      </div>

    </div>
  );
}
