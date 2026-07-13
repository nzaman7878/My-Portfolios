import { AnimatedSection } from './AnimatedSection';

export default function Philosophy() {
  return (
    <AnimatedSection id="philosophy" className="py-40 flex items-center justify-center bg-[var(--color-background)]">
      <div className="max-w-5xl mx-auto px-6 text-center flex flex-col gap-8">
        <h2 className="text-3xl md:text-5xl font-serif italic tracking-tight text-[var(--color-primary-text)] leading-[1.3]">
          "I believe great software isn't just about writing code. It's about understanding people, solving meaningful problems, and building products that remain fast, intuitive, and maintainable as they grow."
        </h2>
        <p className="text-xl md:text-2xl text-[var(--color-secondary-text)] font-light">
          I strive to write clean, scalable code while creating experiences that users genuinely enjoy.
        </p>
      </div>
    </AnimatedSection>
  );
}
