import { getDb, saveDb } from '../../db/dbHelper.js';

export const getStats = () => getDb().stats;
export const incrementVisitor = () => {
  const db = getDb();
  db.stats.visitors += 1;
  saveDb(db);
  return db.stats;
};
export const incrementLike = () => {
  const db = getDb();
  db.stats.likes += 1;
  saveDb(db);
  return db.stats;
};
