import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('adminToken', data.data.token);
      toast.success('Login successful');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4">
      <div className="max-w-md w-full bg-[var(--color-surface)] p-8 rounded border-thin">
        <h2 className="text-3xl font-serif font-bold mb-6 text-[var(--color-primary-text)]">Admin Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-sm tracking-wider text-[var(--color-secondary-text)] uppercase">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-b border-[var(--color-border-custom)] py-2 focus:outline-none focus:border-[var(--color-accent)] transition-colors text-[var(--color-primary-text)]"
              required 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-mono text-sm tracking-wider text-[var(--color-secondary-text)] uppercase">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-b border-[var(--color-border-custom)] py-2 focus:outline-none focus:border-[var(--color-accent)] transition-colors text-[var(--color-primary-text)]"
              required 
            />
          </div>

          <button type="submit" className="mt-4 px-6 py-3 bg-[var(--color-accent)] text-[var(--color-background)] font-medium rounded hover:bg-opacity-90 transition-colors">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
