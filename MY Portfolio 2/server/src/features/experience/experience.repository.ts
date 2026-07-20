import { getDb, saveDb } from '../../db/dbHelper.js';

export const getAllExperience = () => getDb().experience;
export const getExperienceById = (id: string) => getDb().experience.find(e => e.id === id);
export const saveExperience = (exp) => {
  const db = getDb();
  db.experience.push(exp);
  saveDb(db);
};
export const updateExperience = (id: string, updatedData) => {
  const db = getDb();
  const index = db.experience.findIndex(e => e.id === id);
  if (index !== -1) {
    db.experience[index] = { ...db.experience[index], ...updatedData };
    saveDb(db);
    return db.experience[index];
  }
  return null;
};
export const deleteExperience = (id: string) => {
  const db = getDb();
  const initialLength = db.experience.length;
  db.experience = db.experience.filter(e => e.id !== id);
  if (db.experience.length !== initialLength) {
    saveDb(db);
    return true;
  }
  return false;
};
