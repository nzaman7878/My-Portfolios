import { useProjects } from '../../hooks/useProjects';
import { AnimatedSection } from '../common/AnimatedSection';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Skeleton } from '../common/Skeleton';
import { optimizeCloudinaryUrl } from '../../utils/cloudinary';

export default function Projects() {
  const { data: projects = [], isLoading: loading } = useProjects();

  if (loading) {
    return (
      <section className="py-24">
        <div className="flex flex-col mb-16 gap-4">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-4 w-full max-w-2xl" />
          <Skeleton className="h-4 w-3/4 max-w-2xl" />
        </div>
        <div className="flex flex-col gap-24">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-6 w-24 rounded" />
              <Skeleton className="h-10 w-96 rounded" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
              <div className="md:col-span-8">
                <Skeleton className="w-full h-80 rounded-xl" />
              </div>
              <div className="md:col-span-4 flex flex-col gap-8">
                <Skeleton className="w-full h-32 rounded-xl" />
                <Skeleton className="w-full h-32 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <AnimatedSection id="projects" className="py-24">
      <div className="flex flex-col mb-16 gap-4">
        <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-[var(--color-primary-text)]">
          Case Studies
        </h2>
        <p className="text-[var(--color-secondary-text)] font-light text-sm max-w-2xl leading-relaxed">
          In-depth technical breakdowns of systems I've architected, highlighting the problems solved, the engineering decisions made, and the resulting impact.
        </p>
      </div>

      <div className="flex flex-col gap-24">
        {projects.map((project, index) => (
          <div key={index} className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] text-[var(--color-accent)] tracking-widest uppercase border border-[var(--color-accent)] rounded px-3 py-1 w-fit">
                {project.type}
              </span>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-primary-text)]">
                {project.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
              <div className="md:col-span-8 flex flex-col gap-8 bg-[var(--color-surface)] p-8 md:p-10 rounded-xl border-thin">
                
                {project.image && (
                  <div className="w-full rounded-lg overflow-hidden border border-[var(--color-border-custom)] mb-4">
                    <img src={optimizeCloudinaryUrl(project.image)} alt={project.title} className="w-full h-auto object-cover" />
                  </div>
                )}

                <div>
                  <h4 className="text-[var(--color-primary-text)] font-medium mb-2 uppercase tracking-wide text-xs">The Problem</h4>
                  <p className="text-[var(--color-secondary-text)] font-light text-sm leading-relaxed">{project.problem}</p>
                </div>
                
                <div>
                  <h4 className="text-[var(--color-primary-text)] font-medium mb-2 uppercase tracking-wide text-xs">The Solution</h4>
                  <p className="text-[var(--color-secondary-text)] font-light text-sm leading-relaxed">{project.solution}</p>
                </div>

                <div>
                  <h4 className="text-[var(--color-primary-text)] font-medium mb-2 uppercase tracking-wide text-xs">Architecture</h4>
                  <p className="text-[var(--color-secondary-text)] font-light text-sm leading-relaxed">{project.architecture}</p>
                </div>

              </div>

              <div className="md:col-span-4 flex flex-col gap-8">
                
                <div className="bg-[var(--color-surface)] p-6 rounded-xl border-thin flex flex-col gap-4">
                  <h4 className="text-[var(--color-primary-text)] font-medium uppercase tracking-wide text-xs border-b border-[var(--color-border-custom)] pb-2">Key Features</h4>
                  <ul className="flex flex-col gap-2">
                    {project.keyFeatures.map((feature, i) => (
                      <li key={i} className="text-[var(--color-secondary-text)] font-light text-sm flex items-start gap-2">
                        <span className="text-[var(--color-accent)] mt-1">•</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[var(--color-surface)] p-6 rounded-xl border-thin flex flex-col gap-4">
                  <h4 className="text-[var(--color-primary-text)] font-medium uppercase tracking-wide text-xs border-b border-[var(--color-border-custom)] pb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="text-xs bg-[var(--color-background)] text-[var(--color-secondary-text)] px-2 py-1 rounded border border-[var(--color-border-custom)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-auto">
                  <a href={project.github} className="flex-1 flex justify-center items-center gap-2 py-3 border-thin rounded text-[var(--color-primary-text)] hover:text-white hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all text-sm font-medium">
                    <FaGithub size={16} /> Code
                  </a>
                  <a href={project.demo} className="flex-1 flex justify-center items-center gap-2 py-3 bg-[var(--color-accent)] text-[var(--color-background)] rounded hover:opacity-90 transition-all text-sm font-medium">
                    <FaExternalLinkAlt size={14} /> Demo
                  </a>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
