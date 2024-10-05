import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const createProduct = (productData) => {
  return api.post('/products', productData);
};

export const getProducts = () => {
  return api.get('/products');
};

export const updateProduct = (id, productData) => {
  return api.put(`/products/${id}`, productData);
};

export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};





export const createProductt = async (formData) => {
    try {
      const response = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error); 
      throw error; 
    }
  };
  