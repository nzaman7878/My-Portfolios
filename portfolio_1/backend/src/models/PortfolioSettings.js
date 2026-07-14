const mongoose = require('mongoose');

const portfolioSettingsSchema = new mongoose.Schema({
  // This will enforce that there is only ever one document.
  singletonId: {
    type: String,
    default: 'singleton',
    unique: true
  },
  hero: {
    statusTag: { type: String, default: 'AVAILABLE FOR OPPORTUNITIES' },
    title: { type: String, default: 'Building modern web experiences with MERN and AI.' },
    subtitle: { type: String, default: 'Hi, I\'m Nuruzzaman — a Full-Stack Developer from Assam, India, passionate about creating fast, scalable, and thoughtfully designed web applications.\n\nMy expertise lies in the MERN stack, and I\'m currently expanding into Generative AI to build intelligent software that delivers real value. I enjoy transforming complex ideas into simple, intuitive digital experiences through clean architecture, modern design, and reliable code.\n\nI believe the best products are built where technology, design, and user experience come together.' },
    resumeUrl: { type: String, default: '#' }
  },
  about: {
    quote: { type: String, default: '"I\'m a developer who enjoys building products that people genuinely enjoy using."' },
    paragraphs: { 
      type: [String], 
      default: [
        "After completing my Master's in Information Technology, I chose to focus on full-stack web development because I love solving problems across the entire application—from designing intuitive user interfaces to building scalable backend systems and APIs.",
        "Over the years, I've worked on projects ranging from Learning Management Systems and AI-powered applications to e-commerce platforms and healthcare solutions. Every project has taught me something new about writing maintainable code, designing better user experiences, and building software that scales.",
        "Today, my primary stack is MongoDB, Express.js, React, and Node.js. Alongside that, I'm exploring Generative AI, LLM integration, AI agents, and modern developer tools to create applications that are not only functional but also intelligent.",
        "Outside of coding, I enjoy learning new technologies, refining my development workflow, studying system design, and continuously improving my craft.",
        "I'm always looking for opportunities to build meaningful products, collaborate with ambitious teams, and solve challenging engineering problems."
      ] 
    }
  },
  philosophy: {
    mainQuote: { type: String, default: '"I believe great software isn\'t just about writing code. It\'s about understanding people, solving meaningful problems, and building products that remain fast, intuitive, and maintainable as they grow."' },
    subtext: { type: String, default: 'I strive to write clean, scalable code while creating experiences that users genuinely enjoy.' }
  },
  socials: {
    email: { type: String, default: 'nuruzzaman@example.com' },
    github: { type: String, default: 'https://github.com' },
    linkedin: { type: String, default: 'https://linkedin.com' }
  }
}, { timestamps: true });

module.exports = mongoose.model('PortfolioSettings', portfolioSettingsSchema);
