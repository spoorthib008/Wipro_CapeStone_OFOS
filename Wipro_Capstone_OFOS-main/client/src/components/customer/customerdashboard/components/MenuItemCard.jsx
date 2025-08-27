import React from 'react'
import { useCart } from '../context/CartContext.jsx'

export default function MenuItemCard({ item, restaurantId }){
  const { addItem } = useCart()
  return (
    <div className="card card-hover mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          {item.img && <img src={item.img} alt={item.name} className="menu-thumb me-3" />}
          <div>
            <h6 className="mb-1">
              {item.name} {item.veg ? <span className="badge bg-success">Veg</span> : <span className="badge bg-danger">Non-veg</span>}
            </h6>
            <small className="text-muted">{item.desc}</small>
          </div>
        </div>
        <div className="text-end">
          <div className="fw-bold mb-2">₹{item.price}</div>
          <button className="btn btn-sm btn-primary" onClick={()=>addItem(item, restaurantId)}>Add</button>
        </div>
      </div>
    </div>
  )
}
