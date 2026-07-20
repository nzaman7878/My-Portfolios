import { GoogleGenAI } from '@google/genai';
import { env } from '../../config/env.js';
import { getDb } from '../../db/dbHelper.js';
import { ApiError } from '../../core/ApiError.js';

let ai: GoogleGenAI | null = null;
if (env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API Client initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize Gemini API Client:", err);
  }
} else {
  console.warn("GEMINI_API_KEY is not defined. AI Assistant will operate with default responses.");
}

export const generateChatResponse = async (message: string, history: any[]) => {
  if (!message) {
    throw new ApiError(400, 'Message content is required.');
  }

  const db = getDb();
  
  const projectsSchema = db.projects.map(p => 
    `- **${p.name}** (${p.category}): ${p.description}. Technologies used: ${p.technologies.join(', ')}.`
  ).join('\n');

  const educationSchema = db.education.map(e => 
    `- **${e.degree}** from ${e.institution} (${e.duration}) - CGPA/Percentage: ${e.cgpa}. ${e.description}`
  ).join('\n');

  const experienceSchema = db.experience.length > 0 
    ? db.experience.map(exp => `- **${exp.role}** at ${exp.company} (${exp.duration}). technologies: ${exp.technologies.join(', ')}. ${exp.description}`).join('\n')
    : "No continuous agency experience records added yet. (Experience details will be updated soon).";

  const skillsSchema = db.skills.map(c => 
    `* **${c.name}**: ${c.skills.join(', ')}`
  ).join('\n');

  const systemInstruction = `
You are safe, helpful, and extremely friendly AI Assistant representing a professional "MERN Stack + Generative AI Developer".
Your personality is smart, structured, polite, and technical. You speak directly as the developer's personal assistant or agent.
Keep responses concise, clear, and structured using clean reader-friendly markdown formatting.

Here is the factual database knowledge regarding the developer. Always limit your statements strictly to these facts. Do not invent any projects or certifications:

### General Developer Bio
A passionate MERN Stack and Generative AI Developer with expertise in building scalable, real-world web applications and AI-powered solutions. Enjoys solving analytical problems and continuously adopting standard software practices.

### Professional Skills Catalog
${skillsSchema}

### Portfolio Projects Showcase
${projectsSchema}

### Academic Roadmap
${educationSchema}

### Professional Experience
${experienceSchema}

### Quick Answers Prompting Guidelines
1. If the user asks for a resume, mention they can download it directly using the primary download button in the portfolio's top hero section.
2. If the user wants to hire, suggest submitting the contact form at the bottom Contact page, as message details sync immediately to the admin console dashboard.
3. Be professional and humorous occasionally, keeping answers to 2-3 short, engaging paragraphs max.
`;

  if (!ai) {
    const fallbackAnswers = [
      "Hello! I am temporary AI assistant of the developer. It seems my Gemini Client is loading or awaiting configuration secrets. Feel free to explore the interactive showcase tabs, projects list, or send a message directly using the contact form!",
      "Hi there! I am the portfolio chatbot. The developer has expertise in React, Node, and Generative artificial intelligence. You can reach out directly via the LinkedIn card or send a message right here!",
    ];
    return fallbackAnswers[Math.floor(Math.random() * fallbackAnswers.length)];
  }

  try {
    const formattedHistory = Array.isArray(history) ? history.map((h: any) => ({
      role: h.role,
      parts: [{ text: h.text }]
    })) : [];

    formattedHistory.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const geminiResponse = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: formattedHistory,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return geminiResponse.text || "I was unable to format an answer at this time. Please check back shortly.";
  } catch (error) {
    console.error("Gemini Assistant error:", error);
    throw new ApiError(500, 'AI processing failure. Stale API context or key mismatch.');
  }
};
