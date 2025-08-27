import React, { useEffect, useState } from 'react'
import { RestaurantAPI } from '../services/api.js'
import RestaurantCard from '../components/RestaurantCard.jsx'

export default function Restaurants(){
  const [data, setData] = useState([])
  const [q, setQ] = useState('')
  const [cuisine, setCuisine] = useState('all')
  const [loading, setLoading] = useState(true)

  async function load(){
    setLoading(true)
    try {
      const res = await RestaurantAPI.list({ q, cuisine })
      setData(res.data)
    } finally {
      setLoading(false)
    }
  }
  useEffect(()=>{ load() }, [])

  return (
    <div>
      <div className="p-4 mb-3 rounded brand-gradient text-white">
        <h2 className="mb-1">Find your next meal 🍽️</h2>
        <p className="mb-0">Search & filter from top restaurants near you</p>
      </div>

      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <input className="form-control" placeholder="Search restaurants..." value={q} onChange={e=>setQ(e.target.value)} />
        </div>
        <div className="col-md-3">
          <select className="form-select" value={cuisine} onChange={e=>setCuisine(e.target.value)}>
            <option value="all">All cuisines</option>
            <option>Indian</option>
            <option>Italian</option>
            <option>Chinese</option>
            <option>American</option>
            <option>Mexican</option>
            <option>Healthy</option>
          </select>
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100" onClick={load}>Search</button>
        </div>
      </div>

      {loading ? <div>Loading...</div> : (
        <div className="row">
          {data.map(r => <RestaurantCard key={r.id} r={r} />)}
          {!data.length && <div className="text-muted">No restaurants found.</div>}
        </div>
      )}
    </div>
  )
}
