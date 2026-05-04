import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { checkAuth } from './store/actions/authActions';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  useEffect(() => {
    store.dispatch(checkAuth());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={
                <PrivateRoute>
                  <ProductList />
                </PrivateRoute>
              } />
              <Route path="/add-product" element={
                <PrivateRoute>
                  <ProductForm />
                </PrivateRoute>
              } />
              <Route path="/edit-product/:id" element={
                <PrivateRoute>
                  <ProductForm />
                </PrivateRoute>
              } />
              <Route path="/" element={<Navigate to="/products" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
