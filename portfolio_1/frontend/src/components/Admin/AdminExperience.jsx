import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function AdminExperience() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    institution: '',
    period: '',
    description: '',
    order: 0
  });

  const queryClient = useQueryClient();
  const token = localStorage.getItem('adminToken');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ['experiences'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/experience`);
      if (!res.ok) throw new Error('Failed to fetch experiences');
      const data = await res.json();
      return data.data;
    }
  });

  const deleteExpMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${API_URL}/api/experience/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete experience');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      toast.success('Experience deleted');
    },
    onError: () => toast.error('Failed to delete experience')
  });

  const saveExpMutation = useMutation({
    mutationFn: async (expData) => {
      const url = editingExp 
        ? `${API_URL}/api/experience/${editingExp._id}`
        : `${API_URL}/api/experience`;
      
      const method = editingExp ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(expData)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save experience');
      }
    },
    onSuccess: () => {
      setIsFormVisible(false);
      setEditingExp(null);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      toast.success(editingExp ? 'Experience updated!' : 'Experience created!');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const resetForm = () => {
    setFormData({ title: '', institution: '', period: '', description: '', order: 0 });
  };

  const handleEdit = (exp) => {
    setEditingExp(exp);
    setFormData({
      title: exp.title,
      institution: exp.institution,
      period: exp.period,
      description: exp.description,
      order: exp.order
    });
    setIsFormVisible(true);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      deleteExpMutation.mutate(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveExpMutation.mutate(formData);
  };

  if (isLoading) return <div className="text-[var(--color-secondary-text)]">Loading experiences...</div>;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-serif font-bold border-b border-[var(--color-border-custom)] pb-4">Manage Experience</h2>
      
      {!isFormVisible && (
        <button 
          onClick={() => { setEditingExp(null); resetForm(); setIsFormVisible(true); }}
          className="self-start px-6 py-2 bg-[var(--color-accent)] text-[var(--color-background)] font-medium rounded hover:opacity-90"
        >
          + Add New Experience
        </button>
      )}

      {isFormVisible && (
        <div className="bg-[var(--color-surface)] border-thin p-8 rounded-lg mb-8">
          <h3 className="text-xl font-bold mb-6">{editingExp ? 'Edit Experience' : 'New Experience'}</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Title (Role/Degree)</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="bg-transparent border-thin p-2 rounded" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Institution/Company</label>
                <input required type="text" value={formData.institution} onChange={(e) => setFormData({...formData, institution: e.target.value})} className="bg-transparent border-thin p-2 rounded" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Period (e.g., "2020 - 2024")</label>
                <input required type="text" value={formData.period} onChange={(e) => setFormData({...formData, period: e.target.value})} className="bg-transparent border-thin p-2 rounded" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Order (Lower = higher on list)</label>
                <input required type="number" value={formData.order} onChange={(e) => setFormData({...formData, order: Number(e.target.value)})} className="bg-transparent border-thin p-2 rounded" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Description</label>
              <textarea required rows="4" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="bg-transparent border-thin p-2 rounded resize-none" />
            </div>
            
            <div className="flex gap-4 mt-4">
              <button type="submit" disabled={saveExpMutation.isPending} className="px-6 py-2 bg-[var(--color-accent)] text-[var(--color-background)] font-medium rounded hover:opacity-90 disabled:opacity-50">
                {saveExpMutation.isPending ? 'Saving...' : 'Save Experience'}
              </button>
              <button type="button" onClick={() => setIsFormVisible(false)} className="px-6 py-2 border-thin rounded hover:bg-[var(--color-border-custom)] transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {experiences.map((exp) => (
          <div key={exp._id} className="bg-[var(--color-surface)] border-thin p-6 rounded-lg flex justify-between items-center">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-accent)]">{exp.period}</span>
              <h3 className="text-xl font-bold">{exp.title}</h3>
              <p className="text-sm text-[var(--color-secondary-text)]">{exp.institution}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleEdit(exp)} 
                className="px-4 py-2 bg-[var(--color-background)] text-[var(--color-primary-text)] border-thin rounded hover:bg-[var(--color-border-custom)] transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(exp._id)} 
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
