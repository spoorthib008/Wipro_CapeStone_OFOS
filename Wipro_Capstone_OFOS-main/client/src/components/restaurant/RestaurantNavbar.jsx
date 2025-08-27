import React from "react";
import { Link } from "react-router-dom";

const RestaurantNavbar = ({ onLogout }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-success">
    <div className="container">
      <Link className="navbar-brand fw-bold" to="/owner/dashboard">Owner</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link" to="/owner/menu">Menu</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/owner/orders">Orders</Link></li>
          <li className="nav-item"><button className="btn btn-sm btn-light" onClick={onLogout}>Logout</button></li>
        </ul>
      </div>
    </div>
  </nav>
);
export default RestaurantNavbar;
