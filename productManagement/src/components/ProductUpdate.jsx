import React from 'react';
import { useForm } from 'react-hook-form';
import { updateProduct } from '../api'; 

const ProductUpdate = ({ product, onClose, onUpdate }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      stock: product.stock,
      scheduledAvailability: new Date(product.scheduledAvailability),
      
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await updateProduct(product._id, data); 
      onUpdate(response.data); 
      onClose(); 
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="update-product-modal">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} placeholder="Product Name" required />
        <input type="number" {...register('price')} placeholder="Price" required />
        <textarea {...register('description')} placeholder="Description" required />
        <input type="text" {...register('category')} placeholder="Category" required />
        <input type="number" {...register('stock')} placeholder="Stock" required />
        <input type="file" {...register('image')} />
        <button type="submit">Update Product</button>
      </form>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default ProductUpdate;
