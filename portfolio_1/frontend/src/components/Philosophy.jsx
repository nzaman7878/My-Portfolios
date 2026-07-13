import { AnimatedSection } from './AnimatedSection';

export default function Philosophy() {
  return (
    <AnimatedSection id="philosophy" className="py-40 flex items-center justify-center bg-[var(--color-background)]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-serif italic tracking-tight text-[var(--color-primary-text)] leading-[1.2]">
          "I believe great software isn't just about writing code.<br/>It's about understanding people."
        </h2>
      </div>
    </AnimatedSection>
  );
}
