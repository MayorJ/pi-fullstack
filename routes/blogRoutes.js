const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

// GET all blogs or featured blogs
router.get('/', async (req, res) => {
  try {
    const query = req.query.featured ? { isFeatured: true } : {};
    const blogs = await Blog.find(query).limit(req.query.featured ? 3 : 0);
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new blog (for admin use)
router.post('/', async (req, res) => {
  const blog = new Blog(req.body);
  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;