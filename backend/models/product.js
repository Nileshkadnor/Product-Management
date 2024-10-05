const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true, minlength: 20, maxlength: 500 },
  image: { type: String, required: true },
  variants: [{
    color: String,
    size: String,
    price: Number,
    stock: Number
  }],
  category: { type: String, required: true },
  scheduledAvailability: { type: Date, required: true },
  seo: {
    title: { type: String, maxlength: 60 },
    description: { type: String, maxlength: 160 },
    urlSlug: { type: String, unique: true }
  },
  stock: { type: Number, required: true },
  discountRules: [{
    type: String,
    rule: String
  }],
  archived: { type: Boolean, default: false }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;






module.exports = Product;

