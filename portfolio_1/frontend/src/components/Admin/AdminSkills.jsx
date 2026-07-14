import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function AdminSkills() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    skills: '', // textarea string
    order: 0
  });

  const queryClient = useQueryClient();
  const token = localStorage.getItem('adminToken');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const { data: skillsList = [], isLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/skills`);
      if (!res.ok) throw new Error('Failed to fetch skills');
      const data = await res.json();
      return data.data;
    }
  });

  const deleteSkillMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${API_URL}/api/skills/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete skill category');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill category deleted');
    },
    onError: () => toast.error('Failed to delete skill category')
  });

  const saveSkillMutation = useMutation({
    mutationFn: async (skillData) => {
      const url = editingSkill 
        ? `${API_URL}/api/skills/${editingSkill._id}`
        : `${API_URL}/api/skills`;
      
      const method = editingSkill ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(skillData)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save skill category');
      }
    },
    onSuccess: () => {
      setIsFormVisible(false);
      setEditingSkill(null);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success(editingSkill ? 'Skill category updated!' : 'Skill category created!');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const resetForm = () => {
    setFormData({ title: '', skills: '', order: 0 });
  };

  const handleEdit = (skillObj) => {
    setEditingSkill(skillObj);
    setFormData({
      title: skillObj.title,
      skills: skillObj.skills.join(', '),
      order: skillObj.order
    });
    setIsFormVisible(true);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this skill category?')) {
      deleteSkillMutation.mutate(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s)
    };
    saveSkillMutation.mutate(formattedData);
  };

  if (isLoading) return <div className="text-[var(--color-secondary-text)]">Loading skills...</div>;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-serif font-bold border-b border-[var(--color-border-custom)] pb-4">Manage Skills</h2>
      
      {!isFormVisible && (
        <button 
          onClick={() => { setEditingSkill(null); resetForm(); setIsFormVisible(true); }}
          className="self-start px-6 py-2 bg-[var(--color-accent)] text-[var(--color-background)] font-medium rounded hover:opacity-90"
        >
          + Add Skill Category
        </button>
      )}

      {isFormVisible && (
        <div className="bg-[var(--color-surface)] border-thin p-8 rounded-lg mb-8">
          <h3 className="text-xl font-bold mb-6">{editingSkill ? 'Edit Skill Category' : 'New Skill Category'}</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Category Title (e.g. Frontend)</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="bg-transparent border-thin p-2 rounded" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Order (Lower = higher on list)</label>
                <input required type="number" value={formData.order} onChange={(e) => setFormData({...formData, order: Number(e.target.value)})} className="bg-transparent border-thin p-2 rounded" />
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Skills (Comma-separated: React, Vue, Angular)</label>
              <textarea required rows="4" value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} className="bg-transparent border-thin p-2 rounded resize-none" />
            </div>
            
            <div className="flex gap-4 mt-4">
              <button type="submit" disabled={saveSkillMutation.isPending} className="px-6 py-2 bg-[var(--color-accent)] text-[var(--color-background)] font-medium rounded hover:opacity-90 disabled:opacity-50">
                {saveSkillMutation.isPending ? 'Saving...' : 'Save Category'}
              </button>
              <button type="button" onClick={() => setIsFormVisible(false)} className="px-6 py-2 border-thin rounded hover:bg-[var(--color-border-custom)] transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillsList.map((skillObj) => (
          <div key={skillObj._id} className="bg-[var(--color-surface)] border-thin p-6 rounded-lg flex flex-col justify-between">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">{skillObj.title}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {skillObj.skills.map((skillItem, i) => (
                  <span key={i} className="px-3 py-1 bg-[var(--color-background)] border-thin rounded-full text-xs text-[var(--color-secondary-text)]">
                    {skillItem}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => handleEdit(skillObj)} 
                className="flex-1 py-2 bg-[var(--color-background)] text-[var(--color-primary-text)] border-thin rounded hover:bg-[var(--color-border-custom)] transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(skillObj._id)} 
                className="flex-1 py-2 bg-red-900/20 text-red-400 border border-red-900/50 rounded hover:bg-red-900/50 transition-colors"
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
