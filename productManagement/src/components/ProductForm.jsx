





import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { createProduct } from '../api';
import CategorySelect from './CategorySelect'; 
import DiscountRuleForm from './DiscountRuleForm'; 
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; 
const ALLOWED_FORMATS = ['image/jpeg', 'image/png'];
const REQUIRED_DIMENSIONS = { width: 800, height: 800 };

const ProductForm = ({ categories }) => {
  const { register, handleSubmit, control, formState: { errors }, setValue, watch } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "variants" });
  const [discountRules, setDiscountRules] = useState([]);
  const [startDate, setStartDate] = useState(new Date()); 
  const [imageError, setImageError] = useState(''); 
  const [inventoryType, setInventoryType] = useState('manual'); 
  const [calculatedStock, setCalculatedStock] = useState(0); 
  const [seoFields, setSeoFields] = useState({ title: '', description: '', url: '' });
  const [manualSeo, setManualSeo] = useState(false); 

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);

    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    formData.append('category', data.category); 
    formData.append('scheduledAvailability', startDate.toISOString());

    data.variants.forEach((variant, index) => {
      formData.append(`variants[${index}][name]`, variant.name);
      formData.append(`variants[${index}][price]`, variant.price);
      formData.append(`variants[${index}][stock]`, variant.stock);
    });

    discountRules.forEach((rule, index) => {
      formData.append(`discountRules[${index}][type]`, rule.type);
      formData.append(`discountRules[${index}][amount]`, rule.amount);
    });

   
    formData.append('seoTitle', seoFields.title);
    formData.append('seoDescription', seoFields.description);
    formData.append('seoUrl', seoFields.url);

    if (inventoryType === 'manual') {
      formData.append('stock', data.stock); 
    } else {
      formData.append('stock', calculatedStock); 
    }

    try {
      await createProduct(formData);
      console.log('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleImageValidation = (file) => {
    if (file.size > MAX_IMAGE_SIZE) {
      setImageError('File size exceeds 2 MB.');
      return false;
    }

    if (!ALLOWED_FORMATS.includes(file.type)) {
      setImageError('Only JPEG and PNG formats are allowed.');
      return false;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.onload = () => {
        if (image.width !== REQUIRED_DIMENSIONS.width || image.height !== REQUIRED_DIMENSIONS.height) {
          setImageError(`Image dimensions must be ${REQUIRED_DIMENSIONS.width}x${REQUIRED_DIMENSIONS.height}px.`);
        } else {
          setImageError('');
        }
      };
      image.src = event.target.result;
    };
    reader.readAsDataURL(file);

    return true;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && handleImageValidation(file)) {
      setValue('image', file); 
    }
  };

  const isFutureDate = (date) => {
    const today = new Date();
    return date > today;
  };


  const variantFields = watch('variants');
  useEffect(() => {
    if (inventoryType === 'auto') {
      const totalStock = variantFields?.reduce((acc, variant) => acc + (parseInt(variant.stock, 10) || 0), 0) || 0;
      setCalculatedStock(totalStock);
    }
  }, [variantFields, inventoryType]);

  
  const generateSeoFields = (name, description) => {
    const seoTitle = name.length > 60 ? name.substring(0, 60) : name;
    const seoDescription = description.length > 160 ? description.substring(0, 160) : description;
    const seoUrl = name.trim().toLowerCase().replace(/\s+/g, '-');

    setSeoFields({
      title: seoTitle,
      description: seoDescription,
      url: seoUrl,
    });
  };

  useEffect(() => {
    const name = watch('name');
    const description = watch('description');
    if (!manualSeo && name && description) {
      generateSeoFields(name, description);
    }
  }, [watch('name'), watch('description'), manualSeo]);

  return (
    <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Add New Product</h2>
      
      <input {...register('name', { required: true })} placeholder="Product Name" />
      {errors.name && <span>This field is required</span>}

      <input type="number" {...register('price', { required: true })} placeholder="Price" />
      {errors.price && <span>This field is required</span>}

      <textarea {...register('description', { required: true, minLength: 20, maxLength: 500 })} placeholder="Description" />
      {errors.description && <span>Description must be between 20 and 500 characters</span>}

      <input type="file" accept="image/jpeg, image/png" onChange={handleImageChange} />
      {imageError && <span>{imageError}</span>}
      {errors.image && <span>This field is required</span>}

      
      <CategorySelect categories={categories} onCategoryChange={(cat, subCat) => { }} />

      <div>
        <label>Scheduled Availability:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            if (isFutureDate(date)) {
              setStartDate(date);
            } else {
              alert('Please select a date in the future.');
            }
          }}
          showTimeSelect
          dateFormat="Pp"
          placeholderText="Select a date and time"
        />
      </div>

      
      <div>
        <h3>Product Variants</h3>
        {fields.map((variant, index) => (
          <div key={variant.id}>
            <input {...register(`variants[${index}].name`)} placeholder="Variant Name (e.g., Color)" />
            <input type="number" {...register(`variants[${index}].price`)} placeholder="Variant Price" />
            <input type="number" {...register(`variants[${index}].stock`)} placeholder="Variant Stock" />
            <button type="button" onClick={() => remove(index)}>Remove Variant</button>
          </div>
        ))}
        <button type="button" onClick={() => append({ name: '', price: 0, stock: 0 })}>Add Variant</button>
      </div>

      
      <div>
        <h3>Inventory Management</h3>
        <div>
          <input
            type="radio"
            id="manual"
            value="manual"
            checked={inventoryType === 'manual'}
            onChange={() => setInventoryType('manual')}
          />
          <label htmlFor="manual">Manual Stock</label>
          
          <input
            type="radio"
            id="auto"
            value="auto"
            checked={inventoryType === 'auto'}
            onChange={() => setInventoryType('auto')}
          />
          <label htmlFor="auto">Auto-Calculated Stock</label>
        </div>

        {inventoryType === 'manual' ? (
          <input
            type="number"
            {...register('stock', { required: true })}
            placeholder="Manual Stock"
          />
        ) : (
          <p>Auto-calculated stock: {calculatedStock}</p>
        )}
      </div>

     
      <div>
        <h3>SEO Fields</h3>
        <div>
          <label>SEO Title:</label>
          <input 
            {...register('seoTitle', { maxLength: 60 })}
            value={seoFields.title}
            onChange={(e) => setSeoFields((prev) => ({ ...prev, title: e.target.value }))}
            disabled={!manualSeo}
          />
        </div>
        <div>
          <label>SEO Description:</label>
          <textarea 
            {...register('seoDescription', { maxLength: 160 })}
            value={seoFields.description}
            onChange={(e) => setSeoFields((prev) => ({ ...prev, description: e.target.value }))}
            disabled={!manualSeo}
          />
        </div>
        <div>
          <label>SEO URL:</label>
          <input 
            {...register('seoUrl')}
            value={seoFields.url}
            onChange={(e) => setSeoFields((prev) => ({ ...prev, url: e.target.value }))}
            disabled={!manualSeo}
          />
        </div>
        <button type="button" onClick={() => setManualSeo((prev) => !prev)}>
          {manualSeo ? 'Disable Manual Override' : 'Enable Manual Override'}
        </button>
      </div>

      <DiscountRuleForm onUpdate={setDiscountRules} />

      <button type="submit">Create Product</button>
    </form>
  );
};

export default ProductForm;
