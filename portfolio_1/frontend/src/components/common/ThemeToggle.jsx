import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-thin bg-surface hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-all duration-300 flex items-center justify-center relative overflow-hidden group w-10 h-10 ml-4"
      aria-label="Toggle Theme"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Sun 
          size={18} 
          className={`absolute transition-all duration-500 ease-in-out transform ${
            theme === 'dark' ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
          }`} 
        />
        <Moon 
          size={18} 
          className={`absolute transition-all duration-500 ease-in-out transform ${
            theme === 'light' ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
          }`} 
        />
      </div>
    </button>
  );
}
