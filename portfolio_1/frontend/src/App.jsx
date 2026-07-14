import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Login from './components/Admin/Login';
import Dashboard from './components/Admin/Dashboard';
import SEO from './components/SEO';
import ProtectedRoute from './components/Admin/ProtectedRoute';

function App() {
  return (
    <Router>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: 'var(--color-surface)',
            color: 'var(--color-primary-text)',
            border: '1px solid var(--color-border-custom)',
          },
        }}
      />
      <SEO 
        title="Nuruzzaman - Software Engineer"
        description="Welcome to the portfolio of Nuruzzaman, a Software Engineer specializing in modern web development."
        image="https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
      />
      <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-primary-text)] font-sans selection:bg-[var(--color-accent)] selection:text-white overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
