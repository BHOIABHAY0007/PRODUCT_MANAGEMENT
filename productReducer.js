const initialState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  searchTerm: '',
  selectedCategory: '',
  sortBy: 'id'
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        loading: false,
        products: action.payload,
        filteredProducts: action.payload
      };
    case 'FETCH_PRODUCTS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'ADD_PRODUCT_SUCCESS':
      return {
        ...state,
        products: [...state.products, action.payload],
        filteredProducts: [...state.filteredProducts, action.payload]
      };
    case 'UPDATE_PRODUCT_SUCCESS':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
        filteredProducts: state.filteredProducts.map(product =>
          product.id === action.payload.id ? action.payload : product
        )
      };
    case 'DELETE_PRODUCT_SUCCESS':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
        filteredProducts: state.filteredProducts.filter(product => product.id !== action.payload)
      };
    case 'SEARCH_PRODUCTS':
      return {
        ...state,
        searchTerm: action.payload,
        filteredProducts: filterProducts(state.products, action.payload, state.selectedCategory, state.sortBy)
      };
    case 'FILTER_BY_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload,
        filteredProducts: filterProducts(state.products, state.searchTerm, action.payload, state.sortBy)
      };
    case 'SORT_PRODUCTS':
      return {
        ...state,
        sortBy: action.payload,
        filteredProducts: filterProducts(state.products, state.searchTerm, state.selectedCategory, action.payload)
      };
    default:
      return state;
  }
};

const filterProducts = (products, searchTerm, category, sortBy) => {
  let filtered = products;

  if (searchTerm) {
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (category) {
    filtered = filtered.filter(product => product.category === category);
  }

  switch (sortBy) {
    case 'price-low-high':
      filtered = [...filtered].sort((a, b) => a.price - b.price);
      break;
    case 'price-high-low':
      filtered = [...filtered].sort((a, b) => b.price - a.price);
      break;
    default:
      filtered = [...filtered].sort((a, b) => a.id - b.id);
  }

  return filtered;
};

export default productReducer;
