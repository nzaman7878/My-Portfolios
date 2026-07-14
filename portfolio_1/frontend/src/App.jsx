import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import SEO from './components/common/SEO';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Lazy load admin components to split the bundle
const Login = lazy(() => import('./pages/Admin/Login'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const AdminProjects = lazy(() => import('./pages/Admin/AdminProjects'));
const AdminSettings = lazy(() => import('./pages/Admin/AdminSettings'));
const AdminExperience = lazy(() => import('./pages/Admin/AdminExperience'));
const AdminSkills = lazy(() => import('./pages/Admin/AdminSkills'));

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
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[var(--color-secondary-text)]">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<Login />} />
            
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="experience" element={<AdminExperience />} />
              <Route path="skills" element={<AdminSkills />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
