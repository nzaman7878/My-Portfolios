import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ProjectForm from './ProjectForm';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('messages');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = localStorage.getItem('adminToken');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // --- Queries ---
  const { data: messages = [] } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/contact`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch messages');
      const data = await res.json();
      return data.data;
    }
  });

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/projects`);
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      return data.data;
    }
  });

  // --- Mutations ---
  const deleteMessageMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${API_URL}/api/contact/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete message');
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] })
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${API_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete project');
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] })
  });

  const saveProjectMutation = useMutation({
    mutationFn: async (projectData) => {
      const url = editingProject 
        ? `${API_URL}/api/projects/${editingProject._id}`
        : `${API_URL}/api/projects`;
      
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(projectData)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save project');
      }
    },
    onSuccess: () => {
      setIsFormVisible(false);
      setEditingProject(null);
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      alert('Failed to save: ' + error.message);
    }
  });

  // --- Handlers ---
  const deleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProjectMutation.mutate(id);
    }
  };

  const deleteMessage = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMessageMutation.mutate(id);
    }
  };

  const handleProjectSubmit = (projectData) => {
    saveProjectMutation.mutate(projectData);
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
            onClick={() => { setActiveTab('messages'); setIsFormVisible(false); }}
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
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-sm text-[var(--color-secondary-text)]">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    <button 
                      onClick={() => deleteMessage(msg._id)} 
                      className="px-3 py-1 text-xs bg-red-900/20 text-red-400 border border-red-900/50 rounded hover:bg-red-900/50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-[var(--color-secondary-text)] whitespace-pre-wrap">{msg.message}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="flex flex-col gap-6">
            {!isFormVisible && (
              <button 
                onClick={() => { setEditingProject(null); setIsFormVisible(true); }}
                className="self-start px-6 py-2 bg-[var(--color-accent)] text-[var(--color-background)] font-medium rounded hover:opacity-90"
              >
                + Add New Project
              </button>
            )}

            {isFormVisible && (
              <ProjectForm 
                project={editingProject} 
                onSubmit={handleProjectSubmit} 
                onCancel={() => { setIsFormVisible(false); setEditingProject(null); }} 
              />
            )}

            <div className="flex flex-col gap-4">
              {projects.map((proj) => (
                <div key={proj._id} className="bg-[var(--color-surface)] border-thin p-6 rounded-lg flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[var(--color-accent)]">{proj.type}</span>
                    <h3 className="text-xl font-bold">{proj.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setEditingProject(proj); setIsFormVisible(true); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
                      className="px-4 py-2 bg-[var(--color-background)] text-[var(--color-primary-text)] border-thin rounded hover:bg-[var(--color-border-custom)] transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteProject(proj._id)} 
                      className="px-4 py-2 bg-red-900/20 text-red-400 border border-red-900/50 rounded hover:bg-red-900/50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
