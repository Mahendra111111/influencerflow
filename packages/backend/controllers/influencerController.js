import * as supabaseService from '../services/supabaseService.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all influencers
export const getAllInfluencers = async (req, res) => {
  try {
    const influencers = await supabaseService.getInfluencers();
    res.json(influencers);
  } catch (error) {
    console.error('Error fetching influencers:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get influencer by ID
export const getInfluencerById = async (req, res) => {
  try {
    const { id } = req.params;
    const influencer = await supabaseService.getInfluencerById(id);
    
    if (!influencer) {
      return res.status(404).json({ message: 'Influencer not found' });
    }
    
    res.json(influencer);
  } catch (error) {
    console.error('Error fetching influencer:', error);
    res.status(500).json({ error: error.message });
  }
};

// Create new influencer
export const createInfluencer = async (req, res) => {
  try {
    const newInfluencer = await supabaseService.createInfluencer(req.body);
    res.status(201).json(newInfluencer);
  } catch (error) {
    console.error('Error creating influencer:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update influencer
export const updateInfluencer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInfluencer = await supabaseService.updateInfluencer(id, req.body);
    res.json(updatedInfluencer);
  } catch (error) {
    console.error('Error updating influencer:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete influencer
export const deleteInfluencer = async (req, res) => {
  try {
    const { id } = req.params;
    await supabaseService.deleteInfluencer(id);
    res.json({ message: 'Influencer deleted successfully' });
  } catch (error) {
    console.error('Error deleting influencer:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get dashboard metrics
export const getDashboardMetrics = async (req, res) => {
  try {
    const metrics = await supabaseService.getDashboardMetrics();
    res.json(metrics);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: error.message });
  }
};

// Test Supabase connection
export const testConnection = async (req, res) => {
  try {
    const result = await supabaseService.testConnection();
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error('Error testing connection:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to connect to Supabase',
      error: error.message 
    });
  }
};

// Upload profile image
export const uploadProfileImage = async (req, res) => {
  try {
    console.log('Upload request received');
    console.log('Request file:', req.file);
    console.log('Request body:', req.body);
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Get the server URL
    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}`;
    
    // Create the file URL
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;
    
    // If influencer ID is provided, update the profile photo URL
    if (req.body.influencer_id) {
      const { influencer_id } = req.body;
      await supabaseService.updateInfluencer(influencer_id, { profile_photo_url: fileUrl });
      
      return res.json({ 
        success: true, 
        message: 'Profile image uploaded and linked to influencer',
        file: req.file,
        url: fileUrl,
        influencer_id
      });
    }
    
    // Return the file URL for later use
    res.json({ 
      success: true, 
      message: 'File uploaded successfully',
      file: req.file,
      url: fileUrl
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: error.message });
  }
}; 