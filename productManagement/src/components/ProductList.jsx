import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        
        
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          
          setProducts([]);
          setError('Unexpected response format.');
        }

        setLoading(false);
      } catch (err) {
        setError('Error fetching products.');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-list">
      <h1>Product List</h1>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id} className="product-item">
              <img src={product.image} alt={product.name} style={{ width: '100px' }} />
              <div>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
                {product.variants.length > 0 && (
                  <div>
                    <strong>Variants:</strong>
                    <ul>
                      {product.variants.map((variant) => (
                        <li key={variant._id}>
                          {variant.name} - ${variant.price} (Stock: {variant.stock})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <p>Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
