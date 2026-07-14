import { AnimatedSection } from './AnimatedSection';
import { useQuery } from '@tanstack/react-query';

export default function About() {
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
