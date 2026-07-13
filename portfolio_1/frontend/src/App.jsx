import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedWork from './components/FeaturedWork';
import About from './components/About';
import ExperienceTimeline from './components/ExperienceTimeline';
import TechStack from './components/TechStack';
import Philosophy from './components/Philosophy';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-primary-text)] font-sans selection:bg-[var(--color-accent)] selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <FeaturedWork />
        <TechStack />
        <About />
        <Philosophy />
        {/* <ExperienceTimeline /> */}
        {/* <Contact /> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
