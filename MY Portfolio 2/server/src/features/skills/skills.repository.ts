import Skill from '../../models/Skill.js';

export const getAllSkills = async () => {
  return await Skill.find({});
};

export const updateSkillCategory = async (id: string, skills: string[]) => {
  return await Skill.findByIdAndUpdate(id, { skills }, { new: true });
};
