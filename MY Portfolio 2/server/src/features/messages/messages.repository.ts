import Message from '../../models/Message.js';
import Stats from '../../models/Stats.js';

export const getAllMessages = async () => {
  return await Message.find({});
};

export const getMessageById = async (id: string) => {
  return await Message.findById(id);
};

export const saveMessage = async (msgData) => {
  const msg = new Message(msgData);
  await msg.save();
  await Stats.findOneAndUpdate({}, { $inc: { messagesReceived: 1 } }, { upsert: true });
  return msg;
};

export const updateMessageReadStatus = async (id: string, read: boolean) => {
  return await Message.findByIdAndUpdate(id, { read }, { new: true });
};

export const deleteMessage = async (id: string) => {
  const result = await Message.findByIdAndDelete(id);
  return result !== null;
};
