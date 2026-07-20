import { getDb, saveDb } from '../../db/dbHelper.js';

export const getAllProjects = () => getDb().projects;
export const getProjectById = (id: string) => getDb().projects.find(p => p.id === id);
export const saveProject = (project) => {
  const db = getDb();
  db.projects.push(project);
  saveDb(db);
};
export const updateProject = (id: string, updatedData) => {
  const db = getDb();
  const index = db.projects.findIndex(p => p.id === id);
  if (index !== -1) {
    db.projects[index] = { ...db.projects[index], ...updatedData };
    saveDb(db);
    return db.projects[index];
  }
  return null;
};
export const deleteProject = (id: string) => {
  const db = getDb();
  const initialLength = db.projects.length;
  db.projects = db.projects.filter(p => p.id !== id);
  if (db.projects.length !== initialLength) {
    saveDb(db);
    return true;
  }
  return false;
};
export const incrementProjectViews = (id: string) => {
  const db = getDb();
  const project = db.projects.find(p => p.id === id);
  if (project) {
    project.views = (project.views || 0) + 1;
    db.stats.projectClicks += 1;
    saveDb(db);
    return { views: project.views, totalClicks: db.stats.projectClicks };
  }
  return null;
};
