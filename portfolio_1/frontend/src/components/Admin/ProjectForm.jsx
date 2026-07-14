import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ProjectForm({ project, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    problem: '',
    solution: '',
    architecture: '',
    keyFeatures: '',
    techStack: '',
    github: '',
    demo: '',
    image: '',
    order: 0
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        type: project.type || '',
        problem: project.problem || '',
        solution: project.solution || '',
        architecture: project.architecture || '',
        keyFeatures: project.keyFeatures ? project.keyFeatures.join(', ') : '',
        techStack: project.techStack ? project.techStack.join(', ') : '',
        github: project.github || '',
        demo: project.demo || '',
        image: project.image || '',
        order: project.order || 0
      });
    } else {
      // Reset form if creating a new project
      setFormData({
        title: '',
        type: '',
        problem: '',
        solution: '',
        architecture: '',
        keyFeatures: '',
        techStack: '',
        github: '',
        demo: '',
        image: '',
        order: 0
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const formDataObj = new FormData();
    formDataObj.append('image', file);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const token = localStorage.getItem('adminToken');
      
      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataObj
      });
      
      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.url }));
        toast.success('Image uploaded');
      } else {
        toast.error(data.message || 'Image upload failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      keyFeatures: formData.keyFeatures.split(',').map(item => item.trim()).filter(Boolean),
      techStack: formData.techStack.split(',').map(item => item.trim()).filter(Boolean),
    };
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border-custom)]">
      <h2 className="text-2xl font-serif mb-4">{project ? 'Edit Project' : 'Add New Project'}</h2>
      
      <div className="flex flex-col gap-2 p-4 border border-dashed border-[var(--color-border-custom)] rounded-lg bg-[var(--color-background)]">
        <label className="text-sm font-mono text-[var(--color-secondary-text)]">Project Image</label>
        
        {formData.image && (
          <div className="relative w-full h-48 mb-2 rounded overflow-hidden">
            <img src={formData.image} alt="Project Preview" className="object-cover w-full h-full" />
            <button 
              type="button" 
              onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 text-xs rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        )}

        <div className="flex items-center gap-4">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            disabled={uploadingImage}
            className="text-sm text-[var(--color-secondary-text)] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-surface)] file:text-[var(--color-primary-text)] hover:file:bg-[var(--color-border-custom)]"
          />
          {uploadingImage && <span className="text-sm text-[var(--color-accent)] animate-pulse">Uploading...</span>}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-mono text-[var(--color-secondary-text)]">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required className="bg-transparent border border-[var(--color-border-custom)] rounded p-2 focus:border-[var(--color-accent)] outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-mono text-[var(--color-secondary-text)]">Type (e.g. Full-Stack App)</label>
          <input type="text" name="type" value={formData.type} onChange={handleChange} required className="bg-transparent border border-[var(--color-border-custom)] rounded p-2 focus:border-[var(--color-accent)] outline-none" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-mono text-[var(--color-secondary-text)]">Problem</label>
        <textarea name="problem" value={formData.problem} onChange={handleChange} required rows="3" className="bg-transparent border border-[var(--color-border-custom)] rounded p-2 focus:border-[var(--color-accent)] outline-none" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-mono text-[var(--color-secondary-text)]">Solution</label>
        <textarea name="solution" value={formData.solution} onChange={handleChange} required rows="3" className="bg-transparent border border-[var(--color-border-custom)] rounded p-2 focus:border-[var(--color-accent)] outline-none" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-mono text-[var(--color-secondary-text)]">Architecture</label>
        <textarea name="architecture" value={formData.architecture} onChange={handleChange} required rows="3" className="bg-transparent border border-[var(--color-border-custom)] rounded p-2 focus:border-[var(--color-accent)] outline-none" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-mono text-[var(--color-secondary-text)]">Key Features (comma separated)</label>
        <input type="text" name="keyFeatures" value={formData.keyFeatures} onChange={handleChange} className="bg-transparent border border-[var(--color-border-custom)] rounded p-2 focus:border-[var(--color-accent)] outline-none" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-mono text-[var(--color-secondary-text)]">Tech Stack (comma separated)</label>
        <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} className="bg-transparent border border-[var(--color-border-custom)] rounded p-2 focus:border-[var(--color-accent)] outline-none" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-mono text-[var(--color-secondary-text)]">GitHub Link</label>
          <input type="text" name="github" value={formData.github} onChange={handleChange} className="bg-transparent border border-[var(--color-border-custom)] rounded p-2 focus:border-[var(--color-accent)] outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-mono text-[var(--color-secondary-text)]">Demo Link</label>
          <input type="text" name="demo" value={formData.demo} onChange={handleChange} className="bg-transparent border border-[var(--color-border-custom)] rounded p-2 focus:border-[var(--color-accent)] outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-mono text-[var(--color-secondary-text)]">Order</label>
          <input type="number" name="order" value={formData.order} onChange={handleChange} className="bg-transparent border border-[var(--color-border-custom)] rounded p-2 focus:border-[var(--color-accent)] outline-none" />
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button type="submit" className="px-6 py-2 bg-[var(--color-accent)] text-[var(--color-background)] rounded font-medium hover:opacity-90">
          {project ? 'Update Project' : 'Create Project'}
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2 border border-[var(--color-border-custom)] rounded hover:bg-[var(--color-surface)]">
          Cancel
        </button>
      </div>
    </form>
  );
}
