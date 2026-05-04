import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../store/actions/productActions';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const ProductForm = () => {
  const [product, setProduct] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
    image: ''
  });

  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState('');

  const { products } = useSelector(state => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const existingProduct = products.find(p => p.id === parseInt(id));
      if (existingProduct) {
        setProduct(existingProduct);
      }
    }
  }, [id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!product.title || !product.category || !product.price || !product.description) {
      setError('All fields are required');
      return;
    }

    if (isEdit) {
      dispatch(updateProduct(parseInt(id), product));
      updateLocalStorage();
    } else {
      dispatch(addProduct(product));
      addToLocalStorage(product);
    }

    navigate('/products');
  };

  const addToLocalStorage = (newProduct) => {
    const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const productWithId = { ...newProduct, id: Date.now().toString() };
    existingProducts.push(productWithId);
    localStorage.setItem('products', JSON.stringify(existingProducts));
  };

  const updateLocalStorage = () => {
    const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const updatedProducts = existingProducts.map(p =>
      p.id === product.id ? product : p
    );
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <>
     
      <style>{`
        .product-wrapper {
          min-height: 100vh;
          background: linear-gradient(120deg, #89f7fe, #66a6ff);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .product-card {
          width: 100%;
          max-width: 600px;
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        .product-title {
          text-align: center;
          margin-bottom: 20px;
          font-weight: bold;
          color: #333;
        }

        .product-card input,
        .product-card textarea {
          border-radius: 10px;
          border: 1px solid #ddd;
          padding: 10px;
          transition: 0.3s;
        }

        .product-card input:focus,
        .product-card textarea:focus {
          border-color: #66a6ff;
          box-shadow: 0 0 5px rgba(102,166,255,0.5);
        }

        .btn-main {
          background: linear-gradient(135deg, #36d1dc, #5b86e5);
          border: none;
          border-radius: 10px;
          font-weight: bold;
        }

        .btn-main:hover {
          transform: scale(1.05);
        }

        .btn-cancel {
          border-radius: 10px;
        }

        .product-alert {
          border-radius: 10px;
          text-align: center;
        }
      `}</style>

      <div className="product-wrapper">
        <div className="product-card">

          <h2 className="product-title">
            {isEdit ? 'Edit Product ✏️' : 'Add New Product ➕'}
          </h2>

          {error && <Alert variant="danger" className="product-alert">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                placeholder="Enter product title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                placeholder="Enter category"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter price"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={product.image}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={product.description}
                onChange={handleChange}
                rows={3}
                placeholder="Enter description"
              />
            </Form.Group>

            <Button type="submit" className="btn-main w-100">
              {isEdit ? 'Update Product' : 'Add Product'}
            </Button>

            <Button
              className="btn-cancel w-100 mt-2"
              variant="secondary"
              onClick={() => navigate('/products')}
            >
              Cancel
            </Button>
          </Form>

        </div>
      </div>
    </>
  );
};

export default ProductForm;