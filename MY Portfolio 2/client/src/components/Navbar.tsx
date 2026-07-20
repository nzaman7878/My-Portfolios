import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext.js';
import { Sun, Moon, Menu, X, Landmark, CodeXml, Layers, Briefcase, Award, Contact, LayoutDashboard, LogOut } from 'lucide-react';

interface NavbarProps {
  currentView: 'portfolio' | 'admin';
  setView: (view: 'portfolio' | 'admin') => void;
  isAdminLoggedIn: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView, isAdminLoggedIn, onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleScrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setView('portfolio');
    
    // Allow view state to update then scroll
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/98 dark:bg-[#070709]/98 shadow-sm py-3 border-b border-neutral-200/50 dark:border-white/5' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => handleScrollToSection('hero')} 
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="h-8 w-8 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-950 font-bold transition group-hover:scale-105 shadow-sm border border-neutral-800 dark:border-neutral-200">
              N
            </div>
            <span className="font-semibold text-neutral-850 dark:text-slate-100 text-sm tracking-tight">
              Nuruzzaman <span className="text-neutral-500 dark:text-neutral-400 font-semibold text-xs pl-1">/ Full-Stack AI</span>
            </span>
          </div>

          {/* Desktop Nav Actions */}
          <div className="hidden lg:flex items-center space-x-7">
            {currentView === 'portfolio' && (
              <div className="flex items-center space-x-7">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleScrollToSection(link.id)}
                    className="text-xs text-neutral-600 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium tracking-wide transition"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-3 border-l border-neutral-300 dark:border-neutral-800 pl-6">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
                aria-label="Theme switch"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Admin Area Trigger */}
              {currentView === 'portfolio' ? (
                <button
                  onClick={() => setView('admin')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-102 transition shadow-sm active:scale-98"
                >
                  <LayoutDashboard size={14} />
                  <span>{isAdminLoggedIn ? 'Dashboard' : 'Admin Login'}</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setView('portfolio')}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 transition"
                  >
                    Exit Admin
                  </button>
                  {isAdminLoggedIn && (
                    <button
                      onClick={onLogout}
                      className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border border-red-200 dark:border-red-900/50 transition"
                    >
                      <LogOut size={13} />
                      <span>Logout</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Actions */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#070709] border-b border-neutral-200 dark:border-white/5 py-4 px-4 transition-all animate-fadeIn shadow-2xl">
          {currentView === 'portfolio' && (
            <div className="flex flex-col space-y-3 pb-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScrollToSection(link.id)}
                  className="text-left text-xs text-neutral-700 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold py-1.5 bg-neutral-50 dark:bg-neutral-900/50 px-3 rounded-lg border border-transparent hover:border-neutral-200"
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}

          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            {currentView === 'portfolio' ? (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setView('admin');
                }}
                className="flex items-center space-x-1.5 w-full justify-center py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition active:scale-98"
              >
                <LayoutDashboard size={14} />
                <span>{isAdminLoggedIn ? 'Dashboard' : 'Admin Login'}</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2 w-full">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setView('portfolio');
                  }}
                  className="flex-1 py-2 text-center rounded-xl text-xs font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800"
                >
                  Exit Admin
                </button>
                {isAdminLoggedIn && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="flex items-center justify-center space-x-1 px-3 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 dark:bg-red-950/20 border border-red-200"
                  >
                    <LogOut size={13} />
                    <span>Logout</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
