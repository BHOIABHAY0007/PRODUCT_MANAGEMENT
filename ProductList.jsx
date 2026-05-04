import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, deleteProduct, searchProducts, filterByCategory, sortProducts } from '../store/actions/productActions';
import ProductItem from './ProductItem';

const ProductList = () => {
  const { filteredProducts, loading, error, searchTerm, selectedCategory, sortBy } = useSelector(state => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearch = (e) => {
    dispatch(searchProducts(e.target.value));
  };

  const handleFilter = (e) => {
    dispatch(filterByCategory(e.target.value));
  };

  const handleSort = (e) => {
    dispatch(sortProducts(e.target.value));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleEdit = (product) => {
    navigate(`/edit-product/${product.id}`);
  };

  const categories = [...new Set(filteredProducts.map(product => product.category))];

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Product List</h2>
      
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-4">
          <select className="form-select" value={selectedCategory} onChange={handleFilter}>
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select className="form-select" value={sortBy} onChange={handleSort}>
            <option value="id">Sort by ID</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No products found.
        </div>
      ) : (
        <div className="row">
          {filteredProducts.map(product => (
            <ProductItem
              key={product.id}
              product={product}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
