import * as repository from './experience.repository.js';
import { ApiError } from '../../core/ApiError.js';

export const getExperience = async () => await repository.getAllExperience();

export const createExperience = async (data) => {
  const { company, role, duration, description, technologies } = data;
  if (!company || !role || !duration) {
    throw new ApiError(400, 'Missing required experience attributes.');
  }

  const newExp = {
    company,
    role,
    duration,
    description: description || '',
    technologies: Array.isArray(technologies) ? technologies : []
  };

  return await repository.saveExperience(newExp);
};

export const updateExperience = async (id: string, data) => {
  const { company, role, duration, description, technologies } = data;
  
  const current = await repository.getExperienceById(id);
  if (!current) throw new ApiError(404, 'Experience record not found.');

  const updatedData = {
    company: company || current.company,
    role: role || current.role,
    duration: duration || current.duration,
    description: description !== undefined ? description : current.description,
    technologies: technologies ? (Array.isArray(technologies) ? technologies : [technologies]) : current.technologies
  };

  return await repository.updateExperience(id, updatedData);
};

export const deleteExperience = async (id: string) => {
  const deleted = await repository.deleteExperience(id);
  if (!deleted) {
    throw new ApiError(404, 'Experience record not found.');
  }
};
