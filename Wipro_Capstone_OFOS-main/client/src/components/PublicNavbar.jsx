import React from "react";
import { Link } from "react-router-dom";

const PublicNavbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand fw-bold" to="/">Online Food Order</Link>

      <button className='navbar-toggle' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggle-icon'></span>
      </button>
      <div className="collapse navbar-collapse" id='navbarNav'>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
        </ul>
      </div>
    </div>
  </nav>
);
export default PublicNavbar;
