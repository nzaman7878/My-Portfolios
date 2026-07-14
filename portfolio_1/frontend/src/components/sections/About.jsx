import { AnimatedSection } from '../common/AnimatedSection';
import { useSettings } from '../../hooks/useSettings';
import { Skeleton } from '../common/Skeleton';

export default function About() {
  const { data: settings, isLoading } = useSettings();

  if (isLoading || !settings) {
    return (
      <section className="py-24">
        <div className="w-full bg-[var(--color-surface)] border-thin rounded-2xl p-12 md:p-16 lg:p-24 flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="w-full lg:w-[40%] flex flex-col gap-12">
            <Skeleton className="h-12 w-32" />
            <div className="border-l-2 border-[var(--color-border-custom)] pl-6 space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
            </div>
          </div>
          <div className="w-full lg:w-[60%] flex flex-col gap-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </section>
    );
  }

  const { about } = settings;

  return (
    <AnimatedSection id="about" className="py-24">
      <div className="w-full bg-[var(--color-surface)] border-thin rounded-2xl p-12 md:p-16 lg:p-24 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column */}
        <div className="w-full lg:w-[40%] flex flex-col gap-12">
          <div className="flex flex-col gap-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-[var(--color-primary-text)] leading-tight">
              About
            </h2>
            {about.profileImage && (
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-thin">
                <img 
                  src={about.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
                />
              </div>
            )}
          </div>
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
