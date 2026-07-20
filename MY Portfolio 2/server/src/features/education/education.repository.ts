import { getDb, saveDb } from '../../db/dbHelper.js';

export const getAllEducation = () => getDb().education;
export const getEducationById = (id: string) => getDb().education.find(e => e.id === id);
export const saveEducation = (edu) => {
  const db = getDb();
  db.education.push(edu);
  saveDb(db);
};
export const updateEducation = (id: string, updatedData) => {
  const db = getDb();
  const index = db.education.findIndex(e => e.id === id);
  if (index !== -1) {
    db.education[index] = { ...db.education[index], ...updatedData };
    saveDb(db);
    return db.education[index];
  }
  return null;
};
export const deleteEducation = (id: string) => {
  const db = getDb();
  const initialLength = db.education.length;
  db.education = db.education.filter(e => e.id !== id);
  if (db.education.length !== initialLength) {
    saveDb(db);
    return true;
  }
  return false;
};
