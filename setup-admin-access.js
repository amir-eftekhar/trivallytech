// Admin Access Setup Script
// Save this file and open it in a browser to set up admin access

const adminToken = 'tvtech-admin-2024-secure-token-xyz123';

function setupAdminAccess() {
  try {
    // Set the admin token
    localStorage.setItem('adminToken', adminToken);
    
    // Verify the token was set
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken === adminToken) {
      alert('Admin access has been successfully set up! Please refresh the page.');
    } else {
      alert('Error: Failed to set up admin access. Please try again.');
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

// Create a simple UI for the setup
document.body.innerHTML = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
    <h1 style="color: #333;">Admin Access Setup</h1>
    <p style="color: #666;">Click the button below to set up admin access for the Tri-Valley Tech website.</p>
    <button onclick="setupAdminAccess()" style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">
      Set Up Admin Access
    </button>
    <p style="color: #666; margin-top: 20px; font-size: 0.9em;">
      Note: After setting up access, please refresh the main website page to see the admin controls.
    </p>
  </div>
`; 