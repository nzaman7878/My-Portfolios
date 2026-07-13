import { AnimatedSection } from './AnimatedSection';

export default function About() {
  return (
    <AnimatedSection id="about" className="py-24">
      <div className="w-full bg-[var(--color-surface)] border-thin rounded-2xl p-12 md:p-16 lg:p-24 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column */}
        <div className="w-full lg:w-[40%] flex flex-col gap-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-[var(--color-primary-text)] leading-tight">
            About
          </h2>
          <blockquote className="text-lg md:text-xl font-serif italic text-[var(--color-secondary-text)] leading-relaxed border-l-2 border-[var(--color-border-custom)] pl-6">
            "I'm a developer who enjoys building products that people genuinely enjoy using."
          </blockquote>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[60%] flex flex-col gap-6 text-[var(--color-primary-text)] font-light text-sm leading-loose">
          <p>
            After completing my Master's in Information Technology, I chose to focus on full-stack web development because I love solving problems across the entire application—from designing intuitive user interfaces to building scalable backend systems and APIs.
          </p>
          <p>
            Over the years, I've worked on projects ranging from Learning Management Systems and AI-powered applications to e-commerce platforms and healthcare solutions. Every project has taught me something new about writing maintainable code, designing better user experiences, and building software that scales.
          </p>
          <p>
            Today, my primary stack is MongoDB, Express.js, React, and Node.js. Alongside that, I'm exploring Generative AI, LLM integration, AI agents, and modern developer tools to create applications that are not only functional but also intelligent.
          </p>
          <p>
            Outside of coding, I enjoy learning new technologies, refining my development workflow, studying system design, and continuously improving my craft.
          </p>
          <p>
            I'm always looking for opportunities to build meaningful products, collaborate with ambitious teams, and solve challenging engineering problems.
          </p>
        </div>

      </div>
    </AnimatedSection>
  );
}
