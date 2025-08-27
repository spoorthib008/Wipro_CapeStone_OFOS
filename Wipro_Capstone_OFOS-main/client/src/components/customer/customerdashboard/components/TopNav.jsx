import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function TopNav(){
  const { user, logout } = useAuth()
  const { items } = useCart()
  const count = items.reduce((s,i)=>s+i.qty,0)

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">OFOS</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav1">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav1">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/restaurants">Restaurants</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/orders">Orders</NavLink></li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-2">
              <NavLink className="btn btn-outline-primary position-relative" to="/cart">
                Cart
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {count}
                </span>
              </NavLink>
            </li>
            {user ? (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/profile">{user.name || 'Profile'}</NavLink></li>
                <li className="nav-item ms-2"><button className="btn btn-outline-secondary" onClick={logout}>Logout</button></li>
              </>
            ) : (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                <li className="nav-item"><NavLink className="btn btn-primary ms-2" to="/register">Sign Up</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
