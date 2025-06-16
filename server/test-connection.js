// Simple script to test the server connection
import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000/api';

async function testConnection() {
  try {
    console.log('Testing connection to the MCP server...');
    
    const response = await fetch(`${API_URL}/test-connection`);
    const data = await response.json();
    
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('✅ Connection successful!');
      if (data.demo) {
        console.log('ℹ️ Server is running in demo mode. No actual Supabase connection.');
      }
    } else {
      console.log('❌ Connection failed:', data.message);
    }
  } catch (error) {
    console.error('❌ Error connecting to server:', error.message);
  }
}

testConnection(); 