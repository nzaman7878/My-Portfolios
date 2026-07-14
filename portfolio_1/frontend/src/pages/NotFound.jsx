import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/sections/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-24">
        <h1 className="text-6xl font-bold font-serif text-[var(--color-accent)] mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
        <p className="text-[var(--color-secondary-text)] max-w-md mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="px-8 py-3 bg-[var(--color-accent)] text-[var(--color-background)] rounded font-medium hover:opacity-90 transition-opacity"
        >
          Go Back Home
        </Link>
      </main>
      <Footer />
    </>
  );
}
