import { AnimatedSection } from './AnimatedSection';

const experiences = [
  {
    title: 'Master of Science in Information Technology',
    institution: 'Gauhati University',
    period: 'Present',
    description: 'Specializing in advanced software engineering principles and cutting-edge web technologies.',
  },
  {
    title: 'Bachelor of Science',
    institution: 'University of Technology',
    period: 'Completed',
    description: 'Built a strong foundation in computer science, algorithms, and system design.',
  },
];

export default function ExperienceTimeline() {
  return (
    <AnimatedSection id="experience">
      <div className="mb-24 flex flex-col gap-4">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Experience & Education</h2>
        <div className="h-[1px] w-full max-w-sm bg-[var(--color-border-custom)]"></div>
      </div>

      <div className="relative border-l border-[var(--color-border-custom)] ml-4 md:ml-6 space-y-20 pb-12">
        {experiences.map((exp, index) => (
          <div key={index} className="relative pl-12 md:pl-16">
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
              <p className="text-[var(--color-secondary-text)] mt-4 font-light leading-relaxed max-w-2xl">
                {exp.description}
              </p>
            </div>
          </div>
        ))}

        {/* Future Goals Node */}
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
