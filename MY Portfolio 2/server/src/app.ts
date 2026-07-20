import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/error.middleware.js';

// Route imports
import authRoutes from './features/auth/auth.routes.js';
import projectRoutes from './features/projects/project.routes.js';
import educationRoutes from './features/education/education.routes.js';
import experienceRoutes from './features/experience/experience.routes.js';
import skillsRoutes from './features/skills/skills.routes.js';
import messageRoutes from './features/messages/messages.routes.js';
import statsRoutes from './features/stats/stats.routes.js';
import chatRoutes from './features/chat/chat.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/contact', messageRoutes);
app.use('/api/admin/messages', messageRoutes); // We can refine route paths later, for now just use the same router
app.use('/api/stats', statsRoutes);
app.use('/api/chat', chatRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
