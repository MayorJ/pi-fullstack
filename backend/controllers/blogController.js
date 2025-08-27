
const Blog = require('../models/Blog');

exports.list = async (req, res) => {
  const items = await Blog.find().sort({ createdAt: -1 });
  res.json(items);
};

exports.get = async (req, res) => {
  const b = await Blog.findById(req.params.id);
  if(!b) return res.status(404).json({ message: 'Not found' });
  res.json(b);
};

exports.create = async (req, res) => {
  const imageUrl = req.file ? req.file.path : req.body.imageUrl;
  const publicId = req.file ? req.file.filename : req.body.imagePublicId;
  const b = new Blog({ title: req.body.title, excerpt: req.body.excerpt, content: req.body.content, imageUrl, imagePublicId: publicId, tags: req.body.tags ? req.body.tags.split(',').map(t=>t.trim()) : [], author: req.body.author });
  await b.save();
  res.json(b);
};

exports.remove = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: 'deleted' });
};

exports.update = async (req, res) => {
  const imageUrl = req.file ? req.file.path : req.body.imageUrl;
  const publicId = req.file ? req.file.filename : req.body.imagePublicId;
  const upd = { title: req.body.title, excerpt: req.body.excerpt, content: req.body.content, imageUrl, imagePublicId: publicId };
  const b = await Blog.findByIdAndUpdate(req.params.id, upd, { new: true });
  res.json(b);
};
