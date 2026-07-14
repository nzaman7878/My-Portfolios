import { motion } from 'framer-motion';
import { useSettings } from '../../hooks/useSettings';
import { Skeleton } from '../common/Skeleton';

export default function Hero() {
  const { data: settings, isLoading } = useSettings();

  if (isLoading || !settings) {
    return (
      <section className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-12 max-w-[1200px] mx-auto w-full">
        <Skeleton className="h-8 w-32 mb-8 rounded-full" />
        <Skeleton className="h-24 md:h-32 lg:h-40 w-3/4 mb-8" />
        <Skeleton className="h-16 w-1/2 mb-12" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-40 rounded-full" />
          <Skeleton className="h-12 w-32 rounded-full" />
        </div>
      </section>
    );
  }

  const { hero } = settings;

  const formatTitle = (title) => {
    if (!title) return null;
    const parts = title.split(/(MERN and AI|MERN \+ AI)/gi);
    return parts.map((part, i) => 
      /MERN and AI|MERN \+ AI/i.test(part) ? (
        <span key={i} className="text-[var(--color-accent)]">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center py-24 px-6 md:px-12 max-w-[1200px] mx-auto w-full">
      <div className="relative z-10 flex flex-col items-start w-full">
        
        {hero.statusTag && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 px-4 py-1.5 border border-[var(--color-border-custom)] rounded-full bg-[var(--color-surface)]"
          >
            <span className="text-[var(--color-primary-text)] font-sans text-xs tracking-widest uppercase">
              {hero.statusTag}
            </span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-[5.5rem] lg:text-[6.5rem] font-serif font-bold tracking-tight leading-[1.05] text-balance mb-8 max-w-5xl text-[var(--color-primary-text)]"
        >
          {formatTitle(hero.title)}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-[var(--color-secondary-text)] max-w-2xl font-light mb-12 leading-relaxed space-y-4 whitespace-pre-wrap"
        >
          {hero.subtitle}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4"
        >
          {hero.resumeUrl && hero.resumeUrl !== '#' && (
            <a
              href={hero.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[var(--color-primary-text)] text-[var(--color-background)] font-medium rounded-full hover:bg-[var(--color-accent)] hover:text-white transition-colors uppercase tracking-wide text-sm"
            >
              Download Resume
            </a>
          )}
          <a
            href="#contact"
            className="px-8 py-4 border-thin bg-[var(--color-surface)] text-[var(--color-primary-text)] font-medium rounded-full hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:text-white transition-colors text-sm"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
