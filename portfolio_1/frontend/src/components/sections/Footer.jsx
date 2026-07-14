export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-8 border-t border-[var(--color-border-custom)] flex flex-col md:flex-row items-center justify-between px-6 md:px-12 max-w-7xl mx-auto w-full text-sm text-[var(--color-secondary-text)]">
      <p>© {year} Nuruzzaman. All rights reserved.</p>
      <p className="mt-4 md:mt-0 flex items-center gap-2">
        Designed & Built with <span className="text-[var(--color-accent)] animate-pulse">♥</span>
      </p>
    </footer>
  );
}
