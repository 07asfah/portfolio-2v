export default function Footer() {
  const year = new Date().getFullYear();

  const fadeMask =
    "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.15) 95%, rgba(0,0,0,0) 100%)";

  return (
    <footer className="relative z-10 px-8 md:px-20 pt-24
                       overflow-hidden">

      {/* Copyright line above the big outline name */}
      <p className="font-mono text-sm text-center text-[var(--muted)] mb-16">
        © {year} <span className="mx-2 text-[var(--border)]">|</span>{" "}
        <span className="text-[var(--text)] font-bold">Hafsa Moussaid</span>
      </p>

      {/* Huge outline name — visible at the top, fades into the page bottom */}
      <div className="text-center pointer-events-none select-none
                      whitespace-nowrap"
           style={{
             marginBottom: "clamp(-100px, -8vw, -40px)",
           }}>
        <span
          className="font-mono font-bold inline-block"
          style={{
            fontSize: "clamp(100px, 30vw, 420px)",
            lineHeight: 1,
            letterSpacing: "0.06em",
            color: "transparent",
            WebkitTextStroke: "2px rgba(0, 255, 100, 0.32)",
            WebkitMaskImage: fadeMask,
            maskImage: fadeMask,
          }}
        >
          HAFSA
        </span>
      </div>
    </footer>
  );
}
