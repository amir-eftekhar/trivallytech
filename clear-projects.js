// clear-projects.js
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

(async () => {
  const { error } = await supabase.from('projects').delete().not('id', 'is', null);
  if (error) {
    console.error('Error clearing projects:', error);
  } else {
    console.log('All projects cleared from the database.');
  }
})(); 