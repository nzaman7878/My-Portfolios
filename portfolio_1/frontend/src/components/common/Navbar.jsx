export default function Navbar() {
  return (
    <nav className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-8 flex items-center justify-between">
      <div className="font-sans font-bold text-lg tracking-tight">
        ARCHITECT.AI
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-[var(--color-secondary-text)] text-sm font-medium">
        <a href="#work" className="hover:text-[var(--color-accent)] transition-colors">Work</a>
        <a href="#philosophy" className="hover:text-[var(--color-accent)] transition-colors">Philosophy</a>
        <a href="#skills" className="hover:text-[var(--color-accent)] transition-colors">Capabilities</a>
      </div>

      <div>
        <a href="#contact" className="px-5 py-2.5 border-thin rounded hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-all text-sm font-medium">
          Let's Talk
        </a>
      </div>
    </nav>
  );
}
