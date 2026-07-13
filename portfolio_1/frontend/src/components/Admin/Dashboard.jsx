import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('messages');
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchMessages();
    fetchProjects();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setMessages(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/projects');
      const data = await res.json();
      if (res.ok) setProjects(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-primary-text)] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-[var(--color-border-custom)]">
          <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
          <button onClick={handleLogout} className="px-4 py-2 border-thin rounded hover:bg-[var(--color-surface)] transition-colors">
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded ${activeTab === 'messages' ? 'bg-[var(--color-accent)] text-[var(--color-background)]' : 'bg-[var(--color-surface)] border-thin'}`}
          >
            Messages
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded ${activeTab === 'projects' ? 'bg-[var(--color-accent)] text-[var(--color-background)]' : 'bg-[var(--color-surface)] border-thin'}`}
          >
            Projects
          </button>
        </div>

        {activeTab === 'messages' && (
          <div className="flex flex-col gap-4">
            {messages.length === 0 ? <p className="text-[var(--color-secondary-text)]">No messages yet.</p> : messages.map((msg) => (
              <div key={msg._id} className="bg-[var(--color-surface)] border-thin p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} className="text-[var(--color-accent)]">{msg.email}</a>
                  </div>
                  <span className="text-sm text-[var(--color-secondary-text)]">{new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-[var(--color-secondary-text)] whitespace-pre-wrap">{msg.message}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="flex flex-col gap-4">
            {projects.map((proj) => (
              <div key={proj._id} className="bg-[var(--color-surface)] border-thin p-6 rounded-lg flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--color-accent)]">{proj.type}</span>
                  <h3 className="text-xl font-bold">{proj.title}</h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => deleteProject(proj._id)} className="px-4 py-2 bg-red-900/20 text-red-400 border border-red-900/50 rounded hover:bg-red-900/50 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
