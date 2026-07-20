import * as repository from './messages.repository.js';
import { ApiError } from '../../core/ApiError.js';

const generateId = () => Math.random().toString(36).substring(2, 11);

export const getMessages = () => repository.getAllMessages();

export const createMessage = (data) => {
  const { name, email, subject, message } = data;
  
  if (!name || !email || !subject || !message) {
    throw new ApiError(400, 'All parameters (name, email, subject, message) are required.');
  }

  const newMsg = {
    id: generateId(),
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString(),
    read: false
  };

  repository.saveMessage(newMsg);
  return newMsg;
};

export const markAsRead = (id: string, readStatus) => {
  const isRead = typeof readStatus === 'boolean' ? readStatus : true;
  const message = repository.updateMessageReadStatus(id, isRead);
  if (!message) throw new ApiError(404, 'Message not found.');
  return message;
};

export const deleteMessage = (id: string) => {
  if (!repository.deleteMessage(id)) {
    throw new ApiError(404, 'Message not found.');
  }
};
