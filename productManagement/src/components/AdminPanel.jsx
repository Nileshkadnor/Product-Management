import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = ({ children }) => {
  return (
    <div className="wrapper">
      
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        
        <a href="/" className="brand-link">
          <span className="brand-text font-weight-light">AdminLTE 3</span>
        </a>

    
        <div className="sidebar">
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>Products</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create-product" className="nav-link">
                  <i className="nav-icon fas fa-plus"></i>
                  <p>Create Product</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

     
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
   
            {children}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
