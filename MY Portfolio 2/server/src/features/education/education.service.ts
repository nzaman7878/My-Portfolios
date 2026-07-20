import * as repository from './education.repository.js';
import { ApiError } from '../../core/ApiError.js';

const generateId = () => Math.random().toString(36).substring(2, 11);

export const getEducation = () => repository.getAllEducation();

export const createEducation = (data) => {
  const { degree, institution, duration, cgpa, description } = data;
  if (!degree || !institution || !duration) {
    throw new ApiError(400, 'Missing required education attributes.');
  }

  const newEdu = {
    id: generateId(),
    degree,
    institution,
    duration,
    cgpa: cgpa || '',
    description: description || ''
  };

  repository.saveEducation(newEdu);
  return newEdu;
};

export const updateEducation = (id: string, data) => {
  const { degree, institution, duration, cgpa, description } = data;
  
  const current = repository.getEducationById(id);
  if (!current) throw new ApiError(404, 'Education record not found.');

  const updatedData = {
    degree: degree || current.degree,
    institution: institution || current.institution,
    duration: duration || current.duration,
    cgpa: cgpa !== undefined ? cgpa : current.cgpa,
    description: description !== undefined ? description : current.description
  };

  return repository.updateEducation(id, updatedData);
};

export const deleteEducation = (id: string) => {
  if (!repository.deleteEducation(id)) {
    throw new ApiError(404, 'Education record not found.');
  }
};
