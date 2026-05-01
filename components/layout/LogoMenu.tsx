"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ──────────────────────────────────────────────────────────────
// Inline icons — small, no dep cost.
// ──────────────────────────────────────────────────────────────
const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ExternalIcon = () => (
  <svg {...iconProps}>
    <path d="M15 3h6v6" />
    <path d="M10 14L21 3" />
    <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
  </svg>
);

const CopyIcon = () => (
  <svg {...iconProps}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const DownloadIcon = () => (
  <svg {...iconProps}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const GithubIcon = () => (
  <svg {...iconProps}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const StackOverflowIcon = () => (
  <svg {...iconProps}>
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

// ──────────────────────────────────────────────────────────────
// LogoMenu
// ──────────────────────────────────────────────────────────────
export default function LogoMenu() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("ayman.dofus@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked — silent */
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Logo trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="font-mono text-base font-semibold tracking-[0.3em]
                   border border-[var(--accent-green)] px-4 py-2
                   hover:opacity-80 transition-opacity cursor-pointer"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span style={{ color: "rgba(0, 255, 100, 0.4)" }}>HAF</span>
        <span className="text-[var(--accent-green)] font-bold">SA</span>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 mt-3 w-72
                       bg-[#141417] border border-[var(--border)]
                       rounded-xl p-5 shadow-2xl"
            role="menu"
          >
            <MenuSection label="BRAND">
              <MenuLink
                href="https://github.com/07asfah"
                external
                icon={<ExternalIcon />}
                label="Visit Profile"
                onClick={() => setOpen(false)}
              />
            </MenuSection>

            <Divider />

            <MenuSection label="QUICK ACTIONS">
              <MenuButton
                icon={<CopyIcon />}
                label={copied ? "Copied!" : "Copy Email"}
                onClick={handleCopyEmail}
              />
              <MenuLink
                href="/resume.pdf"
                download
                icon={<DownloadIcon />}
                label="Download Resume"
                onClick={() => setOpen(false)}
              />
            </MenuSection>

            <Divider />

            <MenuSection label="SOCIAL">
              <MenuLink
                href="https://github.com/07asfah"
                external
                icon={<GithubIcon />}
                label="GitHub"
                onClick={() => setOpen(false)}
              />
              <MenuLink
                href="https://stackoverflow.com/users/"
                external
                icon={<StackOverflowIcon />}
                label="Stack Overflow"
                onClick={() => setOpen(false)}
              />
            </MenuSection>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Subparts
// ──────────────────────────────────────────────────────────────
function MenuSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[3px]
                    text-[var(--muted)] uppercase mb-3 px-1">
        {label}
      </p>
      <ul className="flex flex-col gap-1">{children}</ul>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-[var(--border)] my-3" />;
}

const itemClass =
  "flex items-center gap-3 w-full px-2 py-2 rounded-md " +
  "text-sm text-[var(--text)] " +
  "hover:bg-[rgba(0,255,100,0.06)] hover:text-[var(--accent-green)] " +
  "transition-colors cursor-pointer text-left";

function MenuLink({
  href,
  icon,
  label,
  external,
  download,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
  download?: boolean;
  onClick?: () => void;
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        download={download}
        onClick={onClick}
        className={itemClass}
        role="menuitem"
      >
        <span className="text-[var(--muted)] shrink-0">{icon}</span>
        <span>{label}</span>
      </a>
    </li>
  );
}

function MenuButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <li>
      <button type="button" onClick={onClick} className={itemClass} role="menuitem">
        <span className="text-[var(--muted)] shrink-0">{icon}</span>
        <span>{label}</span>
      </button>
    </li>
  );
}
