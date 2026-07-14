import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Settings', path: '/admin/settings' },
    { name: 'Projects', path: '/admin/projects' },
    { name: 'Experience', path: '/admin/experience' },
    { name: 'Skills', path: '/admin/skills' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-primary-text)] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[var(--color-border-custom)] flex flex-col justify-between">
        <div className="p-8">
          <h1 className="text-2xl font-serif font-bold mb-8">CMS Admin</h1>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink 
                key={item.name} 
                to={item.path}
                className={({ isActive }) => 
                  `px-4 py-2 rounded transition-colors ${isActive ? 'bg-[var(--color-accent)] text-[var(--color-background)]' : 'hover:bg-[var(--color-surface)] text-[var(--color-secondary-text)] hover:text-[var(--color-primary-text)]'}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="p-8 border-t border-[var(--color-border-custom)]">
          <button 
            onClick={handleLogout} 
            className="w-full text-left px-4 py-2 border-thin rounded hover:bg-[var(--color-surface)] transition-colors text-[var(--color-secondary-text)] hover:text-[var(--color-primary-text)]"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto h-screen">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
