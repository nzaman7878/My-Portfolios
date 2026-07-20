import { Request, Response } from 'express';
import * as service from './messages.service.js';
import { asyncHandler } from '../../core/asyncHandler.js';

export const getMessages = asyncHandler(async (req: Request, res: Response) => {
  res.json(service.getMessages());
});

export const createMessage = asyncHandler(async (req: Request, res: Response) => {
  const msg = service.createMessage(req.body);
  res.json({ 
    success: true, 
    message: 'Message stored and received. The site owner has been notified!',
    messageReceived: msg 
  });
});

export const markAsRead = asyncHandler(async (req: Request, res: Response) => {
  const msg = service.markAsRead(req.params.id, req.body.read);
  res.json(msg);
});

export const deleteMessage = asyncHandler(async (req: Request, res: Response) => {
  service.deleteMessage(req.params.id);
  res.json({ success: true, message: 'Message deleted successfully.' });
});
