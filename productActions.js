import axios from 'axios';

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
    
    // Try to fetch from API first
    try {
      const response = await axios.get('http://localhost:3002/products');
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data });
    } catch (apiError) {
      // If API fails, load from localStorage
      const localStorageProducts = JSON.parse(localStorage.getItem('products') || '[]');
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: localStorageProducts });
    }
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
  }
};

export const addProduct = (product) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3002/products', product);
    dispatch({ type: 'ADD_PRODUCT_SUCCESS', payload: response.data });
    
    // Also save to localStorage
    try {
      const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
      existingProducts.push(response.data);
      localStorage.setItem('products', JSON.stringify(existingProducts));
    } catch (localStorageError) {
      console.error('Error saving to localStorage:', localStorageError);
    }
  } catch (error) {
    console.error('Error adding product:', error);
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:3002/products/${id}`, product);
    dispatch({ type: 'UPDATE_PRODUCT_SUCCESS', payload: response.data });
    
    // Also update localStorage
    try {
      const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
      const updatedProducts = existingProducts.map(p => 
        p.id === id.toString() ? response.data : p
      );
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    } catch (localStorageError) {
      console.error('Error updating localStorage:', localStorageError);
    }
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3002/products/${id}`);
    dispatch({ type: 'DELETE_PRODUCT_SUCCESS', payload: id });
    
    // Also remove from localStorage
    try {
      const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
      const filteredProducts = existingProducts.filter(p => p.id !== id.toString());
      localStorage.setItem('products', JSON.stringify(filteredProducts));
    } catch (localStorageError) {
      console.error('Error deleting from localStorage:', localStorageError);
    }
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

export const searchProducts = (searchTerm) => (dispatch) => {
  dispatch({ type: 'SEARCH_PRODUCTS', payload: searchTerm });
};

export const filterByCategory = (category) => (dispatch) => {
  dispatch({ type: 'FILTER_BY_CATEGORY', payload: category });
};

export const sortProducts = (sortBy) => (dispatch) => {
  dispatch({ type: 'SORT_PRODUCTS', payload: sortBy });
};
