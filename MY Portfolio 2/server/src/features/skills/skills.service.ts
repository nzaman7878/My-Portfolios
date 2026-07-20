import * as repository from './skills.repository.js';
import { ApiError } from '../../core/ApiError.js';

export const getSkills = async () => await repository.getAllSkills();

export const updateSkills = async (id: string, skills: string[]) => {
  if (!Array.isArray(skills)) {
    throw new ApiError(400, 'Skills parameters must be an array of strings.');
  }

  const result = await repository.updateSkillCategory(id, skills);
  if (!result) throw new ApiError(404, 'Skill category not found.');
  return result;
};
