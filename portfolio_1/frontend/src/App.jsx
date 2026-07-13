import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Admin/Login';
import Dashboard from './components/Admin/Dashboard';
import ProtectedRoute from './components/Admin/ProtectedRoute';

function App() {
  return (
    <Router>
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
