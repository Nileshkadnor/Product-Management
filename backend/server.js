
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes'); 
const path = require('path');
const cors = require('cors');

const app = express();


app.use(cors({
    origin: 'http://localhost:5000'  
}));

app.use(express.json()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', productRoutes);

mongoose.connect('mongodb://localhost:27017/productdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

