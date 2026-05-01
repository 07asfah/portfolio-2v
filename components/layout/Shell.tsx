"use client";

import { useState } from "react";
import SecurityBackground from "@/components/effects/SecurityBackground";
import IntroAnimation from "@/components/effects/IntroAnimation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/**
 * Client-side shell so we can hold intro-animation state without making
 * the root layout itself a client component (keeps metadata server-rendered).
 */
export default function Shell({ children }: { children: React.ReactNode }) {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <SecurityBackground />
      <Navbar />
      {!introDone && <IntroAnimation onComplete={() => setIntroDone(true)} />}
      <div className="relative z-10">{children}</div>
      <Footer />
    </>
  );
}
