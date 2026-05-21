const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a blog title'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  excerpt: {
    type: String,
    required: [true, 'Please add a short excerpt'],
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add blog content'],
  },
  coverImage: {
    type: String,
    default: '/uploads/default-blog.png',
  },
  author: {
    type: String,
    default: 'Admin',
  },
  tags: {
    type: [String],
    default: [],
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Blog', blogSchema);
