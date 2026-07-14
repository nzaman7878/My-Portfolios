import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/projects`);
        const data = await res.json();
        if (data.success) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <AnimatedSection id="projects" className="py-24">
        <div className="flex justify-center items-center h-64">
          <p className="text-[var(--color-secondary-text)]">Loading projects...</p>
        </div>
      </AnimatedSection>
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
                    <img src={project.image} alt={project.title} className="w-full h-auto object-cover" />
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
                  <a href={project.github} className="flex-1 flex justify-center items-center gap-2 py-3 border-thin rounded text-[var(--color-primary-text)] hover:text-[var(--color-background)] hover:bg-[var(--color-primary-text)] transition-all text-sm font-medium">
                    <FaGithub size={16} /> Code
                  </a>
                  <a href={project.demo} className="flex-1 flex justify-center items-center gap-2 py-3 bg-[var(--color-accent)] text-[var(--color-background)] rounded hover:bg-opacity-90 transition-all text-sm font-medium">
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
