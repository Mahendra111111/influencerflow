import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';
import Sidebar from '../../Components/sidebar';

// Edit Profile Popup Component
const EditProfilePopup = ({ influencer, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: influencer.name || '',
    email: influencer.email || '',
    phone: influencer.phone || '',
    gender: influencer.gender || '',
    location: influencer.location || '',
    instagram: influencer.instagram || '',
    instagram_followers: influencer.instagram_followers || '',
    facebook: influencer.facebook || '',
    facebook_followers: influencer.facebook_followers || '',
    youtube: influencer.youtube || '',
    youtube_followers: influencer.youtube_followers || '',
    x: influencer.x || '',
    x_followers: influencer.x_followers || '',
    category: influencer.category || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Format data for API
      const updatedData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        location: formData.location,
        instagram: formData.instagram || null,
        instagram_followers: formData.instagram_followers ? parseInt(formData.instagram_followers) : null,
        facebook: formData.facebook || null,
        facebook_followers: formData.facebook_followers ? parseInt(formData.facebook_followers) : null,
        youtube: formData.youtube || null,
        youtube_followers: formData.youtube_followers ? parseInt(formData.youtube_followers) : null,
        x: formData.x || null,
        x_followers: formData.x_followers ? parseInt(formData.x_followers) : null,
        category: formData.category
      };

      // Call API to update influencer
      const result = await onSave(updatedData);
      onClose();
    } catch (err) {
      console.error('Error updating influencer:', err);
      setError('Failed to update influencer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Stop propagation to prevent closing when clicking inside the popup
  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '30px',
          width: '90%',
          maxWidth: '800px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
        }}
        onClick={handlePopupClick}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>Edit Influencer Profile</h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            ×
          </button>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#feeaea',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            color: '#d32f2f',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '15px' }}>Basic Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666' }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '14px'
                  }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '14px'
                  }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666' }}>
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666' }}>
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '14px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666' }}>
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666' }}>
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '15px' }}>Social Media</h3>
            
            {/* Instagram */}
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 2 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666' }}>
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666' }}>
                    Followers
                  </label>
                  <input
                    type="number"
                    name="instagram_followers"
                    value={formData.instagram_followers}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Facebook */}
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 2 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666' }}>
                    Facebook Username
                  </label>
                  <input
                    type="text"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666' }}>
                    Followers
                  </label>
                  <input
                    type="number"
                    name="facebook_followers"
                    value={formData.facebook_followers}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* YouTube */}
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 2 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666' }}>
                    YouTube Channel
                  </label>
                  <input
                    type="text"
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666' }}>
                    Subscribers
                  </label>
                  <input
                    type="number"
                    name="youtube_followers"
                    value={formData.youtube_followers}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* X (Twitter) */}
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 2 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666' }}>
                    X (Twitter) Handle
                  </label>
                  <input
                    type="text"
                    name="x"
                    value={formData.x}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666' }}>
                    Followers
                  </label>
                  <input
                    type="number"
                    name="x_followers"
                    value={formData.x_followers}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f0f0f0',
                color: '#333',
                border: 'none',
                borderRadius: '5px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ff6b4a',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '14px',
                cursor: 'pointer',
                opacity: isSubmitting ? 0.7 : 1
              }}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function InfluencerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [influencer, setInfluencer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/adminLogin');
      return;
    }

    // Fetch influencer data
    fetchInfluencerData();
  }, [id, navigate]);

  const fetchInfluencerData = async () => {
    try {
      setIsLoading(true);
      const data = await api.getInfluencerById(id);
      setInfluencer(data);
    } catch (err) {
      console.error('Error fetching influencer data:', err);
      setError('Failed to load influencer data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const handleEditClick = () => {
    setShowEditPopup(true);
  };

  const handleSaveChanges = async (updatedData) => {
    try {
      const result = await api.updateInfluencer(id, updatedData);
      setInfluencer(result[0]);
      return result;
    } catch (err) {
      console.error('Error updating influencer:', err);
      throw err;
    }
  };

  // Add a function to calculate engagement rate
  const calculateEngagement = (influencer) => {
    // This is a placeholder calculation
    // In a real app, you would use actual engagement metrics from the database
    const followers = (influencer.instagram_followers || 0) + 
                      (influencer.facebook_followers || 0) + 
                      (influencer.youtube_followers || 0) + 
                      (influencer.x_followers || 0);
    
    if (followers === 0) return 'N/A';
    
    // Generate a random engagement rate between 1% and 6%
    const randomEngagement = (Math.random() * 5 + 1).toFixed(1);
    return `${randomEngagement}%`;
  };

  // Format follower counts
  const formatFollowers = (count) => {
    if (!count) return 'N/A';
    
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    } else {
      return count.toString();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading influencer data...</p>
        </div>
      </div>
    );
  }

  if (error || !influencer) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="bg-red-50 text-red-500 p-6 rounded-lg shadow-sm mb-6">
          {error || 'Influencer not found'}
        </div>
        <button 
          onClick={() => navigate('/influencers')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Back to Influencers
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Content Header */}
        <div className="bg-white shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
          <button
                onClick={() => navigate('/influencers')}
                className="mr-4 text-gray-500 hover:text-blue-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
          </button>
              <h1 className="text-xl font-bold text-gray-800">Influencer Profile</h1>
        </div>
        <button 
              onClick={handleEditClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Edit Profile
        </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
        {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="w-28 h-28 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
            {influencer.profile_photo_url ? (
                  <img src={influencer.profile_photo_url} alt={influencer.name} className="w-full h-full object-cover" />
            ) : (
                  <span className="text-4xl text-gray-400">{influencer.name?.charAt(0)}</span>
            )}
          </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{influencer.name}</h2>
                <p className="text-gray-500 mb-3">{influencer.category || 'No category'} influencer • {influencer.location || 'Location not specified'}</p>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  {influencer.instagram && (
                    <a href={`https://instagram.com/${influencer.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
                      <span className="text-lg">📸</span>
                      <span>{influencer.instagram}</span>
                    </a>
                  )}
                  {influencer.facebook && (
                    <a href={`https://facebook.com/${influencer.facebook.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
                      <span className="text-lg">📘</span>
                      <span>{influencer.facebook}</span>
                    </a>
                  )}
                  {influencer.x && (
                    <a href={`https://x.com/${influencer.x.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
                      <span className="text-lg">🐦</span>
                      <span>{influencer.x}</span>
                    </a>
                  )}
                  {influencer.youtube && (
                    <a href={`https://youtube.com/${influencer.youtube.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
                      <span className="text-lg">📺</span>
                      <span>{influencer.youtube}</span>
                    </a>
                  )}
            </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-center px-4 py-3 bg-gray-50 rounded-md">
                  <div className="text-2xl font-bold text-gray-800">{calculateEngagement(influencer)}</div>
                  <div className="text-sm text-gray-500">Engagement</div>
                </div>
            </div>
          </div>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Personal Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{influencer.email}</p>
                </div>
            <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{influencer.phone || 'Not provided'}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">{influencer.gender || 'Not specified'}</p>
                  </div>
            <div>
                    <p className="text-sm text-gray-500">Joined</p>
                    <p className="font-medium">{new Date(influencer.created_at).toLocaleDateString()}</p>
                  </div>
                  </div>
          </div>
        </div>
        
            {/* Platform Statistics */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Platform Statistics</h3>
              <div className="space-y-4">
            {influencer.instagram && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">📸</span>
                      <span className="font-medium">Instagram</span>
                    </div>
                    <div className="font-semibold">{formatFollowers(influencer.instagram_followers)} followers</div>
              </div>
            )}
            {influencer.facebook && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">📘</span>
                      <span className="font-medium">Facebook</span>
                    </div>
                    <div className="font-semibold">{formatFollowers(influencer.facebook_followers)} followers</div>
                  </div>
            )}
                {influencer.x && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🐦</span>
                      <span className="font-medium">X</span>
                </div>
                    <div className="font-semibold">{formatFollowers(influencer.x_followers)} followers</div>
              </div>
            )}
                {influencer.youtube && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">📺</span>
                      <span className="font-medium">YouTube</span>
          </div>
                    <div className="font-semibold">{formatFollowers(influencer.youtube_followers)} followers</div>
              </div>
            )}
                {!influencer.instagram && !influencer.facebook && !influencer.x && !influencer.youtube && (
                  <p className="text-gray-500 text-center py-4">No platform data available</p>
            )}
          </div>
        </div>
              </div>
              </div>
            </div>

      {/* Edit Profile Popup */}
      {showEditPopup && (
        <EditProfilePopup 
          influencer={influencer} 
          onClose={() => setShowEditPopup(false)} 
          onSave={handleSaveChanges} 
        />
      )}
    </div>
  );
}

export default InfluencerProfile; 