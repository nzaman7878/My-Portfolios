import { AnimatedSection } from '../common/AnimatedSection';
import { useSettings } from '../../hooks/useSettings';
import { Skeleton } from '../common/Skeleton';

export default function Philosophy() {
  const { data: settings, isLoading } = useSettings();

  if (isLoading || !settings) {
    return (
      <section className="py-40 flex items-center justify-center bg-[var(--color-background)]">
        <div className="max-w-5xl mx-auto w-full px-6 flex flex-col items-center gap-8">
          <Skeleton className="h-16 w-3/4 max-w-2xl" />
          <Skeleton className="h-16 w-2/3 max-w-xl" />
          <Skeleton className="h-6 w-1/2 mt-4" />
        </div>
      </section>
    );
  }

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
