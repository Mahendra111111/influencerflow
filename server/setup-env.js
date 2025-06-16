import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment variables
const envContent = `# Supabase Configuration
SUPABASE_URL=https://qwbyfckieoxlzuoyigjh.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3YnlmY2tpZW94bHp1b3lpZ2poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMzEyMTAsImV4cCI6MjA2MzkwNzIxMH0.a5d7zwVT3utCQx3kNe-6knU7S-Tf9F_M1-9Zu4pC94I

# Server Configuration
PORT=5000
`;

// Write to .env file
const envPath = path.join(__dirname, '.env');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Successfully created .env file with Supabase credentials');
  console.log('🔑 Supabase URL and key have been configured');
} catch (error) {
  console.error('❌ Error creating .env file:', error);
}

// Set environment variables for current process
process.env.SUPABASE_URL = 'https://qwbyfckieoxlzuoyigjh.supabase.co';
process.env.SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3YnlmY2tpZW94bHp1b3lpZ2poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMzEyMTAsImV4cCI6MjA2MzkwNzIxMH0.a5d7zwVT3utCQx3kNe-6knU7S-Tf9F_M1-9Zu4pC94I';
process.env.PORT = '5000';

console.log('✅ Environment variables set for current process');
console.log('🚀 Ready to connect to Supabase'); 