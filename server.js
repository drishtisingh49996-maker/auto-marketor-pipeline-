import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import pipelineRouter from './routes/pipeline.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend development server
app.use(cors({
  origin: '*', // In production, restrict this to your specific frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Ensure the outputs directory exists on startup
const outputsDir = path.join(__dirname, 'outputs');
if (!fs.existsSync(outputsDir)) {
  fs.mkdirSync(outputsDir, { recursive: true });
}

// Serve outputs static files (generated images, texts)
app.use('/outputs', express.static(outputsDir));

// API routes
app.use('/api/pipeline', pipelineRouter);

// Root route health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    apiConfig: {
      groq: !!process.env.GROQ_API_KEY,
      huggingface: !!process.env.HF_API_KEY
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`  Auto-Marketer Pipeline Backend is running!`);
  console.log(`  Local URL: http://localhost:${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/health`);
  console.log(`===================================================`);
});
