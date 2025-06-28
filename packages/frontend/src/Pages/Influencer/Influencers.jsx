import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';
import Sidebar from '../../Components/sidebar';

function Influencers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [influencers, setInfluencers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if user is authenticated and fetch influencers
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/adminLogin');
      return;
    }
    
    fetchInfluencers();
  }, [navigate]);

  // Fetch influencers from API
  const fetchInfluencers = async () => {
    try {
      setIsLoading(true);
      const data = await api.getInfluencers();
      
      // Format the data for display
      const formattedData = data.map(inf => ({
        id: inf.id,
        name: inf.name,
        avatar: inf.profile_photo_url,
        platform: determineMainPlatform(inf),
        followers: calculateTotalFollowers(inf),
        engagement: calculateEngagement(inf),
        email: inf.email,
        phone: inf.phone,
        location: inf.location,
        gender: inf.gender,
        category: inf.category,
        created_at: inf.created_at
      }));
      
      setInfluencers(formattedData);
    } catch (err) {
      console.error('Error fetching influencers:', err);
      setError('Failed to load influencers. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Determine the main platform based on follower count
  const determineMainPlatform = (influencer) => {
    const platforms = [
      { name: 'Instagram', followers: influencer.instagram_followers, handle: influencer.instagram },
      { name: 'Facebook', followers: influencer.facebook_followers, handle: influencer.facebook },
      { name: 'YouTube', followers: influencer.youtube_followers, handle: influencer.youtube },
      { name: 'X', followers: influencer.x_followers, handle: influencer.x }
    ];
    
    // Sort by followers count (descending)
    platforms.sort((a, b) => {
      if (!a.followers && !b.followers) return b.handle ? 1 : -1;
      if (!a.followers) return 1;
      if (!b.followers) return -1;
      return b.followers - a.followers;
    });
    
    // Return the platform with the highest followers
    return platforms[0].handle ? platforms[0].name : 'N/A';
  };
  
  // Calculate total followers across all platforms
  const calculateTotalFollowers = (influencer) => {
    const total = (influencer.instagram_followers || 0) + 
                  (influencer.facebook_followers || 0) + 
                  (influencer.youtube_followers || 0) + 
                  (influencer.x_followers || 0);
    
    if (total === 0) return 'N/A';
    
    // Format large numbers
    if (total >= 1000000) {
      return `${(total / 1000000).toFixed(1)}M`;
    } else if (total >= 1000) {
      return `${(total / 1000).toFixed(1)}K`;
    } else {
      return total.toString();
    }
  };
  
  // Calculate engagement rate (placeholder - in real app would use actual engagement data)
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

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/adminLogin');
  };

  const handleInfluencerClick = (id) => {
    navigate(`/influencers/${id}`);
  };

  // Filter influencers based on search query
  const filteredInfluencers = influencers.filter(inf => {
    const query = searchQuery.toLowerCase();
    return (
      inf.name.toLowerCase().includes(query) ||
      inf.email.toLowerCase().includes(query) ||
      inf.platform.toLowerCase().includes(query) ||
      (inf.location && inf.location.toLowerCase().includes(query))
    );
  });

  const getStatusBadgeStyle = (status) => {
    switch(status) {
      case 'Subscribed':
        return {
          backgroundColor: '#e6f7ef',
          color: '#4caf50',
          border: '1px solid #c8e6c9'
        };
      case 'Not subscribed':
        return {
          backgroundColor: '#ffebee',
          color: '#f44336',
          border: '1px solid #ffcdd2'
        };
      case 'Pending':
        return {
          backgroundColor: '#fff8e1',
          color: '#ff9800',
          border: '1px solid #ffe082'
        };
      default:
        return {
          backgroundColor: '#f5f5f5',
          color: '#757575',
          border: '1px solid #e0e0e0'
        };
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Influencers</h1>
          </div>
          
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
              <input
                type="text"
                placeholder="Search influencers..."
                  className="w-full py-3 pl-12 pr-4 text-gray-700 border rounded-lg outline-none focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
            ) : error ? (
              <div className="bg-red-50 text-red-500 p-4 rounded-md">
            {error}
          </div>
            ) : (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Influencer</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Followers</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInfluencers.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                          No influencers found matching your search
                        </td>
                      </tr>
                    ) : (
                      filteredInfluencers.map((influencer) => (
                        <tr 
                    key={influencer.id}
                          className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleInfluencerClick(influencer.id)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        {influencer.avatar ? (
                                  <img src={influencer.avatar} alt={influencer.name} className="h-full w-full object-cover" />
                        ) : (
                                  <span className="text-lg">{influencer.name.charAt(0)}</span>
                        )}
                      </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{influencer.name}</div>
                                <div className="text-sm text-gray-500">{influencer.email}</div>
                      </div>
                    </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{influencer.platform}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{influencer.followers}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{influencer.engagement}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{influencer.location || 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              className="text-blue-600 hover:text-blue-900"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleInfluencerClick(influencer.id);
                              }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Influencers; 