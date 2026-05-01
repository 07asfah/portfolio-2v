"use client";

import { motion } from "framer-motion";

/** Bolded keyword inside the intro paragraph — heavier weight + brighter text. */
function K({ children }: { children: React.ReactNode }) {
  return <strong className="font-bold text-[var(--text)]">{children}</strong>;
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center
                 px-8 md:px-20 pt-24"
    >
      {/* Block is centered on the page, but text inside is left-aligned */}
      <div className="max-w-3xl w-full">

        {/* HI label with leading green line — left-aligned */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="w-10 h-px bg-[var(--accent-green)]" />
          <span className="font-mono text-[11px] tracking-[5px]
                           text-[var(--accent-green)] uppercase">
            HI
          </span>
        </motion.div>

        {/* Name — mono, lighter weight, "Hafsa" in green accent */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-mono text-4xl md:text-6xl font-normal
                     tracking-tight text-[var(--text)] mb-8"
        >
          I&apos;m{" "}
          <span className="text-[var(--accent-green)]">Hafsa</span>{" "}
          Moussaid
        </motion.h1>

        {/* Personal intro — left-aligned inside the centered block */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="font-mono text-sm md:text-base
                     text-[var(--muted)] leading-relaxed
                     max-w-2xl"
        >
          I&apos;m fascinated by how systems work — and where they break. My
          time goes between <K>web development</K> and{" "}
          <K>cybersecurity</K>: building things carefully, then questioning
          them until I&apos;m sure they hold up. I care about{" "}
          <K>clean architecture</K>, <K>secure design</K>, and the small
          details most people skip.
        </motion.p>

      </div>
    </section>
  );
}
