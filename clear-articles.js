require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function clearArticles() {
  try {
    const { error } = await supabase.from('articles').delete().not('id', 'is', null);
    if (error) {
      console.error('Error clearing articles:', error);
    } else {
      console.log('All articles cleared successfully');
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

clearArticles(); 