import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Projects from "./components/Projects";
import Capabilities from "./components/Capabilities";
import Stack from "./components/Stack";
import Process from "./components/Process";
import Experiments from "./components/Experiments";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ProjectBriefModal from "./components/ProjectBriefModal";

export default function App() {
  const [briefOpen, setBriefOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <Header onOpenBrief={() => setBriefOpen(true)} />
      <main>
        <Hero onOpenBrief={() => setBriefOpen(true)} />
        <Intro />
        <Projects />
        <Capabilities />
        <Stack />
        <Process />
        <Experiments />
        <Contact onOpenBrief={() => setBriefOpen(true)} />
      </main>
      <Footer />
      <ProjectBriefModal open={briefOpen} onClose={() => setBriefOpen(false)} />
    </>
  );
}
