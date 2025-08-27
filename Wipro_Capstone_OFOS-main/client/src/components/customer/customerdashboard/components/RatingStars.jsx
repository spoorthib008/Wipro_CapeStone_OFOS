import React from 'react'
export default function RatingStars({ value=0 }){
  const full = Math.floor(value)
  const half = value - full >= 0.5
  const stars = Array.from({ length: 5 }).map((_,i)=>{
    if(i < full) return '★'
    if(i === full && half) return '☆' // simple half indicator
    return '☆'
  })
  return <div className="rating text-warning">{stars.join(' ')} <span className="text-muted">({value.toFixed(1)})</span></div>
}
