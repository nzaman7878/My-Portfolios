require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./src/models/Project');
const Skill = require('./src/models/Skill');

const connectDB = require('./src/config/db');

const projects = [
  {
    title: 'Learning Management System',
    type: 'WEB | SAAS PLATFORM',
    problem: 'Existing platforms were bloated and difficult to scale for real-time video delivery and concurrent assessments.',
    solution: 'Built a modular platform with role-based auth, real-time progress syncing, and optimized video streaming pipelines.',
    architecture: 'Microservices with Node.js/Express, MongoDB for document storage, and Redis for session caching.',
    keyFeatures: ['Role-based Dashboards', 'Real-time Progress', 'Video Streaming', 'Automated Quizzes'],
    techStack: ['React', 'Node.js', 'MongoDB', 'Redis', 'WebRTC'],
    github: '#',
    demo: '#',
    order: 1
  },
  {
    title: 'AI Battle Arena',
    type: 'WEB GL | AI',
    problem: 'Developers lacked a visual, comparative environment to test different LLM prompts and responses side-by-side.',
    solution: 'Engineered a highly responsive arena where multiple LLM models could be queried simultaneously and evaluated.',
    architecture: 'Next.js frontend with serverless edge functions for concurrent API requests to multiple AI providers.',
    keyFeatures: ['Side-by-side Comparison', 'Prompt History', 'Model Analytics', 'Exportable Results'],
    techStack: ['React', 'Next.js', 'OpenAI API', 'TailwindCSS'],
    github: '#',
    demo: '#',
    order: 2
  },
  {
    title: 'Moodify',
    type: 'NLP | AUDIO',
    problem: 'Users struggled to find music that matched complex, nuanced emotional states beyond basic genres.',
    solution: 'Developed an NLP-driven engine that maps user journal entries to Spotify audio features using sentiment analysis.',
    architecture: 'React frontend communicating with a Python/FastAPI backend utilizing Hugging Face models and Spotify Web API.',
    keyFeatures: ['Sentiment Analysis', 'Playlist Generation', 'Real-time Mood Tracking', 'Journaling Interface'],
    techStack: ['React', 'FastAPI', 'Python', 'Spotify API', 'Hugging Face'],
    github: '#',
    demo: '#',
    order: 3
  },
  {
    title: 'Snitch',
    type: 'FULL-STACK E-COMMERCE',
    problem: 'Need for a high-performance fashion retail platform with seamless UX and secure checkout.',
    solution: 'Created a modern headless e-commerce store with optimized image delivery and robust payment gateways.',
    architecture: 'MERN stack architecture with Stripe integration and Cloudinary for asset optimization.',
    keyFeatures: ['Secure Checkout', 'Dynamic Cart', 'Wishlist', 'Admin Dashboard'],
    techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'Stripe'],
    github: '#',
    demo: '#',
    order: 4
  },
];

const categories = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    order: 1
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'FastAPI', 'Python', 'REST APIs'],
    order: 2
  },
  {
    title: 'AI & LLM',
    skills: ['LLM Integration', 'AI Agents', 'OpenAI API', 'Hugging Face', 'Prompt Engineering'],
    order: 3
  },
  {
    title: 'Databases',
    skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Vector Databases'],
    order: 4
  },
  {
    title: 'DevOps',
    skills: ['Docker', 'AWS', 'Vercel', 'CI/CD Pipelines'],
    order: 5
  },
  {
    title: 'Tools',
    skills: ['Git', 'GitHub', 'Postman', 'Figma', 'Webpack'],
    order: 6
  },
];

const importData = async () => {
  try {
    await connectDB();

    await Project.deleteMany();
    await Skill.deleteMany();

    await Project.insertMany(projects);
    await Skill.insertMany(categories);

    console.log('Data Imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Error with importing data: ${error.message}`);
    process.exit(1);
  }
};

importData();
