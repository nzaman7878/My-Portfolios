import { useState, useEffect } from 'react';

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
        order: 0
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
