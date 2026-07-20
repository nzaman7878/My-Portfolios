import { getDb, saveDb } from '../../db/dbHelper.js';

export const getAllSkills = () => getDb().skills;
export const updateSkillCategory = (id: string, skills: string[]) => {
  const db = getDb();
  const categoryIndex = db.skills.findIndex(cat => cat.id === id);
  if (categoryIndex !== -1) {
    db.skills[categoryIndex].skills = skills;
    saveDb(db);
    return db.skills[categoryIndex];
  }
  return null;
};
