import React from 'react'
import { Link } from 'react-router-dom'
import RatingStars from './RatingStars.jsx'

export default function RestaurantCard({ r }){
  return (
    <div className="col-md-4 mb-4">
      <div className="card card-hover h-100">
        {r.img && <img src={r.img} alt={r.name} className="card-img-top" />}
        <div className="card-body">
          <h5 className="card-title">{r.name}</h5>
          <p className="card-text mb-1">{r.cuisine} • ETA {r.eta} min</p>
          <p className="text-muted mb-2">{r.address}</p>
          <RatingStars value={r.rating} />
          <Link to={`/restaurants/${r.id}`} className="stretched-link" aria-label={`Open ${r.name}`}></Link>
        </div>
      </div>
    </div>
  )
}
