import React, { useState } from 'react';


import './CategoryModal.css';


const CategoryModal = ({ isOpen, onClose, onAddCategory }) => {
  const [newCategory, setNewCategory] = useState('');
  const [parentCategory, setParentCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategory) {
      onAddCategory(newCategory, parentCategory);
      setNewCategory('');
      setParentCategory('');
      onClose();
    }
  };

  return (
    <div style={{ display: isOpen ? 'block' : 'none' }} className="modal">
      <div className="modal-content">
        <h2>Create New Category</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Parent Category (optional)</label>
            <input
              type="text"
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
              placeholder="Enter Parent Category"
            />
          </div>
          <div>
            <label>New Category</label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter New Category"
              required
            />
          </div>
          <button type="submit">Add Category</button>
        </form>
        <button type="button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CategoryModal;
