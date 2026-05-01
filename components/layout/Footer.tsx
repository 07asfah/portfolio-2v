export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--border)]
                       px-8 md:px-20 py-10 mt-32
                       flex flex-col md:flex-row items-center
                       justify-between gap-3">
      <p className="font-mono text-[10px] tracking-[3px]
                    text-[var(--muted)] uppercase">
        © {new Date().getFullYear()} Hafsa Moussaid
      </p>
      <p className="font-mono text-[10px] tracking-[3px]
                    text-[var(--muted)] uppercase">
        Built with Next.js
      </p>
    </footer>
  );
}
