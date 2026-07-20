export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
  category: string; // e.g., "MERN Stack", "Generative AI", "Full Stack"
  image: string;
  features: string[];
  views: number;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  cgpa: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  technologies: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface SkillCategory {
  id: string;
  name: string; // e.g. "Frontend", "Backend", "Database", "AI & Gen AI", "Tools"
  skills: string[];
}

export interface PortfolioStats {
  visitors: number;
  projectClicks: number;
  messagesReceived: number;
  likes: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
