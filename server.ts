import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

const PORTFOLIO_CONTEXT = `
You are the AI Assistant embedded in Chandana Sirimalla's personal portfolio.
Answer questions accurately, professionally, and concisely strictly based on the following verified information:

ABOUT CHANDANA SIRIMALLA:
- Name: Chandana Sirimalla
- Role: Aspiring Software Engineer & MERN Stack Developer
- Headline: Engineering scalable, modern, and user-friendly web applications
- Location: India
- Status: Available for Software Engineering Roles & Opportunities

SKILLS:
- Proficient: HTML5, CSS3, Git, GitHub, MongoDB, Postman
- Familiar: JavaScript, React.js, Node.js, Express.js, Mongoose, Axios, React Router, Bootstrap, Tailwind CSS
- Core Competencies: Full-Stack MERN Development, RESTful APIs, Component-Driven UI, Responsive Design, State Management

PROJECTS:
1. Finora AI (Featured Project):
   - Category: AI / Finance / Web Application
   - Description: Smart Expense Tracker & Financial Intelligence platform. Live income/expense analytics, category-wise breakdown charts, budget tracking, real-time sync, and an AI advisor.
   - Tech: React, TypeScript, Tailwind CSS, Recharts, Firebase/Firestore, Vite, Lucide Icons
   - Live URL: https://finora-ai-sepia.vercel.app/

2. AI Presentation Suite:
   - Category: AI / Productivity
   - Description: Intelligent full-stack presentation generator with 9 visual themes, dynamic slide canvas, PPTX/PDF export.
   - Tech: React, TypeScript, Tailwind CSS, Node.js, Gemini API
   - Live URL: https://ai-ppt-slides-builder.onrender.com
   - GitHub: https://github.com/sirimallachandana4/AI-PPT-Slides-Builder

3. Student Performance Analyzer:
   - Category: Academic Analytics / Full-Stack
   - Description: Academic performance tracking system with automated GPA metrics and grade distribution visualizations.
   - Tech: Python, Flask, SQLite, HTML5/CSS3, Matplotlib
   - Live URL: https://student-performance-analyser-7wza.onrender.com
   - GitHub: https://github.com/sirimallachandana4/Student-Performance-Analyser

EDUCATION:
- B.Tech in Computer Science & Engineering (2022 - 2026)
- Focus: Data Structures, Algorithms, Web Architecture, Cloud Computing

CONTACT & PROFILES:
- Email: sirimallachandana4@gmail.com
- LinkedIn: https://www.linkedin.com/in/sirimalla-chandana-83b58a32b
- GitHub: https://github.com/sirimallachandana4

CRITICAL INSTRUCTIONS:
- Do NOT invent companies, achievements, or unlisted technologies.
- Do NOT mention any shopping application (it was removed).
- Keep answers polite, direct, and under 3-4 sentences when possible.
`;

app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const client = getAIClient();
    if (!client) {
      return res.json({
        reply: "Chandana Sirimalla is an aspiring Software Engineer and MERN Stack Developer specializing in React, Node.js, and MongoDB. Her featured project is Finora AI (https://finora-ai-sepia.vercel.app/). You can reach her at sirimallachandana4@gmail.com."
      });
    }

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${PORTFOLIO_CONTEXT}\n\nUser Question: ${prompt}` }]
        }
      ]
    });

    const reply = response.text || "I'd be glad to help answer anything about Chandana's portfolio, skills, or projects.";
    return res.json({ reply });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({
      error: 'Failed to process AI response',
      fallback: "Chandana Sirimalla is a MERN Stack Developer. Explore her featured Finora AI project or contact her directly at sirimallachandana4@gmail.com."
    });
  }
});

// Static files in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
