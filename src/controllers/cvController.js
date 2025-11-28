require('dotenv').config(); 


const { uploadToSupabase } = require("../services/storageService");

exports.upoloadcv = async (req, res) => {
  try {
    console.log('Upload CV controller called');
    console.log('File received:', req.file );
  

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const uploaded = await uploadToSupabase(req.file);
 

  return res.status(200).json({
    success : true,
    message:"cv uploaded succefully",
    file:uploaded
  });
} catch (error) {
  console.error('Upload error:', error.message);
  res.status(500).json({ error: 'File upload failed' });
}

};



  
