import Navbar from '../components/common/Navbar';
import Hero from '../components/sections/Hero';
import FeaturedWork from '../components/sections/FeaturedWork';
import About from '../components/sections/About';
import ExperienceTimeline from '../components/sections/ExperienceTimeline';
import TechStack from '../components/sections/TechStack';
import Projects from '../components/sections/Projects';
import Philosophy from '../components/sections/Philosophy';
import Contact from '../components/sections/Contact';
import Footer from '../components/sections/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedWork />
        <About />
        <ExperienceTimeline />
        <TechStack />
        <Projects />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
