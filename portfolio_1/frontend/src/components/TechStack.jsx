import { useState, useEffect } from 'react';
import { AnimatedSection } from './AnimatedSection';

export default function TechStack() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/skills`);
        const data = await res.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <AnimatedSection id="skills" className="py-24">
        <div className="flex justify-center items-center h-32">
          <p className="text-[var(--color-secondary-text)]">Loading skills...</p>
        </div>
      </AnimatedSection>
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
                    className="px-4 py-2 border-thin rounded text-xs font-medium text-[var(--color-primary-text)] bg-transparent hover:bg-[var(--color-surface)] transition-colors cursor-default"
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
