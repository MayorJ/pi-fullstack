const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');
const Blog = require('./models/Blog');

const MONGO_URI = process.env.MONGO_URI;

const products = [
  {
    name: "Dark Chocolate Truffles",
    description: "Rich and velvety dark chocolate truffles, a classic delight.",
    price: 15.99,
    image: "https://via.placeholder.com/300x200.png?text=Truffles",
    category: "Gift Boxes",
    isFeatured: true,
  },
  {
    name: "Mint Chocolate Bar",
    description: "A refreshing blend of dark chocolate and cool mint.",
    price: 5.50,
    image: "https://via.placeholder.com/300x200.png?text=Mint+Bar",
    category: "Bars",
    isFeatured: true,
  },
  {
    name: "Assorted Chocolate Box",
    description: "A selection of our best-selling handcrafted chocolates.",
    price: 24.99,
    image: "https://via.placeholder.com/300x200.png?text=Assorted+Box",
    category: "Gift Boxes",
    isFeatured: true,
  }
];
// ... (existing code for products array)

const blogs = [
  {
    title: "The Health Benefits of Dark Chocolate",
    summary: "Discover why a daily dose of dark chocolate can be good for you.",
    content: "Content about health benefits...",
    image: "https://via.placeholder.com/300x200.png?text=Chocolate+Health",
    category: "Health",
    author: "Jane Doe",
    publishDate: new Date('2024-04-10'),
    isFeatured: true,
  },
  {
    title: "A History of Cocoa",
    summary: "From ancient civilizations to modern-day delicacies.",
    content: "Content about cocoa history...",
    image: "https://via.placeholder.com/300x200.png?text=Cocoa+History",
    category: "History",
    author: "John Smith",
    publishDate: new Date('2024-03-25'),
    isFeatured: true,
  },
  {
    title: "Our Guide to Pairing Chocolate and Wine",
    summary: "An expert guide to help you find the perfect pairing.",
    content: "Content about wine pairing...",
    image: "https://via.placeholder.com/300x200.png?text=Wine+Pairing",
    category: "Guides",
    author: "Jane Doe",
    publishDate: new Date('2024-02-15'),
    isFeatured: true,
  }
];

// ... (rest of the seedDB function)

async function seedDB() {
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB connected for seeding.');

  // Clear existing data
  await Product.deleteMany({});
  await Blog.deleteMany({});
  console.log('Old data cleared.');

  // Insert new data
  await Product.insertMany(products);
  await Blog.insertMany(blogs);
  console.log('Database seeded successfully!');

  mongoose.connection.close();
}

seedDB();