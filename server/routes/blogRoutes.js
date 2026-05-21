const express = require('express');
const router = express.Router();
const { 
  getBlogs, 
  getBlogBySlug, 
  createBlog, 
  updateBlog, 
  deleteBlog 
} = require('../controllers/blogController');
const { protect, admin } = require('../middleware/authMiddleware');
const { uploadSingle } = require('../middleware/uploadMiddleware');

router.route('/')
  .get(getBlogs)
  .post(protect, admin, uploadSingle('coverImage'), createBlog);

router.route('/:slug')
  .get(getBlogBySlug);

router.route('/:id')
  .put(protect, admin, uploadSingle('coverImage'), updateBlog)
  .delete(protect, admin, deleteBlog);

module.exports = router;
