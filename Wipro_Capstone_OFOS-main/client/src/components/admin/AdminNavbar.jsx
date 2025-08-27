import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = ({ onLogout }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
    <div className="container-fluid">
      <Link className="navbar-brand fw-bold" to="/admin/dashboard">Admin</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item ms-4"><Link className="nav-link" to="/admin/dashboard">Dashboard</Link></li>
          <li className="nav-item ms-4"><Link className="nav-link" to="/admin/reports">Reports</Link></li>
          <li className="nav-item ms-4"><Link className="nav-link" to="/admin/refund">Refund&Disputes</Link></li>
          <li className="nav-item ms-4"><button className="btn btn-light" onClick={onLogout}>Logout</button></li>
        </ul>
      </div>
    </div>
  </nav>
);
export default AdminNavbar;
