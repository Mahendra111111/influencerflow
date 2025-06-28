const API_BASE_URL = 'http://localhost:5000/api';

/**
 * API service for connecting to the MCP server
 */
export const api = {
  /**
   * Test the connection to the Supabase database
   * @returns {Promise<Object>} Response with connection status
   */
  testConnection: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/test-connection`);
      return await response.json();
    } catch (error) {
      console.error('API connection error:', error);
      return { success: false, message: 'Failed to connect to API server', error: error.message };
    }
  },

  /**
   * Get dashboard metrics
   * @returns {Promise<Object>} Dashboard metrics data
   */
  getDashboardMetrics: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/metrics`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching metrics:', error);
      throw error;
    }
  },

  /**
   * Get all influencers
   * @returns {Promise<Array>} List of influencers
   */
  getInfluencers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/influencers`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching influencers:', error);
      throw error;
    }
  },

  /**
   * Get an influencer by ID
   * @param {string|number} id Influencer ID
   * @returns {Promise<Object>} Influencer data
   */
  getInfluencerById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/influencers/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching influencer ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new influencer
   * @param {Object} influencerData Influencer data
   * @returns {Promise<Object>} Created influencer
   */
  createInfluencer: async (influencerData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/influencers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(influencerData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating influencer:', error);
      throw error;
    }
  },

  /**
   * Update an influencer
   * @param {string|number} id Influencer ID
   * @param {Object} influencerData Updated influencer data
   * @returns {Promise<Object>} Updated influencer
   */
  updateInfluencer: async (id, influencerData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/influencers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(influencerData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating influencer ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete an influencer
   * @param {string|number} id Influencer ID
   * @returns {Promise<Object>} Response with success message
   */
  deleteInfluencer: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/influencers/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error deleting influencer ${id}:`, error);
      throw error;
    }
  },

  /**
   * Upload a profile image
   * @param {File} file The image file to upload
   * @param {string|null} influencerId Optional influencer ID to link the image to
   * @returns {Promise<Object>} Response with the uploaded file URL
   */
  uploadProfileImage: async (file, influencerId = null) => {
    try {
      const formData = new FormData();
      formData.append('profile_image', file);
      
      if (influencerId) {
        formData.append('influencer_id', influencerId);
      }
      
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error uploading profile image:', error);
      throw error;
    }
  }
}; 