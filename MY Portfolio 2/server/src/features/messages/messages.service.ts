import * as repository from './messages.repository.js';
import { ApiError } from '../../core/ApiError.js';

export const getMessages = async () => await repository.getAllMessages();

export const createMessage = async (data) => {
  const { name, email, subject, message } = data;
  
  if (!name || !email || !subject || !message) {
    throw new ApiError(400, 'All parameters (name, email, subject, message) are required.');
  }

  const newMsg = {
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString(),
    read: false
  };

  return await repository.saveMessage(newMsg);
};

export const markAsRead = async (id: string, readStatus) => {
  const isRead = typeof readStatus === 'boolean' ? readStatus : true;
  const message = await repository.updateMessageReadStatus(id, isRead);
  if (!message) throw new ApiError(404, 'Message not found.');
  return message;
};

export const deleteMessage = async (id: string) => {
  const deleted = await repository.deleteMessage(id);
  if (!deleted) {
    throw new ApiError(404, 'Message not found.');
  }
};
