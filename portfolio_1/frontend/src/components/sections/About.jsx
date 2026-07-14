import { AnimatedSection } from '../common/AnimatedSection';
import { useSettings } from '../../hooks/useSettings';

export default function About() {
  const { data: settings, isLoading } = useSettings();

  if (isLoading || !settings) return null;

  const { about } = settings;

  return (
    <AnimatedSection id="about" className="py-24">
      <div className="w-full bg-[var(--color-surface)] border-thin rounded-2xl p-12 md:p-16 lg:p-24 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column */}
        <div className="w-full lg:w-[40%] flex flex-col gap-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-[var(--color-primary-text)] leading-tight">
            About
          </h2>
          <blockquote className="text-lg md:text-xl font-serif italic text-[var(--color-secondary-text)] leading-relaxed border-l-2 border-[var(--color-border-custom)] pl-6">
            {about.quote}
          </blockquote>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[60%] flex flex-col gap-6 text-[var(--color-primary-text)] font-light text-sm leading-loose">
          {about.paragraphs?.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

      </div>
    </AnimatedSection>
  );
}
