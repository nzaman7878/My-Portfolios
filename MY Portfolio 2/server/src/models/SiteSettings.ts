import mongoose, { Document, Schema } from 'mongoose';

export interface ISiteSettings extends Document {
  hero: {
    subtitle: string;
    title: string;
    description: string;
    longDescription: string;
    resumeText: string;
  };
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  profile: {
    image: string;
    name: string;
    location: string;
  };
  about: {
    image: string;
    title: string;
    paragraphs: string[];
  };
}

const siteSettingsSchema = new Schema<ISiteSettings>({
  hero: {
    subtitle: { type: String, default: 'NURUZZAMAN — FULL-STACK AI ENGINEER' },
    title: { type: String, default: 'Designing and building modern web applications with MERN and AI.' },
    description: { type: String, default: "Hi, I'm Nuruzzaman, a Full-Stack AI Engineer based in Assam, India." },
    longDescription: { type: String, default: "I build scalable web applications with the MERN stack and continuously explore Generative AI to create smarter, more capable software. I enjoy solving complex problems, designing intuitive user experiences, and turning ideas into reliable products that people love to use." },
    resumeText: { type: String, default: "Nuruzzaman\nMERN Stack & Generative AI Developer\nEmail: nuruzzaman31032001@gmail.com\n\nTechnical Focus:\n- Node.js, React, MongoDB, Express (MERN Stack)\n- Server-side LLM Integration, Vector Databases, Context-aware RAG pipelines\n- Production systems engineering, TypeScript, cloud run optimization" },
  },
  social: {
    github: { type: String, default: 'https://github.com' },
    linkedin: { type: String, default: 'https://linkedin.com' },
    twitter: { type: String, default: 'https://twitter.com' },
  },
  profile: {
    image: { type: String, default: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80' },
    name: { type: String, default: 'Nuruzzaman' },
    location: { type: String, default: 'EST. GAUHATI, ASSAM' },
  },
  about: {
    image: { type: String, default: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80' },
    title: { type: String, default: 'Technology has always been more than just a career path for me—it\'s a way to create meaningful solutions.' },
    paragraphs: { 
      type: [String], 
      default: [
        "I recently completed my Master's degree in Information Technology and have dedicated my time to building full-stack applications that combine clean design, scalable architecture, and practical functionality. My work spans modern web development, backend systems, REST APIs, authentication, database design, and cloud deployment.",
        "Beyond traditional web development, I'm expanding my expertise into Generative AI and intelligent applications. I'm particularly interested in how AI can improve user experiences, automate workflows, and help build products that solve real-world problems.",
        "I believe the best software is simple, reliable, and thoughtfully designed. Whether I'm building from scratch or improving an existing product, I focus on writing maintainable code, paying attention to details, and continuously learning better ways to build.",
        "When I'm not developing applications, you'll usually find me exploring new technologies, studying software architecture, improving my problem-solving skills, or experimenting with new ideas that challenge me to grow as an engineer."
      ]
    },
  }
}, { timestamps: true });

export default mongoose.model<ISiteSettings>('SiteSettings', siteSettingsSchema);
