import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'placeholder-key';

// Create a warning instead of exiting the process
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.warn('⚠️ Missing Supabase credentials. Running in demo mode with limited functionality.');
  console.warn('Please create a .env file in the server directory with your Supabase credentials:');
  console.warn(`
# Supabase Configuration
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_anon_key_here

# Server Configuration
PORT=5000
  `);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to handle demo mode
const handleDemoMode = (operation) => {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    console.warn(`⚠️ Demo mode: ${operation} operation simulated`);
    return true;
  }
  return false;
};

// Influencer services
export const getInfluencers = async () => {
  if (handleDemoMode('getInfluencers')) {
    return [
      { id: '1', name: 'Demo Influencer 1', email: 'demo1@example.com', instagram_handle: 'demo1', status: 'active', created_at: new Date().toISOString() },
      { id: '2', name: 'Demo Influencer 2', email: 'demo2@example.com', facebook_handle: 'demo2', status: 'pending', created_at: new Date().toISOString() }
    ];
  }

  const { data, error } = await supabase
    .from('influencers')
    .select('*');
  
  if (error) {
    throw error;
  }
  
  return data;
};

export const getInfluencerById = async (id) => {
  if (handleDemoMode('getInfluencerById')) {
    return { 
      id, 
      name: 'Demo Influencer', 
      email: `demo${id}@example.com`, 
      instagram_handle: `demo${id}`,
      facebook_handle: `demo${id}`,
      youtube_handle: `demo${id}`,
      twitter_handle: `demo${id}`,
      bio: 'This is a demo influencer profile',
      status: 'active',
      created_at: new Date().toISOString()
    };
  }

  const { data, error } = await supabase
    .from('influencers')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    throw error;
  }
  
  return data;
};

export const createInfluencer = async (influencerData) => {
  if (handleDemoMode('createInfluencer')) {
    return [{ 
      id: Math.random().toString(36).substring(7), 
      ...influencerData, 
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }];
  }

  // Map frontend field names to database field names if needed
  const dbInfluencerData = {
    name: influencerData.name,
    email: influencerData.email,
    phone: influencerData.phone,
    gender: influencerData.gender,
    location: influencerData.location,
    instagram: influencerData.instagram,
    instagram_followers: influencerData.instagram_followers,
    facebook: influencerData.facebook,
    facebook_followers: influencerData.facebook_followers,
    youtube: influencerData.youtube,
    youtube_followers: influencerData.youtube_followers,
    x: influencerData.x || influencerData.twitter, // Handle both x and twitter field names
    x_followers: influencerData.x_followers || influencerData.twitter_followers,
    category: influencerData.category
  };

  const { data, error } = await supabase
    .from('influencers')
    .insert(dbInfluencerData)
    .select();
  
  if (error) {
    console.error('Error creating influencer:', error);
    throw error;
  }
  
  return data;
};

export const updateInfluencer = async (id, influencerData) => {
  if (handleDemoMode('updateInfluencer')) {
    return [{ 
      id, 
      ...influencerData, 
      updated_at: new Date().toISOString()
    }];
  }

  const { data, error } = await supabase
    .from('influencers')
    .update(influencerData)
    .eq('id', id)
    .select();
  
  if (error) {
    throw error;
  }
  
  return data;
};

export const deleteInfluencer = async (id) => {
  if (handleDemoMode('deleteInfluencer')) {
    return true;
  }

  const { error } = await supabase
    .from('influencers')
    .delete()
    .eq('id', id);
  
  if (error) {
    throw error;
  }
  
  return true;
};

// Dashboard metrics
export const getDashboardMetrics = async () => {
  if (handleDemoMode('getDashboardMetrics')) {
    return {
      totalInfluencers: 42,
      instagramProfiles: 28,
      facebookProfiles: 15,
      youtubeProfiles: 10,
      twitterProfiles: 18,
      latestInfluencers: [
        { id: '1', name: 'Demo Influencer 1', email: 'demo1@example.com', instagram: 'demo1', status: 'active', created_at: new Date().toISOString() },
        { id: '2', name: 'Demo Influencer 2', email: 'demo2@example.com', facebook: 'demo2', status: 'pending', created_at: new Date().toISOString() },
        { id: '3', name: 'Demo Influencer 3', email: 'demo3@example.com', youtube: 'demo3', status: 'active', created_at: new Date().toISOString() },
        { id: '4', name: 'Demo Influencer 4', email: 'demo4@example.com', x: 'demo4', status: 'pending', created_at: new Date().toISOString() },
        { id: '5', name: 'Demo Influencer 5', email: 'demo5@example.com', instagram: 'demo5', status: 'active', created_at: new Date().toISOString() }
      ]
    };
  }

  try {
    // Get total influencers
    const { data: influencersCount, error: influencersError } = await supabase
      .from('influencers')
      .select('count');
    
    if (influencersError) throw influencersError;
    
    // Get platform-specific counts
    const { data: instagramCount, error: instagramError } = await supabase
      .from('influencers')
      .select('count')
      .not('instagram', 'is', null);
    
    if (instagramError) throw instagramError;
    
    const { data: facebookCount, error: facebookError } = await supabase
      .from('influencers')
      .select('count')
      .not('facebook', 'is', null);
    
    if (facebookError) throw facebookError;
    
    const { data: youtubeCount, error: youtubeError } = await supabase
      .from('influencers')
      .select('count')
      .not('youtube', 'is', null);
    
    if (youtubeError) throw youtubeError;
    
    const { data: twitterCount, error: twitterError } = await supabase
      .from('influencers')
      .select('count')
      .not('x', 'is', null);
    
    if (twitterError) throw twitterError;
    
    // Get latest registered influencers
    const { data: latestInfluencers, error: latestError } = await supabase
      .from('influencers')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (latestError) throw latestError;
    
    return {
      totalInfluencers: influencersCount[0]?.count || 0,
      instagramProfiles: instagramCount[0]?.count || 0,
      facebookProfiles: facebookCount[0]?.count || 0,
      youtubeProfiles: youtubeCount[0]?.count || 0,
      twitterProfiles: twitterCount[0]?.count || 0,
      latestInfluencers
    };
  } catch (error) {
    console.error('Error fetching metrics:', error);
    throw error;
  }
};

// Test connection
export const testConnection = async () => {
  if (handleDemoMode('testConnection')) {
    return { 
      success: true, 
      message: 'Running in demo mode. No actual Supabase connection.',
      data: [{ count: 42 }],
      demo: true
    };
  }

  try {
    const { data, error } = await supabase.from('influencers').select('count');
    
    if (error) {
      throw error;
    }
    
    return { 
      success: true, 
      message: 'Successfully connected to Supabase',
      data 
    };
  } catch (error) {
    console.error('Supabase connection error:', error);
    return { 
      success: false, 
      message: 'Failed to connect to Supabase',
      error: error.message 
    };
  }
};

export default supabase; 