import { motion } from 'framer-motion';

export function AnimatedSection({ children, className = '', id = '' }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`py-32 px-6 md:px-12 max-w-[1200px] mx-auto w-full ${className}`}
    >
      {children}
    </motion.section>
  );
}
