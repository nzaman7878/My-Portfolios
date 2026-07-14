import { AnimatedSection } from './AnimatedSection';
import { useQuery } from '@tanstack/react-query';

export default function Philosophy() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/settings`);
      if (!res.ok) throw new Error('Failed to fetch settings');
      return res.json();
    }
  });

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
