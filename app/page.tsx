import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Engineering from "@/components/sections/Engineering";
import Resume from "@/components/sections/Resume";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Engineering />
      <Resume />
      <Projects />
      <Contact />
    </main>
  );
}
