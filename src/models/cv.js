const mongoose = require('mongoose');
const CVSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true },
  filename: String,
  s3Key: String,         // or GridFS id
  url: String,
  text: String,          // extracted text
  metadata: Object,      // e.g., sections found, years experience
});
module.exports = mongoose.model('CV', CVSchema);
