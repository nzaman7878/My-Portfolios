import { motion } from 'framer-motion';
import { FaArrowRight, FaGithub } from 'react-icons/fa';
import { AnimatedSection } from './AnimatedSection';
import { useQuery } from '@tanstack/react-query';

export default function FeaturedWork() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/projects`);
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      return data.data;
    }
  });

  if (isLoading || projects.length === 0) return null;

  const topProjects = projects.slice(0, 3); // Grab up to 3 projects for the featured section
  const firstProject = topProjects[0];
  const otherProjects = topProjects.slice(1);

  return (
    <AnimatedSection id="work" className="py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4 text-[var(--color-primary-text)]">Selected Projects</h2>
          <p className="text-[var(--color-secondary-text)] font-light text-sm space-y-4">
            I believe projects should demonstrate problem-solving rather than simply showcase technology. Each application below was built to explore real-world challenges while improving architecture, scalability, and user experience.
          </p>
        </div>
        <div className="text-[var(--color-secondary-text)] font-mono text-sm tracking-widest mt-8 md:mt-0 whitespace-nowrap">
          01 / {topProjects.length.toString().padStart(2, '0')}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Project 1 - Full Width */}
        {firstProject && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full border-thin bg-[var(--color-surface)] rounded-xl overflow-hidden flex flex-col lg:flex-row"
          >
            {/* Image */}
            <div className="w-full lg:w-[60%] bg-black relative p-2 min-h-[300px]">
               <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src={firstProject.image || 'https://via.placeholder.com/800x600?text=No+Image'} 
                    alt={firstProject.title}
                    className="w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                  />
               </div>
            </div>
            {/* Details */}
            <div className="w-full lg:w-[40%] p-10 flex flex-col justify-center">
              <span className="font-mono text-[10px] text-[var(--color-primary-text)] bg-[var(--color-background)] border-thin px-3 py-1 uppercase tracking-widest w-fit mb-6 rounded">
                {firstProject.type}
              </span>
              <h3 className="text-3xl font-serif font-bold text-[var(--color-primary-text)] mb-4">
                {firstProject.title}
              </h3>
              <p className="text-[var(--color-secondary-text)] font-light text-sm leading-relaxed mb-8">
                {firstProject.problem}
              </p>
              <div className="flex gap-4">
                {firstProject.demo && firstProject.demo !== '#' && (
                  <a href={firstProject.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--color-accent-secondary)] font-medium text-sm hover:text-[var(--color-accent)] transition-colors w-fit">
                    Live Demo <FaArrowRight size={16} />
                  </a>
                )}
                {firstProject.github && firstProject.github !== '#' && (
                  <a href={firstProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--color-primary-text)] font-medium text-sm hover:text-[var(--color-accent)] transition-colors w-fit">
                    <FaGithub size={16} /> GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Project 2 & 3 - Side by Side */}
        {otherProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((project, idx) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (idx + 1) * 0.1 }}
                className="w-full border-thin bg-[var(--color-surface)] rounded-xl overflow-hidden flex flex-col"
              >
                <div className="w-full h-64 bg-black relative p-2">
                   <div className="w-full h-full relative overflow-hidden rounded-lg">
                      <img 
                        src={project.image || 'https://via.placeholder.com/800x600?text=No+Image'} 
                        alt={project.title} 
                        className="w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                      />
                   </div>
                </div>
                <div className="p-8 flex flex-col">
                  <span className="font-mono text-[10px] text-[var(--color-primary-text)] bg-[var(--color-background)] border-thin px-3 py-1 uppercase tracking-widest w-fit mb-4 rounded">
                    {project.type}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[var(--color-primary-text)] mb-3">
                    {project.title}
                  </h3>
                  <p className="text-[var(--color-secondary-text)] font-light text-sm leading-relaxed mb-6">
                    {project.problem}
                  </p>
                  <div className="flex gap-4 mt-auto">
                    {project.demo && project.demo !== '#' && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--color-accent-secondary)] font-medium text-sm hover:text-[var(--color-accent)] transition-colors w-fit">
                        Live Demo
                      </a>
                    )}
                    {project.github && project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--color-primary-text)] font-medium text-sm hover:text-[var(--color-accent)] transition-colors w-fit">
                        <FaGithub size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
