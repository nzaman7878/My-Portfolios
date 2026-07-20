import { Request, Response } from 'express';
import * as service from './chat.service.js';
import { asyncHandler } from '../../core/asyncHandler.js';

export const chat = asyncHandler(async (req: Request, res: Response) => {
  const { message, history } = req.body;
  const responseText = await service.generateChatResponse(message, history);
  res.json({ text: responseText });
});
