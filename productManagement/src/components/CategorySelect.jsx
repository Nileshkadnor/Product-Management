import React, { useState } from 'react';

import './CategorySelect.css';


const CategorySelect = ({ categories, onNewCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory('');
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  return (
    <div>
      <label>Select Category:</label>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <optgroup key={category.name} label={category.name}>
            {category.subCategories.map((subCategory) => (
              <option key={subCategory} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

    

      <button type="button" onClick={onNewCategory}>Add New Category</button>
    </div>
  );
};

export default CategorySelect;
