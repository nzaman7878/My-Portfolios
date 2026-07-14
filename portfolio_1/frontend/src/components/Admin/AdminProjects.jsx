import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ProjectForm from './ProjectForm';

export default function AdminProjects() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const queryClient = useQueryClient();
  const token = localStorage.getItem('adminToken');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/projects`);
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      return data.data;
    }
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${API_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete project');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted');
    },
    onError: () => toast.error('Failed to delete project')
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
      toast.success(editingProject ? 'Project updated!' : 'Project created!');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const deleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProjectMutation.mutate(id);
    }
  };

  const handleProjectSubmit = (projectData) => {
    saveProjectMutation.mutate(projectData);
  };

  if (isLoading) return <div className="text-[var(--color-secondary-text)]">Loading projects...</div>;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-serif font-bold border-b border-[var(--color-border-custom)] pb-4">Manage Projects</h2>
      
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
  );
}
