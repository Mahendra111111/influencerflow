import express from 'express';
import * as influencerController from '../controllers/influencerController.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'profile-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

const router = express.Router();

// Test connection route
router.get('/test-connection', influencerController.testConnection);

// Dashboard metrics
router.get('/metrics', influencerController.getDashboardMetrics);

// Influencer CRUD routes
router.get('/influencers', influencerController.getAllInfluencers);
router.get('/influencers/:id', influencerController.getInfluencerById);
router.post('/influencers', influencerController.createInfluencer);
router.put('/influencers/:id', influencerController.updateInfluencer);
router.delete('/influencers/:id', influencerController.deleteInfluencer);

// File upload route
router.post('/upload', upload.single('profile_image'), influencerController.uploadProfileImage);

export default router; 