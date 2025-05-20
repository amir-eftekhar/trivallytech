const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase credentials. Please set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Function to generate a secure token
const generateSecureToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Function to hash the token
const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

// Function to create a new admin token
const createAdminToken = async (expiresInDays = 365) => {
  try {
    const token = generateSecureToken();
    const hashedToken = hashToken(token);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    const { error } = await supabase
      .from('admin_access')
      .insert([
        {
          token_hash: hashedToken,
          expires_at: expiresAt.toISOString(),
          revoked: false,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      throw error;
    }

    return token;
  } catch (error) {
    console.error('Error creating admin token:', error);
    throw error;
  }
};

async function generateToken() {
  try {
    // Generate a new token that expires in 1 year
    const token = await createAdminToken(365);
    
    console.log('\n=== ADMIN ACCESS TOKEN ===');
    console.log('\nToken:', token);
    console.log('\nExpires: 1 year from now');
    console.log('\nIMPORTANT: Save this token securely. It will only be shown once!');
    console.log('\nTo use this token:');
    console.log('1. Open the website in your browser');
    console.log('2. Open the browser\'s developer tools (F12)');
    console.log('3. Go to the Console tab');
    console.log('4. Run this command:');
    console.log(`localStorage.setItem('adminToken', '${token}')`);
    console.log('5. Refresh the page');
  } catch (error) {
    console.error('Error generating token:', error);
    process.exit(1);
  }
}

// Run the token generation
generateToken(); 