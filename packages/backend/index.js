import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import influencerRoutes from './routes/influencerRoutes.js';

// ES module dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Check if .env file exists, if not, use setup-env.js
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('⚠️ No .env file found, loading environment variables from setup-env.js');
  try {
    await import('./setup-env.js');
  } catch (error) {
    console.warn('⚠️ Could not load setup-env.js, continuing with default environment variables');
  }
}

// Check if we have Supabase credentials
const hasSupabaseCredentials = process.env.SUPABASE_URL && process.env.SUPABASE_KEY;
if (hasSupabaseCredentials) {
  console.log('✅ Supabase credentials found');
  console.log('🔑 Supabase URL:', process.env.SUPABASE_URL);
  console.log('🔑 Supabase Key:', '******' + process.env.SUPABASE_KEY.slice(-6));
} else {
  console.warn('⚠️ No Supabase credentials found, running in demo mode');
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory at', uploadsDir);
}

// Serve static files from the backend's public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the frontend's build directory
const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  console.log('✅ Serving frontend from', frontendDistPath);
} else {
  console.warn('⚠️ Frontend build directory not found at', frontendDistPath);
}

// Specific route for uploads to ensure they're accessible
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Add CORS headers for specific routes
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// API routes
app.use('/api', influencerRoutes);

// For any other routes, serve the frontend's index.html (for SPA routing)
app.get('*', (req, res) => {
  // Skip API routes (they should be handled by the API router)
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  const indexPath = path.join(frontendDistPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.json({ 
      message: 'MCP Server for Influencer Onboarding System is running',
      mode: hasSupabaseCredentials ? 'production' : 'demo',
      supabase_connected: hasSupabaseCredentials
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`MCP Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
  console.log(`Frontend available at http://localhost:${PORT}/`);
  console.log(`Uploads accessible at http://localhost:${PORT}/uploads`);
  console.log(`Server running in ${hasSupabaseCredentials ? 'PRODUCTION' : 'DEMO'} mode`);
}); 