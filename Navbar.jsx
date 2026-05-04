import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
   
      <style>{`
        .custom-navbar {
          background: linear-gradient(90deg, #141e30, #243b55);
          padding: 12px 0;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .brand {
          font-size: 22px;
          font-weight: bold;
          color: #fff !important;
          letter-spacing: 1px;
        }

        .nav-link-custom {
          color: #ddd !important;
          margin-right: 15px;
          position: relative;
          transition: 0.3s;
        }

        .nav-link-custom::after {
          content: "";
          position: absolute;
          width: 0%;
          height: 2px;
          bottom: 0;
          left: 0;
          background: #00c6ff;
          transition: 0.3s;
        }

        .nav-link-custom:hover {
          color: #fff !important;
        }

        .nav-link-custom:hover::after {
          width: 100%;
        }

        .welcome-text {
          color: #bbb;
          font-size: 14px;
        }

        .logout-btn {
          border-radius: 20px;
          padding: 5px 15px;
          border: 1px solid #00c6ff;
          color: #00c6ff;
          background: transparent;
          transition: 0.3s;
        }

        .logout-btn:hover {
          background: #00c6ff;
          color: #000;
        }
      `}</style>

      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container">
          
          <Link className="navbar-brand brand" to="/">
            Product Manager 🚀
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">

            <ul className="navbar-nav me-auto">
              {isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link nav-link-custom" to="/products">
                      Products
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link nav-link-custom" to="/add-product">
                      Add Product
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <ul className="navbar-nav align-items-center">
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <span className="welcome-text me-3">
                      👋 {user?.username}
                    </span>
                  </li>

                  <li className="nav-item">
                    <button className="logout-btn" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link nav-link-custom" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;