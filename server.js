const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const blogRoutes = require('./routes/blogRoutes');
const orderRoutes = require('./routes/orderRoutes');
// const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Correct Middleware Order
app.use(express.json()); // Parses the request body first
app.use(cors()); // Then handles CORS headers

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes must come after middleware
app.use('/api/products', productRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/orders', orderRoutes);
// app.use('/api/users', userRoutes);

// Simple root route for testing
app.get('/', (req, res) => {
  res.send('Pisces Backend API is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});