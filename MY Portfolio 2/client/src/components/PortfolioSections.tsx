import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Download, Github, Linkedin, Twitter, Mail, Search, Filter, Cpu, 
  MapPin, Calendar, Heart, Eye, Award, ExternalLink, GraduationCap, Code2, 
  Send, Terminal, Flame, BookCheck, BriefcaseBusiness
} from 'lucide-react';
import { Project, Education, Experience, SkillCategory, PortfolioStats } from '../types.js';

// ==========================================================
// ASYMMETRICAL EDITORIAL SECTION HEADINGS (2026 SIGNATURE)
// ==========================================================
const SectionHeading: React.FC<{ 
  number: string; 
  title: string; 
  subtitle: string;
}> = ({ number, title, subtitle }) => {
  return (
    <div className="mb-16 text-left border-b border-neutral-200/50 dark:border-white/5 pb-8">
      <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase">
        <span>{number}</span>
        <span className="text-indigo-500 dark:text-[#06B6D4] font-bold">//</span>
        <span>{subtitle}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-900 dark:text-slate-100 mt-3 font-sans">
        {title} <span className="font-serif italic font-light text-indigo-500 dark:text-[#06B6D4]">portfolio.</span>
      </h2>
    </div>
  );
};

// ==========================================================
// TYPING EFFECT UTILITY
// ==========================================================
const TypingAnimation: React.FC = () => {
  const roles = [
    "Autonomous System Architect",
    "MERN Stack Specialist",
    "Generative AI Engineer",
    "Context-Aware Prompt Designer"
  ];
  
  const [currentRoleIdx, setCurrentRoleIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const role = roles[currentRoleIdx];
    const typingSpeed = isDeleting ? 30 : 60;
    
    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(role.substring(0, displayText.length + 1));
        if (displayText.length === role.length) {
          timer = setTimeout(() => setIsDeleting(true), 2500);
          return;
        }
      } else {
        setDisplayText(role.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIdx((prev) => (prev + 1) % roles.length);
          return;
        }
      }
      
      timer = setTimeout(handleTyping, typingSpeed);
    };
    
    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIdx]);

  return (
    <span className="text-neutral-950 dark:text-slate-100 font-mono text-[13px] sm:text-sm font-semibold border-b border-neutral-950 dark:border-slate-300 pb-0.5 ml-1 select-none">
      {displayText}
    </span>
  );
};

