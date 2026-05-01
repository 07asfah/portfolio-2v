export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 px-8 md:px-20 pt-24 pb-4
                       overflow-hidden">

      {/* Copyright line above the big outline name */}
      <p className="font-mono text-sm text-center text-[var(--muted)] mb-10">
        © {year} <span className="mx-2 text-[var(--border)]">|</span>{" "}
        <span className="text-[var(--text)] font-bold">Hafsa Moussaid</span>
      </p>

      {/* Huge outline name — fades into the background */}
      <div className="text-center pointer-events-none select-none">
        <span
          className="font-mono font-bold tracking-tight inline-block"
          style={{
            fontSize: "clamp(80px, 22vw, 280px)",
            lineHeight: 1,
            letterSpacing: "0.02em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(0, 255, 100, 0.14)",
          }}
        >
          HAFSA
        </span>
      </div>
    </footer>
  );
}
