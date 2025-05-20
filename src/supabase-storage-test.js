require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing REACT_APP_SUPABASE_URL or REACT_APP_SUPABASE_ANON_KEY in .env file');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testStorage() {
  console.log('Supabase URL:', SUPABASE_URL);

  // 1. List buckets
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  console.log('Buckets:', buckets);
  if (bucketsError) {
    console.error('Buckets error:', bucketsError);
    return;
  }

  // 2. Check for project-images bucket
  const hasProjectImages = buckets.some(b => b.name === 'project-images');
  if (!hasProjectImages) {
    console.error('project-images bucket NOT found!');
    return;
  } else {
    console.log('project-images bucket found!');
  }

  // 3. Upload a test file
  const testFilePath = path.join(__dirname, 'test-upload.txt');
  fs.writeFileSync(testFilePath, 'Hello from Supabase test!');
  const fileBuffer = fs.readFileSync(testFilePath);

  const { data: uploadData, error: uploadError } = await supabase
    .storage
    .from('project-images')
    .upload('test-upload.txt', fileBuffer, { upsert: true });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    return;
  } else {
    console.log('Upload success:', uploadData);
  }

  // 4. List files in project-images
  const { data: files, error: listError } = await supabase
    .storage
    .from('project-images')
    .list();

  if (listError) {
    console.error('List files error:', listError);
    return;
  } else {
    console.log('Files in project-images:', files);
  }

  // 5. Clean up test file
  fs.unlinkSync(testFilePath);
}

testStorage(); 
