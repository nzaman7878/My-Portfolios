import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeContext.js';
import { Navbar } from './components/Navbar.js';
import { AiAssistant } from './components/AiAssistant.js';
import { AdminDashboard } from './components/AdminDashboard.js';
import { 
  Hero, About, EducationSection, Skills, Projects, ExperienceSection, Certifications, ContactSection 
} from './components/PortfolioSections.js';
import { Project, Education, Experience, SkillCategory, PortfolioStats, SiteSettings } from './types.js';
import { Cpu, Terminal, ArrowUp, Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'portfolio' | 'admin'>(() => {
    return window.location.pathname === '/admin' ? 'admin' : 'portfolio';
  });

  useEffect(() => {
    if (currentView === 'admin' && window.location.pathname !== '/admin') {
      window.history.pushState(null, '', '/admin');
    } else if (currentView === 'portfolio' && window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
  }, [currentView]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(window.location.pathname === '/admin' ? 'admin' : 'portfolio');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);

  // Database Resources States
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [experienceList, setExperienceList] = useState<Experience[]>([]);
  const [skillsList, setSkillsList] = useState<SkillCategory[]>([]);
  const [statsData, setStatsData] = useState<PortfolioStats>({
    visitors: 0,
    projectClicks: 0,
    messagesReceived: 0,
    likes: 0
  });
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  const [loadingResources, setLoadingResources] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Refresh resource arrays from backend API
  const refreshAllResources = async () => {
    try {
      const [projRes, eduRes, expRes, skillRes, statsRes, settingsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/education'),
        fetch('/api/experience'),
        fetch('/api/skills'),
        fetch('/api/stats'),
        fetch('/api/settings')
      ]);

      if (projRes.ok) setProjectsList(await projRes.json());
      if (eduRes.ok) setEducationList(await eduRes.json());
      if (expRes.ok) setExperienceList(await expRes.json());
      if (skillRes.ok) setSkillsList(await skillRes.json());
      if (statsRes.ok) setStatsData(await statsRes.json());
      if (settingsRes.ok) setSiteSettings(await settingsRes.json());
    } catch (err) {
      console.error("Error fetching repository documents:", err);
    } finally {
      setLoadingResources(false);
    }
  };

  // Run on initial mounting
  useEffect(() => {
    refreshAllResources();

    // Check for active token via cookie automatically
    fetch('/api/auth/verify', {
      // credentials: 'same-origin' is handled by proxy/default, but we can be explicit
      // if using Vite proxy it just works
    }).then(res => {
      if (res.ok) {
        setIsAdminLoggedIn(true);
      } else {
        setIsAdminLoggedIn(false);
      }
    }).catch(() => {
      setIsAdminLoggedIn(false);
    });

    // Scroll top monitor
    const monitorScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', monitorScroll);
    return () => window.removeEventListener('scroll', monitorScroll);
  }, []);

  // Handle Admin Auth Success
  const handleAdminSuccess = (username: string) => {
    setIsAdminLoggedIn(true);
  };

  // Handle Logout Trigger
  const handleLogoutAdmin = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    setIsAdminLoggedIn(false);
    setCurrentView('portfolio');
  };

  // Trigger Likes Call
  const handleLikeSubmit = async () => {
    try {
      const res = await fetch('/api/stats/like', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setStatsData(prev => ({ ...prev, likes: data.likes }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Trigger metrics clicks on individual projects
  const handleIncrementProjectClick = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}/click`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        // Update states dynamically
        setProjectsList(prev => prev.map(p => p.id === id ? { ...p, views: data.projectViews } : p));
        setStatsData(prev => ({ ...prev, projectClicks: data.totalClicks }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Scroll back to top
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading Splash Screen state
  if (loadingResources) {
    return (
      <div className="min-h-screen bg-[#08080A] flex flex-col items-center justify-center text-neutral-100 font-sans p-6">
        <div className="relative flex items-center justify-center mb-8">
          <div className="h-16 w-16 rounded-full border border-neutral-800 border-t-indigo-500 animate-spin" />
          <span className="absolute text-[10px] font-mono tracking-widest text-[#06B6D4]">N</span>
        </div>
        <h2 className="text-xs font-semibold tracking-[0.25em] text-neutral-300 uppercase">Synchronizing files...</h2>
        <p className="text-[10px] text-neutral-500 font-mono mt-2 uppercase tracking-widest">NURUZZAMAN // PORTFOLIO REGISTER</p>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#08080A] text-neutral-900 dark:text-slate-100 font-sans transition-colors duration-300 antialiased overflow-x-hidden selection:bg-indigo-500 selection:text-white">
        
        {/* Navigation Layer */}
        <Navbar 
          currentView={currentView} 
          setView={setCurrentView} 
          isAdminLoggedIn={isAdminLoggedIn} 
          onLogout={handleLogoutAdmin} 
        />

        {/* View Router switches */}
        {currentView === 'portfolio' ? (
          <div className="relative">
            {/* Solid minimal background */}

            {/* 1. Hero */}
            {siteSettings && <Hero stats={statsData} onLike={handleLikeSubmit} settings={siteSettings} />}

            {/* 2. About Me */}
            {siteSettings && <About settings={siteSettings} />}

            {/* 3. Education Timeline */}
            <EducationSection education={educationList} />

            {/* 4. Skills Grid */}
            <Skills skills={skillsList} />

            {/* 5. Projects portfolio lists */}
            <Projects projects={projectsList} onProjectClick={handleIncrementProjectClick} />

            {/* 6. Professional Experiences */}
            <ExperienceSection experience={experienceList} />

            {/* 7. Achievements */}
            <Certifications />

            {/* 8. Contact Form and socials */}
            <ContactSection settings={siteSettings || undefined} />
            
            {/* Visual copyright footer */}
            <footer className="py-12 bg-white dark:bg-[#070709] border-t border-neutral-200/50 dark:border-white/5 text-center">
              <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest leading-relaxed">
                &copy; {new Date().getFullYear()} Nuruzzaman // MERN + Generative AI Architect Portfolio // Guwahati, India.
              </p>
            </footer>
          </div>
        ) : (
          <AdminDashboard 
            isAdminLoggedIn={isAdminLoggedIn}
            onLoginSuccess={handleAdminSuccess}
            onLogout={handleLogoutAdmin}
            projects={projectsList}
            education={educationList}
            experience={experienceList}
            skills={skillsList}
            stats={statsData}
            siteSettings={siteSettings}
            onRefreshData={refreshAllResources}
          />
        )}

        {/* Floating companion chatbot launcher */}
        {currentView === 'portfolio' && <AiAssistant />}

        {/* Dynamic scroll back to top capsule trigger */}
        {showScrollTop && (
          <button
            onClick={handleScrollToTop}
            className="fixed bottom-6 left-6 z-40 p-3 rounded-xl bg-white dark:bg-[#121215] text-neutral-700 dark:text-slate-300 shadow-md border border-neutral-200 dark:border-white/10 hover:scale-105 active:scale-95 transition"
            aria-label="Scroll back top"
          >
            <ArrowUp size={14} />
          </button>
        )}
      </div>
    </ThemeProvider>
  );
}
