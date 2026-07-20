import * as repository from './project.repository.js';
import { ApiError } from '../../core/ApiError.js';

export const getProjects = async () => await repository.getAllProjects();

export const trackProjectClick = async (id: string) => {
  const result = await repository.incrementProjectViews(id);
  if (!result) throw new ApiError(404, 'Project not found');
  return result;
};

export const createProject = async (data) => {
  const { name, description, technologies, githubLink, liveLink, category, image, features } = data;
  if (!name || !description || !technologies || !category) {
    throw new ApiError(400, 'Missing required project attributes.');
  }

  const newProject = {
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

  return await repository.saveProject(newProject);
};

export const updateProject = async (id: string, data) => {
  const { name, description, technologies, githubLink, liveLink, category, image, features } = data;
  
  const current = await repository.getProjectById(id);
  if (!current) throw new ApiError(404, 'Project not found.');

  const updatedData = {
    name: name || current.name,
    description: description || current.description,
    technologies: technologies ? (Array.isArray(technologies) ? technologies : [technologies]) : current.technologies,
    githubLink: githubLink !== undefined ? githubLink : current.githubLink,
    liveLink: liveLink !== undefined ? liveLink : current.liveLink,
    category: category || current.category,
    image: image || current.image,
    features: features ? (Array.isArray(features) ? features : [features]) : current.features
  };

  return await repository.updateProject(id, updatedData);
};

export const deleteProject = async (id: string) => {
  const deleted = await repository.deleteProject(id);
  if (!deleted) {
    throw new ApiError(404, 'Project not found.');
  }
};
