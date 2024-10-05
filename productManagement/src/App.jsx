


import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import CategorySelect from './components/CategorySelect';
import CategoryModal from './components/CategoryModal';
//import 'path-to-admin-lte/dist/css/adminlte.min.css';
//import 'path-to-admin-lte/dist/js/adminlte.min.js';



const App = () => {
  const [categories, setCategories] = useState([
    {
      name: 'Electronics',
      subCategories: ['Mobile Phones', 'Laptops'],
    },
    {
      name: 'Fashion',
      subCategories: ['Clothing', 'Footwear'],
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCategory = (newCategory, parentCategory) => {
    setCategories((prev) => {
      
      if (parentCategory) {
        return prev.map((cat) => {
          if (cat.name === parentCategory) {
            return {
              ...cat,
              subCategories: [...cat.subCategories, newCategory],
            };
          }
          return cat;
        });
      } else {
        return [...prev, { name: newCategory, subCategories: [] }];
      }
    });
  };

  return (
    <div>
      <h1>Product Management</h1>
      <CategorySelect 
        categories={categories} 
        onNewCategory={() => setIsModalOpen(true)} 
      />
      <ProductForm categories={categories} />
      <ProductList />
      <CategoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddCategory={handleAddCategory} 
        
      />
      
    </div>
  );
};

export default App;
