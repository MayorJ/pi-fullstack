const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET all products or featured products
router.get('/', async (req, res) => {
  try {
    const query = req.query.featured ? { isFeatured: true } : {};
    const products = await Product.find(query).limit(req.query.featured ? 3 : 0);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new product (for admin use)
router.post('/', async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;