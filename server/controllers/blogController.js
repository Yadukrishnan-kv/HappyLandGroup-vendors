const Blog = require('../models/Blog');

// Utility to generate slug
const generateSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, author, tags } = req.body;
    let coverImage = '/uploads/default-blog.png';
    
    if (req.file) {
      coverImage = `/uploads/${req.file.filename}`;
    }

    const slug = generateSlug(title);

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      coverImage,
      author,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    const { title, excerpt, content, author, tags } = req.body;
    let updateData = { excerpt, content, author };

    if (title) {
      updateData.title = title;
      updateData.slug = generateSlug(title);
    }
    
    if (tags) {
      updateData.tags = tags.split(',').map(tag => tag.trim());
    }

    if (req.file) {
      updateData.coverImage = `/uploads/${req.file.filename}`;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    res.json({ success: true, data: updatedBlog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    await blog.deleteOne();
    res.json({ success: true, message: 'Blog removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog
};
