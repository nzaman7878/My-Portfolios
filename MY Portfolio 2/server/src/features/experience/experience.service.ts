import * as repository from './experience.repository.js';
import { ApiError } from '../../core/ApiError.js';

const generateId = () => Math.random().toString(36).substring(2, 11);

export const getExperience = () => repository.getAllExperience();

export const createExperience = (data) => {
  const { company, role, duration, description, technologies } = data;
  if (!company || !role || !duration) {
    throw new ApiError(400, 'Missing required experience attributes.');
  }

  const newExp = {
    id: generateId(),
    company,
    role,
    duration,
    description: description || '',
    technologies: Array.isArray(technologies) ? technologies : []
  };

  repository.saveExperience(newExp);
  return newExp;
};

export const updateExperience = (id: string, data) => {
  const { company, role, duration, description, technologies } = data;
  
  const current = repository.getExperienceById(id);
  if (!current) throw new ApiError(404, 'Experience record not found.');

  const updatedData = {
    company: company || current.company,
    role: role || current.role,
    duration: duration || current.duration,
    description: description !== undefined ? description : current.description,
    technologies: Array.isArray(technologies) ? technologies : current.technologies
  };

  return repository.updateExperience(id, updatedData);
};

export const deleteExperience = (id: string) => {
  if (!repository.deleteExperience(id)) {
    throw new ApiError(404, 'Experience record not found.');
  }
};
