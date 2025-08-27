import React from 'react'
export default function OrderStatusBadge({ status }){
  const map = {
    'Preparing': 'warning',
    'Out for Delivery': 'info',
    'Delivered': 'success'
  }
  const cls = map[status] || 'secondary'
  return <span className={`badge bg-${cls}`}>{status}</span>
}
