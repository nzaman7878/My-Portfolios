import { useSkills } from '../../hooks/useSkills';
import { AnimatedSection } from '../common/AnimatedSection';
import { Skeleton } from '../common/Skeleton';

export default function TechStack() {
  const { data: categories = [], isLoading: loading } = useSkills();

  if (loading) {
    return (
      <section className="py-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="w-full lg:w-[40%] flex flex-col">
            <Skeleton className="h-12 w-48 mb-4" />
            <Skeleton className="h-4 w-full max-w-sm" />
            <Skeleton className="h-4 w-3/4 max-w-sm mt-2" />
          </div>
          <div className="w-full lg:w-[60%] flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-4 w-24" />
              <div className="flex flex-wrap gap-3">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-32" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="h-4 w-24" />
              <div className="flex flex-wrap gap-3">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-28" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <AnimatedSection id="skills" className="py-24">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column */}
        <div className="w-full lg:w-[40%] flex flex-col">
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4 text-[var(--color-primary-text)]">Tech Stack</h2>
          <p className="text-[var(--color-secondary-text)] font-light text-sm max-w-sm">
            A curated stack of modern technologies focused on performance, scalability, and intelligence.
          </p>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[60%] flex flex-col gap-10">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col gap-4">
              <span className="font-mono text-[10px] text-[var(--color-secondary-text)] tracking-widest uppercase">
                {category.title}
              </span>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <div 
                    key={i}
                    className="px-4 py-2 border-thin rounded text-xs font-medium text-[var(--color-primary-text)] bg-transparent hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:text-white transition-colors cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </AnimatedSection>
  );
}
