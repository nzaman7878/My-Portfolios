import Education from '../../models/Education.js';

export const getAllEducation = async () => {
  return await Education.find({});
};

export const getEducationById = async (id: string) => {
  return await Education.findById(id);
};

export const saveEducation = async (eduData) => {
  const edu = new Education(eduData);
  await edu.save();
  return edu;
};

export const updateEducation = async (id: string, updatedData) => {
  return await Education.findByIdAndUpdate(id, updatedData, { new: true });
};

export const deleteEducation = async (id: string) => {
  const result = await Education.findByIdAndDelete(id);
  return result !== null;
};
