
const Order = require('../models/Order');

exports.create = async (req, res) => {
  const o = new Order({ items: req.body.items, total: req.body.total, customer: req.body.customer });
  await o.save();
  res.json(o);
};

exports.list = async (req, res) => {
  const items = await Order.find().sort({ createdAt: -1 });
  res.json(items);
};

exports.get = async (req, res) => {
  const o = await Order.findById(req.params.id);
  if(!o) return res.status(404).json({ message: 'Not found' });
  res.json(o);
};
