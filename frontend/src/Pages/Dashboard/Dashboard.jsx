import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';
import Sidebar from '../../Components/sidebar';

function Dashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    influencerStats: {
      total: 0,
      instagram: 0,
      facebook: 0,
      youtube: 0,
      xProfiles: 0
    },
    metrics: {
      totalInfluencers: { value: 0, percentChange: 0 },
      instagramProfiles: { value: 0, percentChange: 0 },
      facebookProfiles: { value: 0, percentChange: 0 },
      youtubeProfiles: { value: 0, percentChange: 0 },
      xProfiles: { value: 0, percentChange: 0 }
    },
    latestInfluencers: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if user is authenticated and fetch dashboard data
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/adminLogin');
    } else {
      fetchDashboardData();
    }
  }, [navigate]);

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      // Fetch metrics from API
      const metrics = await api.getDashboardMetrics();
      // Fetch all influencers
      const influencers = await api.getInfluencers();
      
      // Sort influencers by registration date (newest first) and take the latest 5
      const sortedInfluencers = influencers
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);
      
      // Format the data for the dashboard
      const formattedData = {
        influencerStats: {
          total: metrics.totalInfluencers || 0,
          instagram: metrics.instagramProfiles || 0,
          facebook: metrics.facebookProfiles || 0,
          youtube: metrics.youtubeProfiles || 0,
          xProfiles: metrics.xProfiles || 0
        },
        metrics: {
          totalInfluencers: { 
            value: metrics.totalInfluencers || 0, 
            percentChange: metrics.totalInfluencersGrowth || 0
          },
          instagramProfiles: { 
            value: metrics.instagramProfiles || 0, 
            percentChange: metrics.instagramGrowth || 0
          },
          facebookProfiles: { 
            value: metrics.facebookProfiles || 0, 
            percentChange: metrics.facebookGrowth || 0
          },
          youtubeProfiles: {
            value: metrics.youtubeProfiles || 0,
            percentChange: metrics.youtubeGrowth || 0
          },
          xProfiles: {
            value: metrics.xProfiles || 0,
            percentChange: metrics.xGrowth || 0
          }
        },
        latestInfluencers: sortedInfluencers.map(inf => ({
          id: inf.id,
          name: inf.name || 'Unknown',
          email: inf.email || '',
          platform: determineMainPlatform(inf),
          followers: calculateTotalFollowers(inf),
          engagement: calculateEngagement(inf),
          location: inf.location || 'N/A',
          registrationDate: new Date(inf.created_at).toISOString().split('T')[0],
          avatar: inf.profile_photo_url || null
        }))
      };
      
      setDashboardData(formattedData);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again later.');
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

  // Format follower count (e.g., 1200 -> 1.2K)
  const formatFollowerCount = (count) => {
    if (!count) return 'N/A';
    
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    } else {
      return count.toString();
    }
  };

  // Navigate to influencer profile page when clicked
  const handleInfluencerClick = (id) => {
    navigate(`/influencers/${id}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
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
              <div className="space-y-6">
                {/* Stats Cards in one row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Total Influencers Card */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm text-gray-500 font-medium mb-1">Total Influencers</div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-3xl font-bold">{dashboardData.metrics.totalInfluencers.value}</h2>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${dashboardData.metrics.totalInfluencers.percentChange >= 0 ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'}`}>
                          {dashboardData.metrics.totalInfluencers.percentChange >= 0 ? '+' : ''}
                          {dashboardData.metrics.totalInfluencers.percentChange}%
                        </span>
                  </div>
                </div>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <span className="inline-block mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Trending up this month</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Visitors for the last 6 months
                  </div>
                </div>
                
                  {/* Instagram Card */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm text-gray-500 font-medium mb-1">Instagram Profiles</div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-3xl font-bold">{dashboardData.influencerStats.instagram}</h2>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${dashboardData.metrics.instagramProfiles.percentChange >= 0 ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'}`}>
                          {dashboardData.metrics.instagramProfiles.percentChange >= 0 ? '+' : ''}
                          {dashboardData.metrics.instagramProfiles.percentChange}%
                        </span>
                </div>
              </div>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <span className="inline-block mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Strong user retention</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Engagement exceed targets
                    </div>
                  </div>

                  {/* Facebook Card */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm text-gray-500 font-medium mb-1">Facebook Profiles</div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-3xl font-bold">{dashboardData.influencerStats.facebook}</h2>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${dashboardData.metrics.facebookProfiles.percentChange >= 0 ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'}`}>
                          {dashboardData.metrics.facebookProfiles.percentChange >= 0 ? '+' : ''}
                          {dashboardData.metrics.facebookProfiles.percentChange}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <span className="inline-block mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Down 20% this period</span>
                </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Acquisition needs attention
                    </div>
                  </div>

                  {/* YouTube Card */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm text-gray-500 font-medium mb-1">YouTube Profiles</div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-3xl font-bold">{dashboardData.influencerStats.youtube}</h2>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${dashboardData.metrics.youtubeProfiles.percentChange >= 0 ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'}`}>
                          {dashboardData.metrics.youtubeProfiles.percentChange >= 0 ? '+' : ''}
                          {dashboardData.metrics.youtubeProfiles.percentChange}%
                        </span>
                </div>
                    </div>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <span className="inline-block mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Steady performance increase</span>
                </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Meets growth projections
                  </div>
                </div>
              </div>

                {/* Latest Registered Influencers */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-semibold text-gray-800">Latest Registered Influencers</h3>
                </div>

                  {dashboardData.latestInfluencers.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Influencer</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Followers</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {dashboardData.latestInfluencers.map((influencer) => (
                            <tr 
                              key={influencer.id}
                              className="hover:bg-gray-50 cursor-pointer transition-colors"
                              onClick={() => handleInfluencerClick(influencer.id)}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                    {influencer.avatar ? (
                                      <img 
                                        src={influencer.avatar} 
                                        alt={influencer.name} 
                                        className="h-full w-full object-cover"
                                      />
                                    ) : (
                                      <span className="text-lg">{influencer.name.charAt(0)}</span>
                                    )}
                                  </div>
                                  <div className="ml-4">
                                    <div className="font-semibold text-sm">{influencer.name}</div>
                                    <div className="text-xs text-gray-500">{influencer.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{influencer.platform}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{influencer.followers}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{influencer.engagement}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{influencer.location}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No influencers registered yet
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-center">
                    <Link
                      to="/influencers"
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      View All Influencers →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;

