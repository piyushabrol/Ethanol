const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  history: [String],
});

module.exports = mongoose.model('Product', ProductSchema);
