// This script ensures proper navigation between the static index.html and the React app
document.addEventListener('DOMContentLoaded', () => {
  // Get all register buttons (both /register and other variations)
  const registerButtons = document.querySelectorAll('a[href="/register"], a[href="register"], a[href="#register"]');
  
  // Add event listeners to each button
  registerButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      // Use the full URL to avoid relative path issues
      window.location.href = window.location.origin + '/register';
      console.log('Redirecting to register page:', window.location.origin + '/register');
    });
  });
  
  // Log for debugging
  console.log('Redirect.js loaded, found ' + registerButtons.length + ' register buttons');
}); 