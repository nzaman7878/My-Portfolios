import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import all models
import Project from './src/models/Project.js';
import Education from './src/models/Education.js';
import Experience from './src/models/Experience.js';
import Message from './src/models/Message.js';
import Skill from './src/models/Skill.js';
import Stats from './src/models/Stats.js';
import Admin from './src/models/Admin.js';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cloud URI from arguments or process.env
const cloudUri = process.argv[2];

if (!cloudUri || !cloudUri.startsWith('mongodb+srv://')) {
  console.error('Error: Please provide a valid MongoDB Atlas URI as an argument.');

  process.exit(1);
}

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(cloudUri);
    console.log('Successfully connected to MongoDB Atlas!');

    console.log('Reading db.json...');
    const dataPath = path.join(__dirname, 'data', 'db.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const dbData = JSON.parse(rawData);

    console.log('Clearing existing collections (if any)...');
    await Promise.all([
      Project.deleteMany({}),
      Education.deleteMany({}),
      Experience.deleteMany({}),
      Message.deleteMany({}),
      Skill.deleteMany({}),
      Stats.deleteMany({}),
      Admin.deleteMany({}),
    ]);

    console.log('Seeding cloud database...');

    // Seed Projects
    if (dbData.projects && dbData.projects.length > 0) {
      await Project.insertMany(dbData.projects);
      console.log(`✅ Seeded ${dbData.projects.length} Projects`);
    }

    // Seed Education
    if (dbData.education && dbData.education.length > 0) {
      await Education.insertMany(dbData.education);
      console.log(`✅ Seeded ${dbData.education.length} Education records`);
    }

    // Seed Experience
    if (dbData.experience && dbData.experience.length > 0) {
      await Experience.insertMany(dbData.experience);
      console.log(`✅ Seeded ${dbData.experience.length} Experience records`);
    }

    // Seed Messages
    if (dbData.messages && dbData.messages.length > 0) {
      await Message.insertMany(dbData.messages);
      console.log(`✅ Seeded ${dbData.messages.length} Messages`);
    }

    // Seed Skills
    if (dbData.skills && dbData.skills.length > 0) {
      await Skill.insertMany(dbData.skills);
      console.log(`✅ Seeded ${dbData.skills.length} Skill categories`);
    }

    // Seed Stats
    if (dbData.stats) {
      const statsDoc = new Stats(dbData.stats);
      await statsDoc.save();
      console.log(`✅ Seeded Stats`);
    }

    // Seed Admin
    if (dbData.adminConfig) {
      const adminDoc = new Admin({
        username: dbData.adminConfig.username,
        passwordHash: dbData.adminConfig.passwordHash
      });
      await adminDoc.save();
      console.log(`✅ Seeded Admin account`);
    }

    console.log('🎉 Cloud Database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed database:', error);
    process.exit(1);
  }
};

seedDatabase();
