import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// Function to generate a secure token
const generateSecureToken = () => {
  const randomBytes = new Uint8Array(32);
  crypto.getRandomValues(randomBytes);
  return Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

// Function to hash token using Web Crypto API
const hashToken = async (token) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Function to verify admin access
export const verifyAdminAccess = async () => {
  try {
    // Get the stored token from localStorage
    const storedToken = localStorage.getItem('adminToken');
    
    if (!storedToken) {
      return false;
    }

    // Hash the stored token
    const hashedToken = await hashToken(storedToken);

    // Verify the token with Supabase
    const { data, error } = await supabase
      .from('admin_access')
      .select('*')
      .eq('token_hash', hashedToken)
      .eq('revoked', false)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error || !data) {
      return false;
    }

    // Check if token is expired
    if (new Date(data.expires_at) < new Date()) {
      localStorage.removeItem('adminToken');
      return false;
    }

    // Check if token is revoked
    if (data.revoked) {
      localStorage.removeItem('adminToken');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error verifying admin access:', error);
    return false;
  }
};

// Function to set admin access
export const setAdminAccess = async (token) => {
  try {
    // Hash the provided token
    const hashedToken = await hashToken(token);

    // Verify the token with Supabase
    const { data, error } = await supabase
      .from('admin_access')
      .select('*')
      .eq('token_hash', hashedToken)
      .eq('revoked', false)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error || !data) {
      return false;
    }

    // Check if token is expired
    if (new Date(data.expires_at) < new Date()) {
      return false;
    }

    // Check if token is revoked
    if (data.revoked) {
      return false;
    }

    // Store the original token in localStorage
    localStorage.setItem('adminToken', token);
    return true;
  } catch (error) {
    console.error('Error setting admin access:', error);
    return false;
  }
};

// Function to remove admin access
export const removeAdminAccess = () => {
  localStorage.removeItem('adminToken');
};

// Function to check if user is admin
export const isAdmin = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) return false;

    const hashedToken = await hashToken(token);
    
    const { data, error } = await supabase
      .from('admin_access')
      .select('*')
      .eq('token_hash', hashedToken)
      .eq('revoked', false)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error in isAdmin:', error);
    return false;
  }
};

// Function to create a new admin token (admin only)
export const createAdminToken = async (expiresInDays = 365) => {
  try {
    const token = generateSecureToken();
    const hashedToken = await hashToken(token);
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