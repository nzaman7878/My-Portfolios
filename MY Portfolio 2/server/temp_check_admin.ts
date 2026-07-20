import mongoose from 'mongoose';
import Admin from './src/models/Admin.js';
import { env } from './src/config/env.js';

mongoose.connect(env.MONGO_URI || 'mongodb://127.0.0.1/portfolio').then(async () => {
  const docs = await Admin.find({});
  console.log('Admins in DB:', docs);
  process.exit(0);
});
