require('dotenv').config();
const { createClient } = require("@supabase/supabase-js");
const multer = require("multer");

// Supabase client (use service key for backend uploads)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_KEY
);

// Multer memory storage
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage });

// Upload to Supabase Storage
const uploadToSupabase = async (file) => {
  const fileName = `cv/${Date.now()}_${file.originalname}`;

  const { data, error } = await supabase.storage
    .from('cv-upload')
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: true
    });

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from('cv-upload')
    .getPublicUrl(fileName);

  return {
    key: fileName,
    url: publicUrlData.publicUrl
  };
};

// ✅ Export everything as an object
module.exports = {
  supabase,
  uploadMiddleware,
  uploadToSupabase
};
