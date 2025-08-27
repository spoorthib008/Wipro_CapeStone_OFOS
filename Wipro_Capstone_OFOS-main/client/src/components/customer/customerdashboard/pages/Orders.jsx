import React, { useEffect, useMemo, useState } from 'react'
import { OrderAPI } from '../services/api.js'
import OrderStatusBadge from '../components/OrderStatusBadge.jsx'
import { on, startPolling } from '../services/realtime.js'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Orders(){
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [params] = useSearchParams()
  const placedId = params.get('placed')

  async function load(){
    if(!user) return
    const res = await OrderAPI.userHistory(user.id)
    setOrders(res.data)
  }

  useEffect(()=>{ load() }, [user])

  // subscribe realtime
  useEffect(()=>{
    const off = on('ORDER_STATUS', (msg)=>{
      setOrders(prev => prev.map(o => o.id === msg.orderId ? { ...o, status: msg.status } : o))
    })
    const stop = startPolling(load, 12000)
    return ()=>{ off && off(); stop && stop() }
  }, [user])

  const latest = useMemo(()=> orders[0], [orders])

  return (
    <div>
      <h3 className="mb-3">Your Orders</h3>
      {placedId && <div className="alert alert-success">Order placed successfully! ID: {placedId}</div>}
      {!orders.length ? <div className="text-muted">No orders yet.</div> : (
        <div className="list-group">
          {orders.map(o => (
            <div key={o.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-bold">Order #{o.id}</div>
                  <div className="small text-muted">{new Date(o.createdAt).toLocaleString()}</div>
                </div>
                <OrderStatusBadge status={o.status} />
              </div>
              <div className="small mt-2">
                {o.items && o.items.map(it => <span key={it.id} className="me-3">{it.name}×{it.qty}</span>)}
              </div>
            </div>
          ))}
        </div>
      )}
      {latest && latest.status !== 'Delivered' && (
        <div className="alert alert-info mt-3">
          Tracking latest order <strong>#{latest.id}</strong> — current status: <OrderStatusBadge status={latest.status} />
        </div>
      )}
    </div>
  )
}
