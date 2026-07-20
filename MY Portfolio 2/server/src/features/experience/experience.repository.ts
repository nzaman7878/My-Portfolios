import Experience from '../../models/Experience.js';

export const getAllExperience = async () => {
  return await Experience.find({});
};

export const getExperienceById = async (id: string) => {
  return await Experience.findById(id);
};

export const saveExperience = async (expData) => {
  const exp = new Experience(expData);
  await exp.save();
  return exp;
};

export const updateExperience = async (id: string, updatedData) => {
  return await Experience.findByIdAndUpdate(id, updatedData, { new: true });
};

export const deleteExperience = async (id: string) => {
  const result = await Experience.findByIdAndDelete(id);
  return result !== null;
};
