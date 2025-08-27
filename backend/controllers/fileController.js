
const cloudinary = require('../config/cloudinary');
const Product = require('../models/Product');
const Blog = require('../models/Blog');

exports.listAll = async (req, res) => {
  // Return images referenced in products and blogs
  const products = await Product.find({}, 'imageUrl imagePublicId');
  const blogs = await Blog.find({}, 'imageUrl imagePublicId');
  res.json({ products, blogs });
};

exports.deleteByPublicId = async (req, res) => {
  const { publicId } = req.params;
  if(!publicId) return res.status(400).json({ message: 'publicId required' });
  try{
    await cloudinary.uploader.destroy(publicId);
    // Optionally remove references from DB
    await Product.updateMany({ imagePublicId: publicId }, { $unset: { imageUrl: "", imagePublicId: "" } });
    await Blog.updateMany({ imagePublicId: publicId }, { $unset: { imageUrl: "", imagePublicId: "" } });
    res.json({ message: 'deleted' });
  }catch(err){
    res.status(500).json({ message: err.message });
  }
};
