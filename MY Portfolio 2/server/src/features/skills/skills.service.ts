import * as repository from './skills.repository.js';
import { ApiError } from '../../core/ApiError.js';

export const getSkills = () => repository.getAllSkills();

export const updateSkills = (id: string, skills: string[]) => {
  if (!Array.isArray(skills)) {
    throw new ApiError(400, 'Skills parameters must be an array of strings.');
  }

  const result = repository.updateSkillCategory(id, skills);
  if (!result) throw new ApiError(404, 'Skill category not found.');
  return result;
};
