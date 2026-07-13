import { AnimatedSection } from './AnimatedSection';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Contact() {
  return (
    <AnimatedSection id="contact">
      <div className="mb-24 flex flex-col gap-4">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Let's Build Something Great</h2>
        <div className="h-[1px] w-full max-w-sm bg-[var(--color-border-custom)]"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Form */}
        <div className="border-thin bg-surface p-8 md:p-12 rounded">
          <form className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-sm tracking-wider text-[var(--color-secondary-text)] uppercase">Name</label>
              <input 
                type="text" 
                id="name" 
                className="bg-transparent border-b border-[var(--color-border-custom)] py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors text-[var(--color-primary-text)] font-light"
                placeholder="John Doe"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-sm tracking-wider text-[var(--color-secondary-text)] uppercase">Email</label>
              <input 
                type="email" 
                id="email" 
                className="bg-transparent border-b border-[var(--color-border-custom)] py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors text-[var(--color-primary-text)] font-light"
                placeholder="john@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-mono text-sm tracking-wider text-[var(--color-secondary-text)] uppercase">Message</label>
              <textarea 
                id="message" 
                rows="4"
                className="bg-transparent border-b border-[var(--color-border-custom)] py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors text-[var(--color-primary-text)] font-light resize-none"
                placeholder="How can we collaborate?"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="mt-4 px-8 py-4 bg-[var(--color-accent-secondary)] text-white font-medium rounded hover:bg-opacity-90 transition-colors w-fit"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Social Links */}
        <div className="flex flex-col justify-center gap-12 lg:pl-12">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-serif font-medium text-[var(--color-primary-text)]">Digital Presence</h3>
            <div className="text-[var(--color-secondary-text)] font-light max-w-md leading-relaxed flex flex-col gap-4">
              <p>Whether it's building a modern web application, integrating AI into an existing product, or collaborating on an ambitious idea, I'm always excited to work on projects that create real impact.</p>
              <p>If you're looking for someone who enjoys solving problems, writing clean code, and continuously learning, I'd love to connect.</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <a href="mailto:contact@example.com" className="flex items-center gap-4 group w-fit">
              <div className="p-4 border-thin bg-surface rounded group-hover:border-[var(--color-accent)] transition-colors">
                <FaEnvelope size={24} className="text-[var(--color-secondary-text)] group-hover:text-[var(--color-accent)] transition-colors" />
              </div>
              <span className="text-lg font-light group-hover:text-[var(--color-accent)] transition-colors">nuruzzaman@example.com</span>
            </a>
            
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group w-fit">
              <div className="p-4 border-thin bg-surface rounded group-hover:border-[var(--color-accent-secondary)] transition-colors">
                <FaLinkedin size={24} className="text-[var(--color-secondary-text)] group-hover:text-[var(--color-accent-secondary)] transition-colors" />
              </div>
              <span className="text-lg font-light group-hover:text-[var(--color-accent-secondary)] transition-colors">LinkedIn</span>
            </a>

            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group w-fit">
              <div className="p-4 border-thin bg-surface rounded group-hover:border-[var(--color-primary-text)] transition-colors">
                <FaGithub size={24} className="text-[var(--color-secondary-text)] group-hover:text-[var(--color-primary-text)] transition-colors" />
              </div>
              <span className="text-lg font-light group-hover:text-[var(--color-primary-text)] transition-colors">GitHub</span>
            </a>
          </div>
        </div>

      </div>
    </AnimatedSection>
  );
}
