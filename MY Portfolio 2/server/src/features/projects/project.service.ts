import * as repository from './project.repository.js';
import { ApiError } from '../../core/ApiError.js';

const generateId = () => Math.random().toString(36).substring(2, 11);

export const getProjects = () => repository.getAllProjects();

export const trackProjectClick = (id: string) => {
  const result = repository.incrementProjectViews(id);
  if (!result) throw new ApiError(404, 'Project not found');
  return result;
};

export const createProject = (data) => {
  const { name, description, technologies, githubLink, liveLink, category, image, features } = data;
  if (!name || !description || !technologies || !category) {
    throw new ApiError(400, 'Missing required project attributes.');
  }

  const newProject = {
    id: generateId(),
    name,
    description,
    technologies: Array.isArray(technologies) ? technologies : [technologies],
    githubLink: githubLink || '',
    liveLink: liveLink || '',
    category,
    image: image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    features: Array.isArray(features) ? features : [],
    views: 0
  };

  repository.saveProject(newProject);
  return newProject;
};

export const updateProject = (id: string, data) => {
  const { name, description, technologies, githubLink, liveLink, category, image, features } = data;
  
  const current = repository.getProjectById(id);
  if (!current) throw new ApiError(404, 'Project not found.');

  const updatedData = {
    name: name || current.name,
    description: description || current.description,
    technologies: Array.isArray(technologies) ? technologies : current.technologies,
    githubLink: githubLink !== undefined ? githubLink : current.githubLink,
    liveLink: liveLink !== undefined ? liveLink : current.liveLink,
    category: category || current.category,
    image: image || current.image,
    features: Array.isArray(features) ? features : current.features
  };

  return repository.updateProject(id, updatedData);
};

export const deleteProject = (id: string) => {
  if (!repository.deleteProject(id)) {
    throw new ApiError(404, 'Project not found.');
  }
};
