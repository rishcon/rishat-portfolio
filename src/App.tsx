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

export default function App() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Intro />
        <Projects />
        <Capabilities />
        <Stack />
        <Process />
        <Experiments />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
