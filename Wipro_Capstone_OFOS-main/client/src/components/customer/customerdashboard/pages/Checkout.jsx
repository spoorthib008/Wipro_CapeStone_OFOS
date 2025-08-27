import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { PaymentAPI, OrderAPI } from '../services/api.js'

export default function Checkout(){
  const { items, total, clear } = useCart()
  const navigate = useNavigate()
  const [address, setAddress] = useState('MG Road, Bengaluru')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  async function place(){
    if(!items.length) return
    setLoading(true); setErr('')
    try {
      const pi = await PaymentAPI.initiate({ amount: total })
      await PaymentAPI.confirm({ paymentId: pi.data.paymentId })
      const restaurantId = items[0].restaurantId || 1
      const order = await OrderAPI.place({ items, total, restaurantId, address })
      clear()
      navigate('/orders?placed=' + order.data.id)
    } catch(e){
      setErr('Payment or order failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h3 className="mb-3">Checkout</h3>
      {!items.length ? <div className="alert alert-info">Your cart is empty.</div> : (
        <div className="row">
          <div className="col-md-8">
            <div className="card p-3 mb-3">
              <h6>Delivery Address</h6>
              <textarea className="form-control" rows="3" value={address} onChange={e=>setAddress(e.target.value)} />
            </div>
            <div className="card p-3">
              <h6>Order Items</h6>
              {items.map(it => (
                <div key={it.id} className="d-flex justify-content-between border-bottom py-2">
                  <div>{it.name} × {it.qty}</div>
                  <div>₹{it.price * it.qty}</div>
                </div>
              ))}
              <div className="d-flex justify-content-between mt-2">
                <strong>Total</strong><strong>₹{total}</strong>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3">
              {err && <div className="alert alert-danger">{err}</div>}
              <button className="btn btn-success w-100" onClick={place} disabled={loading}>
                {loading ? 'Placing...' : 'Pay & Place Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
