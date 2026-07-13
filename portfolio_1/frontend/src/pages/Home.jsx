import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedWork from '../components/FeaturedWork';
import About from '../components/About';
import ExperienceTimeline from '../components/ExperienceTimeline';
import TechStack from '../components/TechStack';
import Projects from '../components/Projects';
import Philosophy from '../components/Philosophy';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

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
