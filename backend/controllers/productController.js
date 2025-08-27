
const Product = require('../models/Product');

exports.list = async (req, res) => {
  const items = await Product.find().sort({ createdAt: -1 });
  res.json(items);
};

exports.get = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if(!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
};

exports.create = async (req, res) => {
  const imageUrl = req.file ? req.file.path : req.body.imageUrl;
  const publicId = req.file ? req.file.filename : req.body.imagePublicId;
  const p = new Product({ name: req.body.name, description: req.body.description, price: req.body.price, category: req.body.category, imageUrl, imagePublicId: publicId, stock: req.body.stock||0 });
  await p.save();
  res.json(p);
};

exports.remove = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'deleted' });
};

exports.update = async (req, res) => {
  const imageUrl = req.file ? req.file.path : req.body.imageUrl;
  const publicId = req.file ? req.file.filename : req.body.imagePublicId;
  const upd = { name: req.body.name, description: req.body.description, price: req.body.price, category: req.body.category, imageUrl, imagePublicId: publicId };
  const p = await Product.findByIdAndUpdate(req.params.id, upd, { new: true });
  res.json(p);
};
