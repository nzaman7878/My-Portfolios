import { getDb, saveDb } from '../../db/dbHelper.js';

export const getAllMessages = () => getDb().messages;
export const getMessageById = (id: string) => getDb().messages.find(m => m.id === id);
export const saveMessage = (msg) => {
  const db = getDb();
  db.messages.push(msg);
  db.stats.messagesReceived += 1;
  saveDb(db);
};
export const updateMessageReadStatus = (id: string, read: boolean) => {
  const db = getDb();
  const message = db.messages.find(m => m.id === id);
  if (message) {
    message.read = read;
    saveDb(db);
    return message;
  }
  return null;
};
export const deleteMessage = (id: string) => {
  const db = getDb();
  const initialLength = db.messages.length;
  db.messages = db.messages.filter(m => m.id !== id);
  if (db.messages.length !== initialLength) {
    saveDb(db);
    return true;
  }
  return false;
};
