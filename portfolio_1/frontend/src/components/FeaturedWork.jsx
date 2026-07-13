import { motion } from 'framer-motion';
import { FaArrowRight, FaGithub } from 'react-icons/fa';
import { AnimatedSection } from './AnimatedSection';

import lmsImg from '../assets/lms_preview_1783679335781.png';
import aiArenaImg from '../assets/ai_arena_preview_1783679347679.png';
import moodifyImg from '../assets/moodify_preview_1783679369381.png';

export default function FeaturedWork() {
  return (
    <AnimatedSection id="work" className="py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div className="max-w-md">
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4 text-[var(--color-primary-text)]">Selected Works</h2>
          <p className="text-[var(--color-secondary-text)] font-light text-sm">
            A collection of systems designed to solve complex problems elegantly.
          </p>
        </div>
        <div className="text-[var(--color-secondary-text)] font-mono text-sm tracking-widest">
          01 / 03
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Project 1 - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full border-thin bg-[var(--color-surface)] rounded-xl overflow-hidden flex flex-col lg:flex-row"
        >
          {/* Image */}
          <div className="w-full lg:w-[60%] bg-black relative p-2">
             <div className="w-full h-full relative overflow-hidden rounded-lg">
                <img 
                  src={lmsImg} 
                  alt="Learning Management System" 
                  className="w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                />
             </div>
          </div>
          {/* Details */}
          <div className="w-full lg:w-[40%] p-10 flex flex-col justify-center">
            <span className="font-mono text-[10px] text-[var(--color-primary-text)] bg-[var(--color-background)] border-thin px-3 py-1 uppercase tracking-widest w-fit mb-6 rounded">
              WEB | SAAS PLATFORM
            </span>
            <h3 className="text-3xl font-serif font-bold text-[var(--color-primary-text)] mb-4">
              Learning Management<br/>System
            </h3>
            <p className="text-[var(--color-secondary-text)] font-light text-sm leading-relaxed mb-8">
              A highly scalable enterprise platform designed to handle complex course delivery and realtime progress tracking with zero-latency overhead.
            </p>
            <a href="#" className="flex items-center gap-2 text-[var(--color-accent-secondary)] font-medium text-sm hover:text-[var(--color-accent)] transition-colors w-fit">
              View Case Study <FaArrowRight size={16} />
            </a>
          </div>
        </motion.div>

        {/* Project 2 & 3 - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="w-full border-thin bg-[var(--color-surface)] rounded-xl overflow-hidden flex flex-col"
          >
            <div className="w-full h-64 bg-black relative p-2">
               <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src={aiArenaImg} 
                    alt="AI Battle Arena" 
                    className="w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                  />
               </div>
            </div>
            <div className="p-8 flex flex-col">
              <span className="font-mono text-[10px] text-[var(--color-primary-text)] bg-[var(--color-background)] border-thin px-3 py-1 uppercase tracking-widest w-fit mb-4 rounded">
                WEB GL
              </span>
              <h3 className="text-2xl font-serif font-bold text-[var(--color-primary-text)] mb-3">
                AI Battle Arena
              </h3>
              <p className="text-[var(--color-secondary-text)] font-light text-sm leading-relaxed">
                Competitive algorithmic environment simulating high-speed neural network interactions.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full border-thin bg-[var(--color-surface)] rounded-xl overflow-hidden flex flex-col"
          >
            <div className="w-full h-64 bg-black relative p-2">
               <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src={moodifyImg} 
                    alt="Moodify" 
                    className="w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                  />
               </div>
            </div>
            <div className="p-8 flex flex-col">
              <span className="font-mono text-[10px] text-[var(--color-primary-text)] bg-[var(--color-background)] border-thin px-3 py-1 uppercase tracking-widest w-fit mb-4 rounded">
                NLP | AUDIO
              </span>
              <h3 className="text-2xl font-serif font-bold text-[var(--color-primary-text)] mb-3">
                Moodify
              </h3>
              <p className="text-[var(--color-secondary-text)] font-light text-sm leading-relaxed">
                Mathematical emotional state mapping translated into high-fidelity auditory experiences.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </AnimatedSection>
  );
}
