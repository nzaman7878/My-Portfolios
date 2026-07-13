import { AnimatedSection } from './AnimatedSection';

export default function About() {
  return (
    <AnimatedSection id="about" className="py-24">
      <div className="w-full bg-[var(--color-surface)] border-thin rounded-2xl p-12 md:p-16 lg:p-24 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column */}
        <div className="w-full lg:w-[40%] flex flex-col gap-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-[var(--color-primary-text)] leading-tight">
            Evolving with the<br/>Intelligence.
          </h2>
          <blockquote className="text-lg md:text-xl font-serif italic text-[var(--color-secondary-text)] leading-relaxed border-l-2 border-[var(--color-border-custom)] pl-6">
            "Transitioning to Gen AI meant rethinking architecture not just as code that executes, but as systems that understand."
          </blockquote>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[60%] flex flex-col gap-6 text-[var(--color-primary-text)] font-light text-sm leading-loose">
          <p>
            My engineering journey began with the rigorous structure of the MERN stack—building robust APIs, managing complex state, and ensuring pixel-perfect frontends. But as the landscape shifted, so did my focus.
          </p>
          <p>
            The integration of Generative AI into modern applications isn't just an API call; it's a fundamental shift in how systems reason and respond. I bridge the gap between deterministic software architecture and probabilistic AI models to create intelligent, self-adapting tools.
          </p>
        </div>

      </div>
    </AnimatedSection>
  );
}
