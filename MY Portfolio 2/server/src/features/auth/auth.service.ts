import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from '../../db/dbHelper.js';
import { env } from '../../config/env.js';
import { ApiError } from '../../core/ApiError.js';

export const login = async (username, password) => {
  const db = getDb();
  if (username !== db.adminConfig.username) {
    throw new ApiError(401, 'Invalid credentials.');
  }

  const isMatched = await bcrypt.compare(password, db.adminConfig.passwordHash);
  if (!isMatched) {
    throw new ApiError(401, 'Invalid credentials.');
  }

  const token = jwt.sign({ username }, env.JWT_SECRET, { expiresIn: '24h' });
  return { token, username };
};
