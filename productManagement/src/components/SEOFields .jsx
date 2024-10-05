import React, { useState, useEffect } from 'react';

const SEOFields = ({ productName, productDescription, onSEOChange }) => {
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoUrl, setSeoUrl] = useState('');

  useEffect(() => {
    
    const generatedTitle = productName.slice(0, 60);
    const generatedDescription = productDescription.slice(0, 160);
    const generatedUrl = productName.toLowerCase().replace(/\s+/g, '-'); 

    setSeoTitle(generatedTitle);
    setSeoDescription(generatedDescription);
    setSeoUrl(generatedUrl);
  }, [productName, productDescription]);

  const handleTitleChange = (e) => {
    setSeoTitle(e.target.value);
    onSEOChange({ title: e.target.value, description: seoDescription, url: seoUrl });
  };

  const handleDescriptionChange = (e) => {
    setSeoDescription(e.target.value);
    onSEOChange({ title: seoTitle, description: e.target.value, url: seoUrl });
  };

  const handleUrlChange = (e) => {
    setSeoUrl(e.target.value);
    onSEOChange({ title: seoTitle, description: seoDescription, url: e.target.value });
  };

  return (
    <div>
      <div>
        <label>SEO Title (max 60 characters):</label>
        <input
          type="text"
          value={seoTitle}
          onChange={handleTitleChange}
          maxLength={60}
        />
      </div>
      <div>
        <label>SEO Description (max 160 characters):</label>
        <input
          type="text"
          value={seoDescription}
          onChange={handleDescriptionChange}
          maxLength={160}
        />
      </div>
      <div>
        <label>SEO URL:</label>
        <input
          type="text"
          value={seoUrl}
          onChange={handleUrlChange}
        />
      </div>
    </div>
  );
};

export default SEOFields;
