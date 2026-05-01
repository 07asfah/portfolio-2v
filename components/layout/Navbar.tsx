"use client";

import { useEffect, useState } from "react";
import LogoMenu from "@/components/layout/LogoMenu";

// Order: about → engineering → resume → projects → contact (all inline).
const links = [
  { label: ".about()",       href: "#about"       },
  { label: ".engineering()", href: "#engineering" },
  { label: ".resume()",      href: "#resume"      },
  { label: ".projects()",    href: "#projects"    },
  { label: ".contact()",     href: "#contact"     },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add background to the navbar once the user has scrolled past the hero edge
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50
                  px-12 md:px-20 py-5
                  flex items-center justify-between
                  transition-colors duration-200
                  ${scrolled
                    ? "bg-[rgba(15,15,18,0.8)] backdrop-blur-md border-b border-[var(--border)]"
                    : "bg-transparent"}`}
    >
      {/* Logo — opens brand / quick actions / social dropdown */}
      <LogoMenu />

      {/* Desktop links — centered on the page */}
      <div
        className="hidden md:flex items-center gap-10
                   absolute left-1/2 -translate-x-1/2"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-mono text-base text-[var(--text)]
                       hover:text-[var(--accent-green)] transition-colors
                       tracking-wider"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden font-mono text-xs text-[var(--muted)]
                   hover:text-[var(--accent-green)] transition-colors"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "[close]" : "[menu]"}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0
                     bg-[var(--bg)] border-b border-[var(--border)]
                     flex flex-col items-center gap-6 py-8 md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-xs text-[var(--muted)]
                         hover:text-[var(--accent-green)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
