const express = require('express');
const Product = require('../models/product');
const multer = require('multer');
const moment = require('moment');
const router = require('express').Router();


const upload = multer({
  limits: { fileSize: 2 * 1024 * 1024 }, 
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image (JPG, JPEG, PNG)'));
    }
    cb(null, true);
  }
});


router.post('/api/products', upload.single('image'), async (req, res) => {
    try {
      const { name, price, description } = req.body;
      const image = req.file ? req.file.path : null; 
  
      
      if (!name || !price || !description || !image) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      const product = new Product({
        name,
        price,
        description,
        image,
      });
  
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Server error.' });
    }
  });


router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({ archived: false });
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).send('Product not found');
    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { archived: true }, { new: true });
    if (!product) return res.status(404).send('Product not found');
    res.send({ message: 'Product archived' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;









