import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Cart(){
  const { items, total, setQty, removeItem } = useCart()
  return (
    <div>
      <h3 className="mb-3">Your Cart</h3>
      {!items.length ? (
        <div className="alert alert-info">Cart is empty. <Link to="/restaurants">Find food</Link></div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <div className="card p-3">
              {items.map(it => (
                <div key={it.id} className="d-flex align-items-center justify-content-between border-bottom py-2">
                  <div>
                    <strong>{it.name}</strong>
                    <div className="text-muted small">₹{it.price}</div>
                  </div>
                  <div className="d-flex align-items-center">
                    <input type="number" className="form-control form-control-sm me-2" style={{width: '80px'}}
                      min="1" value={it.qty} onChange={e=>setQty(it.id, Number(e.target.value))} />
                    <button className="btn btn-sm btn-outline-danger" onClick={()=>removeItem(it.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3">
              <div className="d-flex justify-content-between mb-2"><span>Subtotal</span><strong>₹{total}</strong></div>
              <div className="text-muted small mb-3">Taxes & delivery calculated at checkout</div>
              <Link to="/checkout" className="btn btn-primary w-100">Proceed to Checkout</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
