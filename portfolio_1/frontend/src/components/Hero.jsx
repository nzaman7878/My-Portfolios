import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center py-24 px-6 md:px-12 max-w-[1200px] mx-auto w-full">
      <div className="relative z-10 flex flex-col items-start w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 px-4 py-1.5 border border-[var(--color-border-custom)] rounded-full bg-[var(--color-surface)]"
        >
          <span className="text-[var(--color-primary-text)] font-sans text-xs tracking-widest uppercase">
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-[5.5rem] lg:text-[6.5rem] font-serif font-bold tracking-tight leading-[1.05] text-balance mb-8 max-w-5xl text-[var(--color-primary-text)]"
        >
          Building software that feels as <span className="italic text-[var(--color-accent-secondary)]">good</span> as it works.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-[var(--color-secondary-text)] max-w-2xl font-light mb-12 leading-relaxed"
        >
          Nuruzzaman — Building modern web experiences with MERN and Gen AI. Engineering digital spaces with precision and intent.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4"
        >
          <a
            href="#resume"
            className="px-8 py-4 bg-[var(--color-primary-text)] text-[var(--color-background)] font-medium rounded-full hover:bg-opacity-90 transition-colors uppercase tracking-wide text-sm"
          >
            Download Resume
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border-thin bg-[var(--color-surface)] text-[var(--color-primary-text)] font-medium rounded-full hover:border-[var(--color-primary-text)] transition-colors text-sm"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
