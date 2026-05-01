"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = { onComplete: () => void };

const lines = [
  "$ initializing session...",
  "$ verifying integrity... ok",
  "$ loading hafsa.moussaid",
];

/**
 * Brief terminal-style intro shown once on first paint.
 * Auto-dismisses; calls onComplete so <Shell> swaps it out.
 */
export default function IntroAnimation({ onComplete }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setVisible(false);
      window.setTimeout(onComplete, 600);
    }, 1800);
    return () => window.clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center
                 bg-[var(--bg)]"
    >
      <div className="font-mono text-xs text-[var(--muted)] tracking-wider">
        {lines.map((line, i) => (
          <motion.div
            key={line}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.4, duration: 0.3 }}
            className="mb-2"
          >
            <span className="text-[var(--accent)]">{">"}</span>{" "}
            {line.replace("$ ", "")}
          </motion.div>
        ))}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1.0, ease: "easeInOut" }}
          className="h-px bg-[var(--accent)] origin-left mt-4 w-48"
        />
      </div>
    </motion.div>
  );
}
