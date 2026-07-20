import * as repository from './education.repository.js';
import { ApiError } from '../../core/ApiError.js';

export const getEducation = async () => await repository.getAllEducation();

export const createEducation = async (data) => {
  const { degree, institution, duration, cgpa, description } = data;
  if (!degree || !institution || !duration) {
    throw new ApiError(400, 'Missing required education attributes.');
  }

  const newEdu = {
    degree,
    institution,
    duration,
    cgpa: cgpa || '',
    description: description || ''
  };

  return await repository.saveEducation(newEdu);
};

export const updateEducation = async (id: string, data) => {
  const { degree, institution, duration, cgpa, description } = data;
  
  const current = await repository.getEducationById(id);
  if (!current) throw new ApiError(404, 'Education record not found.');

  const updatedData = {
    degree: degree || current.degree,
    institution: institution || current.institution,
    duration: duration || current.duration,
    cgpa: cgpa !== undefined ? cgpa : current.cgpa,
    description: description !== undefined ? description : current.description
  };

  return await repository.updateEducation(id, updatedData);
};

export const deleteEducation = async (id: string) => {
  const deleted = await repository.deleteEducation(id);
  if (!deleted) {
    throw new ApiError(404, 'Education record not found.');
  }
};
