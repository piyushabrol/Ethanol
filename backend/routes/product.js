const express = require('express');
const auth = require('../middleware/auth');
const Product = require('../models/Product');

const router = express.Router();

// Get all products
router.get('/product', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get product by ID
router.get('/product/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// Get product history (auth required)
router.get('/product/history', auth, async (req, res) => {
  const products = await Product.find();
  const history = products.map(p => p.history).flat();
  res.json({ history });
});

// Buy product (auth required)
router.post('/product/buy', auth, async (req, res) => {
  const { product_id, bank, amount } = req.body;
  const product = await Product.findById(product_id);
  product.history.push(`Bought using ${bank} for ${amount}`);
  await product.save();
  res.json({ message: "Purchase successful" });
});

module.exports = router;
