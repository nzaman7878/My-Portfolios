import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from './src/models/Admin.js';
import { env } from './src/config/env.js';

mongoose.connect(env.MONGO_URI || 'mongodb://127.0.0.1/portfolio').then(async () => {
  const passwordHash = await bcrypt.hash('admin123', 10);
  await Admin.findOneAndUpdate({ username: 'admin' }, { passwordHash }, { upsert: true });
  console.log('Admin password reset to admin123 successfully!');
  process.exit(0);
});
