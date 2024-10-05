import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductForm from './ProductForm';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading product data...</div>;

  return (
    <div>
      <h1>Edit Product</h1>
      <ProductForm existingProduct={product} /> 
    </div>
  );
};

export default EditProduct;
