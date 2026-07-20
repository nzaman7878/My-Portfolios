import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../../models/Admin.js';
import { env } from '../../config/env.js';
import { ApiError } from '../../core/ApiError.js';

export const login = async (username, password) => {
  const admin = await Admin.findOne({ username });
  if (!admin) {
    throw new ApiError(401, 'Invalid credentials.');
  }

  const isMatched = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatched) {
    throw new ApiError(401, 'Invalid credentials.');
  }

  const token = jwt.sign({ username }, env.JWT_SECRET, { expiresIn: '1h' });
  return { token, username };
};