// ==========================================================
// 1. HERO SECTION
// ==========================================================
export const Hero: React.FC<{ stats: PortfolioStats; onLike: () => void }> = ({ stats, onLike }) => {
  const [likeScale, setLikeScale] = useState(false);

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadDraftResume = () => {
    const cvContent = `
Nuruzzaman
MERN Stack & Generative AI Developer
Email: nuruzzaman31032001@gmail.com

Technical Focus:
- Node.js, React, MongoDB, Express (MERN Stack)
- Server-side LLM Integration, Vector Databases, Context-aware RAG pipelines
- Production systems engineering, TypeScript, cloud run optimization
    `;
    const blob = new Blob([cvContent.trim()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "Resume_Nuruzzaman_AI_Developer.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const triggerLike = () => {
    setLikeScale(true);
    onLike();
    setTimeout(() => setLikeScale(false), 200);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#FAF9F6] dark:bg-[#08080A]">
      
      {/* 2026 Architectural Grid Lines */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-neutral-200/40 dark:bg-white/5 pointer-events-none" />
      <div className="absolute inset-y-0 left-1/4 w-[1px] bg-neutral-200/20 dark:bg-white/[0.02] pointer-events-none" />
      <div className="absolute inset-y-0 right-1/4 w-[1px] bg-neutral-200/20 dark:bg-white/[0.02] pointer-events-none" />

      {/* Exquisite Low-Intensity Lighting */}
      <div className="absolute top-[10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-indigo-500/[0.03] dark:bg-[#6366F1]/[0.02] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[35rem] h-[35rem] rounded-full bg-cyan-500/[0.02] dark:bg-[#06B6D4]/[0.015] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Core Editorial Presentation */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <div className="inline-flex items-center space-x-3.5 px-3 py-1 bg-white/60 dark:bg-white/[0.02] border border-neutral-200/60 dark:border-white/5 rounded-full backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4] animate-ping" />
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
              Operational Index / Open for Collaboration
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-xs sm:text-sm font-mono tracking-wider text-neutral-400 dark:text-neutral-500">
              NURUZZAMAN — FULL-STACK AI ENGINEER
            </p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-neutral-800 dark:text-white leading-tight">
              Designing and building <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-[#06B6D4] dark:to-indigo-400">modern web applications</span> with MERN and AI.
            </h1>
          </div>

          <div className="text-sm text-neutral-500 dark:text-neutral-400 min-h-[2.5rem] flex items-center">
            Hi, I'm Nuruzzaman, a Full-Stack AI Engineer based in Assam, India.
          </div>

          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-lg">
            I build scalable web applications with the MERN stack and continuously explore Generative AI to create smarter, more capable software. I enjoy solving complex problems, designing intuitive user experiences, and turning ideas into reliable products that people love to use.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={handleDownloadDraftResume}
              className="group flex items-center space-x-2.5 px-6 py-3.5 rounded-full text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 transition-all duration-300 shadow-md shadow-neutral-900/10 active:scale-98"
            >
              <Download size={13} />
              <span>Retrieve Resume</span>
            </button>
            <button
              onClick={handleScrollToContact}
              className="flex items-center space-x-1.5 px-6 py-3.5 rounded-full text-xs font-bold text-neutral-600 dark:text-slate-300 bg-white/80 hover:bg-white dark:bg-white/[0.03] dark:hover:bg-white/[0.08] border border-neutral-200 dark:border-white/5 transition-all duration-300 active:scale-98"
            >
              <span>Initiate Dialogue</span>
              <ArrowRight size={13} className="ml-0.5 text-neutral-400 group-hover:translate-x-0.5 transition" />
            </button>
          </div>

          {/* Social Row */}
          <div className="flex items-center space-x-4 pt-4 border-t border-neutral-200/40 dark:border-white/[0.03] max-w-xs">
            <span className="text-[10px] font-mono tracking-wider text-neutral-400">CONNECT</span>
            <div className="flex space-x-2.5">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition">
                <Github size={14} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition">
                <Linkedin size={14} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition">
                <Twitter size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Interaction Panel (No clichés, pure custom elegance) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="relative group w-full max-w-[25rem] mx-auto rounded-[2rem] p-6 bg-white dark:bg-[#121215] border border-neutral-200/60 dark:border-white/5 shadow-xl shadow-neutral-200/20 dark:shadow-none overflow-hidden transition-all duration-300 hover:border-neutral-300 dark:hover:border-white/10">
            
            {/* Visual Header / Avatar Container */}
            <div className="flex items-center space-x-4 pb-6 border-b border-neutral-100 dark:border-white/5">
              <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-white/10 shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80" 
                  alt="Nuruzzaman"
                  className="h-full w-full object-cover grayscale brightness-95 contrast-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-semibold text-neutral-800 dark:text-slate-100">Nuruzzaman</h3>
                <p className="text-[10px] font-mono text-neutral-400 mt-0.5">EST. GAUHATI, ASSAM</p>
                <span className="text-[10px] font-mono text-emerald-500 font-bold flex items-center space-x-1 mt-1">
                  <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse mr-1" />
                  STABLE SYNC
                </span>
              </div>
            </div>

            {/* Live Metrics Table */}
            <div className="py-6 space-y-4 text-xs font-mono">
              <div className="flex justify-between items-center text-left">
                <span className="text-neutral-400">ROUTE GATEWAY</span>
                <span className="text-neutral-800 dark:text-slate-200 font-bold">PORT_3000 / HOST_CLOUD</span>
              </div>
              <div className="flex justify-between items-center text-left">
                <span className="text-neutral-400">SYNCHRONIZED AUDIENCE</span>
                <span className="text-neutral-800 dark:text-slate-200 font-bold">{stats.visitors} INSTANCES</span>
              </div>
              <div className="flex justify-between items-center text-left">
                <span className="text-neutral-400">TELEMETRY CLICKS</span>
                <span className="text-neutral-800 dark:text-slate-200 font-bold">{stats.projectClicks} POINTS</span>
              </div>
              <div className="flex justify-between items-center text-left">
                <span className="text-neutral-400">INBOX MESSAGES LOGGED</span>
                <span className="text-neutral-800 dark:text-slate-200 font-bold">{stats.messagesReceived} DATA_NODES</span>
              </div>
            </div>

            {/* Custom Interactive Click Dial */}
            <div className="mt-2 pt-5 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between">
              <span className="text-[10px] text-neutral-400 font-mono">REPUTATION REGISTER</span>
              <motion.button 
                onClick={triggerLike}
                animate={{ scale: likeScale ? 0.92 : 1 }}
                className="flex items-center space-x-2 px-4 py-2 bg-neutral-50 hover:bg-neutral-100 dark:bg-white/5 dark:hover:bg-white/10 text-neutral-700 dark:text-slate-300 hover:text-red-500 transition rounded-xl font-bold text-xs select-none border border-neutral-200/50 dark:border-white/5"
              >
                <Heart size={12} className="fill-current text-indigo-500 dark:text-[#06B6D4]" />
                <span className="font-mono">{stats.likes} Sync Points</span>
              </motion.button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

// ==========================================================
// 2. ABOUT ME SECTION
// ==========================================================
export const About: React.FC = () => {
  return (
    <section id="about" className="py-28 bg-white dark:bg-[#070709] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading number="01" title="About Me" subtitle="ABOUT THE ENGINEER" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start text-left">
          
          {/* Subtle Workspace Photography (Minimalist grayscale) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-[2rem] overflow-hidden border border-neutral-200 dark:border-white/5 bg-neutral-50 dark:bg-neutral-900">
              <img 
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" 
                alt="Architectural space"
                className="w-full h-80 object-cover grayscale contrast-110 saturate-50 hover:scale-102 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/80 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-white/[0.015] border border-neutral-200/50 dark:border-white/5 flex items-start space-x-3.5">
              <Terminal size={16} className="text-indigo-500 dark:text-[#06B6D4] mt-0.5" />
              <div>
                <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">SYSTEM STATUS</p>
                <p className="text-xs text-neutral-550 dark:text-neutral-300 leading-normal mt-1 font-sans">
                  Active stack builds, model performance benchmarks, and RAG architectures are fully functional. This digital interface is synchronized with Cloud SQL and live API components.
                </p>
              </div>
            </div>
          </div>

          {/* Description & Technical Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl sm:text-2xl font-light tracking-tight text-neutral-900 dark:text-slate-100">
              Technology has always been more than just a career path for me—it's a way to create <span className="font-serif italic font-light text-indigo-550 dark:text-[#06B6D4]">meaningful solutions.</span>
            </h3>
            
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 leading-relaxed">
              I recently completed my Master's degree in Information Technology and have dedicated my time to building full-stack applications that combine clean design, scalable architecture, and practical functionality. My work spans modern web development, backend systems, REST APIs, authentication, database design, and cloud deployment.
            </p>
            
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 leading-relaxed">
              Beyond traditional web development, I'm expanding my expertise into Generative AI and intelligent applications. I'm particularly interested in how AI can improve user experiences, automate workflows, and help build products that solve real-world problems.
            </p>
            
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 leading-relaxed">
              I believe the best software is simple, reliable, and thoughtfully designed. Whether I'm building from scratch or improving an existing product, I focus on writing maintainable code, paying attention to details, and continuously learning better ways to build.
            </p>

            <p className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 leading-relaxed">
              When I'm not developing applications, you'll usually find me exploring new technologies, studying software architecture, improving my problem-solving skills, or experimenting with new ideas that challenge me to grow as an engineer.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
};

// ==========================================================
// 3. EDUCATION TIMELINE SECTION
// ==========================================================
export const EducationSection: React.FC<{ education: Education[] }> = ({ education }) => {
  return (
    <section id="education" className="py-28 bg-[#FAF9F6] dark:bg-[#08080A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading number="02" title="Education" subtitle="ACADEMIC BACKGROUND" />

        {/* Minimal Editorial Timeline Row */}
        <div className="max-w-4xl mx-auto relative border-l border-neutral-200/60 dark:border-white/5 pl-8 space-y-12 text-left">
          {education.map((edu, idx) => (
            <motion.div 
              key={edu.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Pin Node */}
              <div className="absolute -left-[39px] top-2 h-3.5 w-3.5 rounded-full border border-neutral-300 dark:border-slate-800 bg-[#FAF9F6] dark:bg-[#08080A] group-hover:bg-indigo-550 dark:group-hover:bg-[#06B6D4] transition duration-300" />

              <div className="space-y-3 pb-8 border-b border-neutral-200/40 dark:border-white/[0.03]">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-wider text-indigo-500 dark:text-[#06B6D4]">
                      {edu.duration}
                    </span>
                    <h3 className="text-lg sm:text-xl font-light text-neutral-900 dark:text-slate-100">
                      {edu.degree}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-3">
                    {edu.cgpa && (
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-250 dark:bg-white/5 border dark:border-white/5 text-neutral-700 dark:text-indigo-400 rounded">
                        GRADE: {edu.cgpa}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-600 dark:text-slate-350">
                  <GraduationCap size={14} className="text-neutral-400 shrink-0" />
                  <span>{edu.institution}</span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 leading-relaxed max-w-3xl">
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

// ==========================================================
// 4. SKILLS INVENTORY GAUGE
// ==========================================================
export const Skills: React.FC<{ skills: SkillCategory[] }> = ({ skills }) => {
  return (
    <section id="skills" className="py-28 bg-white dark:bg-[#070709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading number="03" title="Engineered Skillscape" subtitle="SPECIALTY DISCIPLINE" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {skills.map((category) => (
            <div 
              key={category.id} 
              className="p-6 rounded-[2rem] bg-neutral-50 dark:bg-[#121215] border border-neutral-200/60 dark:border-white/5 hover:border-neutral-300 dark:hover:border-white/10 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xs font-extrabold text-neutral-800 dark:text-slate-200 uppercase tracking-widest flex items-center space-x-2.5 pb-4 border-b border-neutral-200/60 dark:border-white/5">
                  <Code2 size={14} className="text-indigo-500 dark:text-[#06B6D4]" />
                  <span>{category.name}</span>
                </h3>

                <div className="flex flex-wrap gap-2 mt-5">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-3 py-1.5 bg-white dark:bg-white/[0.03] border border-neutral-200/50 dark:border-white/5 text-xs text-neutral-600 dark:text-slate-300 font-mono tracking-tight rounded-xl"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// ==========================================================
// 5. PROJECTS SECTION (GALLERY GRID + MODAL DETAIL)
// ==========================================================
export const Projects: React.FC<{ 
  projects: Project[]; 
  onProjectClick: (id: string) => void; 
}> = ({ projects, onProjectClick }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechFilter, setSelectedTechFilter] = useState('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const popularTechs = [
    'All', 'React.js', 'Node.js', 'MongoDB', 'Google Gemini API', 'LangChain', 'TypeScript'
  ];

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech = selectedTechFilter === 'All' || p.technologies.some(t => t.toLowerCase() === selectedTechFilter.toLowerCase());
    const matchesCategory = selectedCategoryFilter === 'All' || p.category === selectedCategoryFilter;
    return matchesSearch && matchesTech && matchesCategory;
  });

  const handleOpenDetailModal = (proj: Project) => {
    setSelectedProject(proj);
    onProjectClick(proj.id);
  };

  return (
    <section id="projects" className="py-28 bg-[#FAF9F6] dark:bg-[#08080A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading number="04" title="Selected Projects" subtitle="PROJECT PORTFOLIO" />

        <div className="mb-12 max-w-4xl space-y-4 text-left">
          <p className="text-xl sm:text-2xl font-light tracking-tight text-neutral-900 dark:text-slate-100">
            I believe projects should demonstrate problem-solving rather than simply showcase technology. Each application below was built to explore real-world challenges while improving architecture, scalability, and user experience.
          </p>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 leading-relaxed">
            Every project reflects my focus on clean code, scalable architecture, responsive design, and delivering meaningful user experiences.
          </p>
        </div>

        {/* Dynamic Navigation index style Filter operations panel */}
        <div className="bg-white dark:bg-[#121215] border border-neutral-200/60 dark:border-white/5 p-6 rounded-[2rem] gap-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between shadow-xs mb-12 text-left">
          
          {/* Text Search Field */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-3.5 flex items-center pr-1 text-neutral-400">
              <Search size={14} />
            </span>
            <input 
              type="text" 
              placeholder="Search index keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-3 bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/60 dark:border-white/5 rounded-xl text-neutral-850 dark:text-slate-100 focus:outline-none focus:border-indigo-500/50"
            />
          </div>

          {/* Minimal Horizon Lists (Categories & Tech selection) */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="space-y-1 text-left">
              <span className="text-[9px] font-mono text-neutral-450 uppercase block">GRID FILTRATION</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-mono uppercase tracking-widest transition-all duration-200 ${
                      selectedCategoryFilter === cat 
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-bold' 
                        : 'bg-neutral-50 hover:bg-neutral-100 dark:bg-white/5 dark:hover:bg-white/10 text-neutral-500 dark:text-neutral-400 ring-1 ring-neutral-200/40 dark:ring-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1 text-left">
              <span className="text-[9px] font-mono text-neutral-450 uppercase block">CORE FRAMEWORK</span>
              <select
                value={selectedTechFilter}
                onChange={(e) => setSelectedTechFilter(e.target.value)}
                className="text-xs px-3 py-1.5 bg-neutral-50 dark:bg-white/5 border border-neutral-200/60 dark:border-white/5 text-neutral-600 dark:text-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {popularTechs.map((tech, idx) => (
                  <option key={idx} value={tech} className="bg-white dark:bg-[#121215]">{tech}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Exquisite visual layout column grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div 
                layout
                key={proj.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-[28rem] rounded-[2rem] overflow-hidden border border-neutral-200/50 dark:border-white/5 bg-white dark:bg-[#121215] group shadow-xs hover:shadow-xl hover:border-neutral-300 dark:hover:border-white/10 transition-all duration-300 text-left"
              >
                {/* Project Banner Image */}
                <div className="h-44 overflow-hidden relative border-b border-neutral-100 dark:border-white/5 bg-neutral-50 dark:bg-[#08080A]">
                  <img 
                    src={proj.image} 
                    alt={proj.name}
                    className="w-full h-full object-cover grayscale contrast-110 saturate-50 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 px-2.5 py-1 bg-white/90 dark:bg-[#121215]/90 backdrop-blur-md rounded-lg text-[9px] font-mono uppercase tracking-widest text-indigo-600 dark:text-[#06B6D4] border border-neutral-200/50 dark:border-white/5">
                    {proj.category}
                  </div>
                </div>

                {/* Body details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3.5">
                    <h3 className="text-lg font-light text-neutral-900 dark:text-slate-100 group-hover:text-indigo-550 dark:group-hover:text-[#06B6D4] transition duration-200 font-sans">
                      {proj.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-450 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div>
                    {/* Technologies layout tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5 pt-2">
                      {proj.technologies.slice(0, 4).map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 bg-neutral-50 dark:bg-white/5 border border-neutral-200/50 dark:border-white/5 text-[9px] text-neutral-500 dark:text-slate-400 rounded-md font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between border-t border-neutral-100 dark:border-white/5 pt-4">
                      <div className="flex items-center space-x-1.5 text-neutral-400 font-mono text-[10px]">
                        <Eye size={12} />
                        <span>{proj.views || 0} sync clicks</span>
                      </div>
                      <button
                        onClick={() => handleOpenDetailModal(proj)}
                        className="text-xs font-bold text-neutral-800 dark:text-slate-200 group-hover:text-indigo-500 dark:group-hover:text-[#06B6D4] flex items-center space-x-1 hover:underline"
                      >
                        <span>Analyze Insights</span>
                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic Empty indicator fallback */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-[#121215] border border-dashed border-neutral-200 dark:border-white/5 rounded-[2rem]">
            <Cpu size={28} className="mx-auto text-neutral-300 mb-3" />
            <p className="text-xs text-neutral-400 font-mono tracking-widest uppercase">ZERO MATCHES LOGGED</p>
            <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto leading-relaxed">
              Adjust search strings or reset filtration lists to discover compiled projects.
            </p>
          </div>
        )}

        {/* High-fidelity Details Modal Panel overlay */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-[#070709]/80 backdrop-blur-md flex items-center justify-center p-4">
              <motion.div 
                initial={{ scale: 0.97, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.97, y: 15, opacity: 0 }}
                className="max-w-2xl w-full rounded-[2rem] border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#121215] shadow-2xl overflow-hidden text-left"
              >
                {/* Visual Image Header */}
                <div className="h-56 relative bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-100 dark:border-white/5">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.name}
                    className="w-full h-full object-cover grayscale contrast-110 saturate-50"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#121215] via-transparent to-transparent pointer-events-none" />
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/90 dark:bg-white/5 backdrop-blur-sm shadow flex items-center justify-center text-xs text-neutral-700 dark:text-neutral-300 hover:scale-105 transition border dark:border-white/10"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  {/* Category + Title */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-500 dark:text-[#06B6D4]">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-2xl font-light text-neutral-950 dark:text-white">
                      {selectedProject.name}
                    </h3>
                  </div>

                  {/* Description detail */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Architectural Summary</h4>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-slate-300 leading-relaxed font-sans">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Highlights Bulleting list */}
                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <div className="space-y-2.5">
                      <h4 className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">INTELLIGENT SYSTEM PERSPECTIVES</h4>
                      <ul className="space-y-2 text-xs text-neutral-500 dark:text-slate-400 font-sans">
                        {selectedProject.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start space-x-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-[#06B6D4] mt-2 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech stack mapping */}
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">ENGINE WORKSPACES</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-2.5 py-1 bg-neutral-50 dark:bg-white/5 border border-neutral-200/50 dark:border-white/5 text-[10px] text-neutral-700 dark:text-indigo-400 font-mono rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div className="flex flex-wrap items-center justify-between pt-5 border-t border-neutral-100 dark:border-white/5 gap-4">
                    <span className="text-[9px] font-mono text-neutral-400">
                      METRIC REGISTER: {selectedProject.views || 0} CLICKS LOGGED
                    </span>
                    <div className="flex items-center space-x-3">
                      {selectedProject.githubLink && (
                        <a 
                          href={selectedProject.githubLink} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center space-x-1.5 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10 text-neutral-700 dark:text-slate-300 rounded-xl text-xs font-bold transition"
                        >
                          <Github size={12} />
                          <span>Codehouse</span>
                        </a>
                      )}
                      
                      {selectedProject.liveLink && (
                        <a 
                          href={selectedProject.liveLink} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center space-x-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-150 text-white rounded-xl text-xs font-bold transition"
                        >
                          <ExternalLink size={12} />
                          <span>Deploy Workspace</span>
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

// ==========================================================
// 6. CAREER TIMELINE SECTION
// ==========================================================
export const ExperienceSection: React.FC<{ experience: Experience[] }> = ({ experience }) => {
  return (
    <section id="experience" className="py-28 bg-white dark:bg-[#070709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading number="05" title="Professional Track" subtitle="INTELLIGENT REPUTATIONS LOG" />

        {experience.length > 0 ? (
          <div className="max-w-4xl mx-auto relative border-l border-neutral-200/60 dark:border-white/5 pl-8 space-y-12 text-left">
            {experience.map((exp, idx) => (
              <div key={exp.id} className="relative group">
                <div className="absolute -left-[39px] top-2 h-3.5 w-3.5 rounded-full border border-neutral-300 dark:border-slate-800 bg-white dark:bg-[#070709] group-hover:bg-[#06B6D4] transition duration-300" />
                
                <div className="space-y-3 pb-8 border-b border-neutral-200/40 dark:border-white/[0.03]">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-wider text-indigo-550 dark:text-[#06B6D4]">
                        {exp.duration}
                      </span>
                      <h4 className="text-lg sm:text-xl font-light text-neutral-900 dark:text-slate-100">
                        {exp.role}
                      </h4>
                    </div>
                    <span className="text-xs font-semibold text-neutral-500 py-1 font-mono">
                      {exp.company}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 leading-relaxed max-w-3xl">
                    {exp.description}
                  </p>

                  {/* Tech tokens used */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.technologies.map((t, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 bg-neutral-50 dark:bg-white/5 text-[9px] text-neutral-550 dark:text-slate-450 border border-neutral-200/40 dark:border-white/5 rounded font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* High-end design placeholder */
          <div className="max-w-xl mx-auto text-center py-16 bg-neutral-50 dark:bg-[#121215] border border-dashed border-neutral-200 dark:border-white/5 rounded-[2rem]">
            <BriefcaseBusiness size={24} className="mx-auto text-neutral-350 mb-3" />
            <h4 className="text-sm font-semibold text-neutral-800 dark:text-slate-350">Historical details in queue</h4>
            <p className="text-xs text-neutral-500 mt-2 max-w-xs mx-auto leading-relaxed">
              Industrial records are undergoing alignment and classification and will sync dynamically from the administrative panel soon.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

// ==========================================================
// 7. ROADMAP & ACCOMPLISHMENTS SECTION
// ==========================================================
export const Certifications: React.FC = () => {
  const awards = [
    {
      type: "Certification",
      title: "Google Advanced Generative AI Specialist",
      issuer: "Coursera / Google Cloud",
      date: "May 2025",
      desc: "Expertise in tuning fine models architectures, deploying specialized Gemini endpoints with system context chains, and orchestrating vectors."
    },
    {
      type: "Hackathon Award",
      title: "1st Place - Smart City Hackathon India",
      issuer: "Ministry of Electronics & IT",
      date: "Nov 2024",
      desc: "Architected a synchronized municipal route priority system via MERN workspaces matched with index vector embeddings."
    },
    {
      type: "Master Class",
      title: "Advanced Vector DB Architectures & Hybrid Graph RAG",
      issuer: "MongoDB Dev Community",
      date: "Jan 2025",
      desc: "Hands-on structural configuration of graph database integration frameworks, semantic routing, and hierarchical prompt embeddings."
    },
    {
      type: "Professional Course",
      title: "Microservices Container Architectures & Proxies",
      issuer: "Udemy Professional Academy",
      date: "Jul 2024",
      desc: "Deep knowledge in Docker ingress networks, Node CJS bundling strategies, Nginx reverse proxy layouts, and secure JWT headers."
    }
  ];

  return (
    <section id="certifications" className="py-28 bg-[#FAF9F6] dark:bg-[#08080A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading number="06" title="Roadmap & Honors" subtitle="RECOGNITION METRIC HISTORY" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {awards.map((award, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-[2rem] bg-white dark:bg-[#121215] border border-neutral-200/60 dark:border-white/5 hover:border-neutral-300 dark:hover:border-white/10 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 pb-3 border-b border-neutral-100 dark:border-white/5">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-indigo-500 dark:text-[#06B6D4]">
                    {award.type}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">{award.date}</span>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-neutral-850 dark:text-slate-100 flex items-start space-x-2">
                    <Award size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    <span>{award.title}</span>
                  </h3>
                  <p className="text-[11px] text-neutral-450 dark:text-slate-400">Issued by: {award.issuer}</p>
                </div>

                <p className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 leading-relaxed pt-2">
                  {award.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// ==========================================================
// 8. CONTACT SECTION
// ==========================================================
export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMsg('Please populate all inputs before submitting message.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (res.ok) {
        setSuccessMsg(data.message || 'Thank you! Your message was submitted successfully and logged to the master log.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMsg(data.error || 'Server rejected message submission.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error. Unable to synchronize Contact form to Node server operations.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-28 bg-white dark:bg-[#070709] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading number="07" title="Dialogue Initiation" subtitle="GET IN TOUCH" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 text-left">
          
          {/* Left Column: Direct Ingress Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-[2rem] bg-neutral-50 dark:bg-[#121215] border border-neutral-200/60 dark:border-white/5 space-y-6">
              <h3 className="text-xl sm:text-2xl font-light text-neutral-900 dark:text-slate-100">
                Direct Inbound <span className="font-serif italic font-light text-indigo-500 dark:text-[#06B6D4]">channel.</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 leading-relaxed font-sans">
                Whether seeking custom full-stack solutions, context-aware Generative AI frameworks, or architectural audits, write a direct transmission packet. I log, compile, and reply to all dialogue requests within 24 hours.
              </p>

              <div className="space-y-4 pt-3 text-xs sm:text-sm">
                <div className="flex items-center space-x-3.5 text-neutral-600 dark:text-slate-350">
                  <Mail size={14} className="text-indigo-500 dark:text-[#06B6D4]" />
                  <span className="font-mono font-medium">nuruzzaman31032001@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3.5 text-neutral-600 dark:text-slate-350">
                  <MapPin size={14} className="text-indigo-500 dark:text-[#06B6D4]" />
                  <span>Guwahati, Assam, India</span>
                </div>
              </div>
            </div>

            {/* Social channels capsule */}
            <div className="p-6 rounded-[2rem] bg-neutral-50 dark:bg-[#121215] border border-neutral-200/60 dark:border-white/5 flex flex-col justify-center space-y-4">
              <h4 className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">ENCRYPTED PUBLIC KEYS</h4>
              <div className="flex gap-3">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-1 py-3.5 bg-white dark:bg-white/[0.03] rounded-xl border border-neutral-200 dark:border-white/5 flex items-center justify-center space-x-2 font-bold text-xs text-neutral-700 dark:text-slate-200 hover:border-neutral-400 dark:hover:border-white/20 transition-all duration-300"
                >
                  <Github size={12} />
                  <span>GitHub</span>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-1 py-3.5 bg-white dark:bg-white/[0.03] rounded-xl border border-neutral-200 dark:border-white/5 flex items-center justify-center space-x-2 font-bold text-xs text-neutral-700 dark:text-slate-200 hover:border-neutral-400 dark:hover:border-white/20 transition-all duration-300"
                >
                  <Linkedin size={12} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Minimalist Form layout */}
          <div className="lg:col-span-7">
            <form 
              onSubmit={handleFormSubmit}
              className="p-8 rounded-[2rem] bg-neutral-50 dark:bg-[#121215] border border-neutral-200/60 dark:border-white/5 space-y-6"
            >
              <h3 className="text-lg font-light text-neutral-900 dark:text-slate-100 font-sans">
                Transmit Packet Message
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-neutral-400 font-mono uppercase block">01 / Your Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="E.g., Dr. Mitchell"
                    className="w-full text-xs px-3.5 py-3 border-b border-neutral-200 focus:border-neutral-800 dark:border-white/10 dark:focus:border-white bg-transparent text-neutral-800 dark:text-slate-100 focus:outline-none transition duration-200"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-neutral-400 font-mono uppercase block">02 / Return Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="return@namespace.io"
                    className="w-full text-xs px-3.5 py-3 border-b border-neutral-200 focus:border-neutral-800 dark:border-white/10 dark:focus:border-white bg-transparent text-neutral-800 dark:text-slate-100 focus:outline-none transition duration-200"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-neutral-400 font-mono uppercase block">03 / Subject Matter</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="System integration request..."
                  className="w-full text-xs px-3.5 py-3 border-b border-neutral-200 focus:border-neutral-800 dark:border-white/10 dark:focus:border-white bg-transparent text-neutral-800 dark:text-slate-100 focus:outline-none transition duration-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-neutral-400 font-mono uppercase block">04 / Detailed Transcript</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Draft project specifications, timelines, or scopes..."
                  className="w-full text-xs px-3.5 py-3.5 border-b border-neutral-200 focus:border-neutral-800 dark:border-white/10 dark:focus:border-white bg-transparent text-neutral-800 dark:text-slate-100 focus:outline-none transition duration-200"
                  required
                />
              </div>

              {/* Status display alerts */}
              {errorMsg && (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-mono rounded-xl border border-red-200/40 dark:border-red-900/40">
                  ERROR_CODE // {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-605 dark:text-emerald-400 text-xs font-mono rounded-xl border border-emerald-250/40 dark:border-emerald-900/40">
                  SYNC_CODE_OK // {successMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-neutral-950 hover:bg-neutral-900 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 disabled:opacity-60 text-white rounded-xl text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2 active:scale-98"
              >
                <Send size={12} />
                <span>{isSubmitting ? 'TRANSMITTING PACKET...' : 'TRANSMIT MESSAGE'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
