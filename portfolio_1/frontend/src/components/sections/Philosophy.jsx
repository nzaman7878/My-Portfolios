import { AnimatedSection } from '../common/AnimatedSection';
import { useSettings } from '../../hooks/useSettings';

export default function Philosophy() {
  const { data: settings, isLoading } = useSettings();

  if (isLoading || !settings) return null;

  const { philosophy } = settings;

  return (
    <AnimatedSection id="philosophy" className="py-40 flex items-center justify-center bg-[var(--color-background)]">
      <div className="max-w-5xl mx-auto px-6 text-center flex flex-col gap-8">
        <h2 className="text-3xl md:text-5xl font-serif italic tracking-tight text-[var(--color-primary-text)] leading-[1.3] whitespace-pre-wrap">
          {philosophy.mainQuote}
        </h2>
        <p className="text-xl md:text-2xl text-[var(--color-secondary-text)] font-light">
          {philosophy.subtext}
        </p>
      </div>
    </AnimatedSection>
  );
}
