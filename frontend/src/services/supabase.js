import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://qwbyfckieoxlzuoyigjh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3YnlmY2tpZW94bHp1b3lpZ2poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMzEyMTAsImV4cCI6MjA2MzkwNzIxMH0.a5d7zwVT3utCQx3kNe-6knU7S-Tf9F_M1-9Zu4pC94I';

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase; 