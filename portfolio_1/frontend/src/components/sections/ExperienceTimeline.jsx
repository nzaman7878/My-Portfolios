import { AnimatedSection } from '../common/AnimatedSection';
import { useExperience } from '../../hooks/useExperience';
import { Skeleton } from '../common/Skeleton';

export default function ExperienceTimeline() {
  const { data: experiences = [], isLoading } = useExperience();

  if (isLoading) {
    return (
      <section className="py-24">
        <div className="mb-24 flex flex-col gap-4">
          <Skeleton className="h-14 w-80" />
          <div className="h-[1px] w-full max-w-sm bg-[var(--color-border-custom)]"></div>
        </div>
        <div className="relative border-l border-[var(--color-border-custom)] ml-4 md:ml-6 space-y-20 pb-12">
          {[1, 2].map((i) => (
            <div key={i} className="relative pl-12 md:pl-16">
              <div className="absolute left-[-5px] top-2 w-[9px] h-[9px] bg-[var(--color-background)] border-2 border-[var(--color-accent-secondary)] rounded-full"></div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full max-w-2xl mt-4" />
                <Skeleton className="h-4 w-3/4 max-w-2xl" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <AnimatedSection id="experience">
      <div className="mb-24 flex flex-col gap-4">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Experience & Education</h2>
        <div className="h-[1px] w-full max-w-sm bg-[var(--color-border-custom)]"></div>
      </div>

      <div className="relative border-l border-[var(--color-border-custom)] ml-4 md:ml-6 space-y-20 pb-12">
        {experiences.map((exp, index) => (
          <div key={exp._id || index} className="relative pl-12 md:pl-16">
            {/* Timeline Dot */}
            <div className="absolute left-[-5px] top-2 w-[9px] h-[9px] bg-[var(--color-background)] border-2 border-[var(--color-accent-secondary)] rounded-full"></div>
            
            <div className="flex flex-col gap-2">
              <span className="font-mono text-sm text-[var(--color-accent)] uppercase tracking-wider">
                {exp.period}
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-primary-text)]">
                {exp.title}
              </h3>
              <span className="text-lg text-[var(--color-secondary-text)] font-medium">
                {exp.institution}
              </span>
              <p className="text-[var(--color-secondary-text)] mt-4 font-light leading-relaxed max-w-2xl whitespace-pre-wrap">
                {exp.description}
              </p>
            </div>
          </div>
        ))}

        {/* Future Goals Node (Static) */}
        <div className="relative pl-12 md:pl-16 pt-8">
            <div className="absolute left-[-5px] top-10 w-[9px] h-[9px] bg-[var(--color-accent)] rounded-full shadow-[0_0_10px_var(--color-accent)]"></div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-sm text-[var(--color-accent)] uppercase tracking-wider">
                Future
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-primary-text)]">
                Engineering Excellence
              </h3>
              <p className="text-[var(--color-secondary-text)] mt-2 font-light leading-relaxed max-w-2xl">
                Continuing to bridge the gap between complex AI systems and intuitive, premium user experiences.
              </p>
            </div>
          </div>
      </div>
    </AnimatedSection>
  );
}
