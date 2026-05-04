import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, checkAuth } from '../store/actions/authActions';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const Login = () => {

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');

  const { loading, error: authError, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth());
    if (isAuthenticated) {
      navigate('/products');
    }
  }, [dispatch, isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }

    dispatch(login(credentials.username, credentials.password));
  };

  if (isAuthenticated) return null;

  return (
    <>
     
      <style>{`
        .login-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          overflow: hidden;
        }

        .login-header {
          background: #4a3aff;
          color: white;
          text-align: center;
          padding: 20px;
          font-size: 22px;
          font-weight: bold;
        }

        .login-body {
          background: white;
          padding: 30px;
        }

        .login-body input {
          border-radius: 8px;
          padding: 10px;
        }

        .login-btn {
          background: linear-gradient(135deg, #4a3aff, #6c63ff);
          border: none;
          border-radius: 8px;
          padding: 10px;
          font-weight: bold;
        }

        .login-btn:hover {
          transform: scale(1.03);
        }

        .login-footer {
          text-align: center;
          margin-top: 15px;
          font-size: 13px;
          color: gray;
        }
      `}</style>

      <div className="login-wrapper">
        <div className="login-card">

          <div className="login-header">
            Login
          </div>

          <div className="login-body">

            {(error || authError) && (
              <Alert variant="danger">
                {error || authError}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                className="login-btn w-100"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>

         
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;