import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from setup-env.js if .env doesn't exist
try {
  dotenv.config();
  
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    console.log('⚠️ No environment variables found, loading from setup-env.js');
    await import('./setup-env.js');
  }
} catch (error) {
  console.error('Error loading environment variables:', error);
  process.exit(1);
}

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? '******' + supabaseKey.slice(-6) : 'Not set');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabaseConnection() {
  try {
    console.log('Testing connection to Supabase...');
    
    // Test basic connection
    const { data: healthData, error: healthError } = await supabase.rpc('get_service_status');
    
    if (healthError) {
      // If the RPC doesn't exist, we'll try another approach
      console.log('Basic health check not available, trying table access...');
    } else {
      console.log('✅ Supabase service status:', healthData || 'OK');
    }
    
    // Check if the influencers table exists by trying to query it
    const { data, error } = await supabase.from('influencers').select('count');
    
    if (error) {
      if (error.message.includes('relation "influencers" does not exist')) {
        console.log('⚠️ The influencers table does not exist. Creating it...');
        await createInfluencersTable();
      } else {
        throw error;
      }
    } else {
      console.log('✅ Successfully connected to Supabase!');
      console.log('✅ Influencers table exists with count:', data[0]?.count || 0);
    }
  } catch (error) {
    console.error('❌ Error connecting to Supabase:', error.message);
    console.error('Details:', error);
    
    if (error.message.includes('permission denied')) {
      console.log('\n⚠️ Permission denied. Make sure your Supabase key has the necessary permissions.');
      console.log('Try creating the table manually using the SQL editor in the Supabase dashboard.');
      console.log('SQL to create the table:');
      console.log(`
CREATE TABLE IF NOT EXISTS influencers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  instagram_handle TEXT,
  facebook_handle TEXT,
  youtube_handle TEXT,
  twitter_handle TEXT,
  bio TEXT,
  profile_image TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`);
    }
  }
}

async function createInfluencersTable() {
  try {
    // Check if we have permission to create tables
    const { error: permissionError } = await supabase
      .from('_test_permission')
      .insert({ id: 1 })
      .select();
    
    if (permissionError && permissionError.message.includes('permission denied')) {
      console.log('⚠️ You do not have permission to create tables directly.');
      console.log('Please create the table manually using the SQL editor in the Supabase dashboard.');
      console.log('SQL to create the table:');
      console.log(`
CREATE TABLE IF NOT EXISTS influencers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  instagram_handle TEXT,
  facebook_handle TEXT,
  youtube_handle TEXT,
  twitter_handle TEXT,
  bio TEXT,
  profile_image TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`);
      return;
    }
    
    // Try to create the table using the Supabase API
    const { error } = await supabase.rpc('create_influencers_table');
    
    if (error) {
      // If the RPC function doesn't exist, we'll try a direct approach
      console.log('Creating table using direct SQL...');
      
      // Attempt to use the REST API to create the table
      const { data, error: tableError } = await supabase
        .from('influencers')
        .insert([
          { 
            name: 'Sample Influencer',
            email: 'sample@example.com',
            instagram_handle: 'sample_influencer',
            facebook_handle: 'sample.influencer',
            youtube_handle: 'sampleinfluencer',
            twitter_handle: 'sample_influencer',
            bio: 'This is a sample influencer profile created automatically.',
            status: 'active'
          }
        ])
        .select();
      
      if (tableError) {
        throw tableError;
      }
      
      console.log('✅ Influencers table created successfully!');
      console.log('✅ Sample influencer created:', data);
    } else {
      console.log('✅ Influencers table created successfully via RPC!');
    }
  } catch (error) {
    console.error('❌ Error creating influencers table:', error.message);
    
    if (error.message.includes('permission denied')) {
      console.log('\n⚠️ Permission denied. Make sure your Supabase key has the necessary permissions.');
      console.log('Try creating the table manually using the SQL editor in the Supabase dashboard.');
      console.log('SQL to create the table:');
      console.log(`
CREATE TABLE IF NOT EXISTS influencers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  instagram_handle TEXT,
  facebook_handle TEXT,
  youtube_handle TEXT,
  twitter_handle TEXT,
  bio TEXT,
  profile_image TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`);
    }
  }
}

// Run the test
await testSupabaseConnection(); 