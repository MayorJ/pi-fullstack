
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: String,
  content: { type: String, required: true },
  imageUrl: String,
  imagePublicId: String,
  tags: [String],
  author: String
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
