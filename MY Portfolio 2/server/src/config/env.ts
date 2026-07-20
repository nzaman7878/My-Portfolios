import dotenv from 'dotenv';
import path from 'path';

// Note: since we moved the server to server/src, the .env might still be at root or server/.
// Assuming root for now.
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

export const env = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.ADMIN_JWT_SECRET,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio',
};

if (!env.JWT_SECRET) {
  throw new Error('FATAL ERROR: ADMIN_JWT_SECRET is not defined in .env');
}
