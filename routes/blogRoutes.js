// routes/blogRoutes.js

const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// @route GET /api/blogs
// @desc Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route GET /api/blogs/featured
// @desc Get all featured blogs
router.get('/featured', async (req, res) => {
    try {
        const featuredBlogs = await Blog.find({ isFeatured: true });
        res.json(featuredBlogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ... your other blog routes for post, put, delete etc.

module.exports = router;