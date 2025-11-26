const mongoose = require('mongoose');
const CVSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: String,
  s3Key: String,         // or GridFS id
  text: String,          // extracted text
  parsedAt: Date,
  metadata: Object,      // e.g., sections found, years experience
});
module.exports = mongoose.model('CV', CVSchema);
