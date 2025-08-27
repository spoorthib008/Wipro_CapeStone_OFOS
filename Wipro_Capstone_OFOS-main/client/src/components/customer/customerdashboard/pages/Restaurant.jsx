import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantAPI } from '../services/api.js'
import MenuItemCard from '../components/MenuItemCard.jsx'

export default function Restaurant(){
  const { id } = useParams()
  const [menu, setMenu] = useState([])
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function load(){
      setLoading(true)
      try{
        const [m, r] = await Promise.all([
          RestaurantAPI.getMenu(id),
          RestaurantAPI.reviews(id)
        ])
        setMenu(m.data)
        setReviews(r.data)
      } finally { setLoading(false) }
    }
    load()
  }, [id])

  async function addReview(){
    await RestaurantAPI.addReview({ restaurantId: id, rating, comment })
    setComment('')
    const res = await RestaurantAPI.reviews(id)
    setReviews(res.data)
  }

  return (
    <div>
      <div className="p-4 mb-3 rounded brand-gradient text-white d-flex justify-content-between align-items-end">
        <div>
          <h3 className="mb-1">Restaurant #{id}</h3>
          <p className="mb-0">Browse the menu and add to cart</p>
        </div>
      </div>

      {loading ? <div>Loading menu...</div> : (
        <div className="row">
          <div className="col-md-8">
            {menu.map(item => <MenuItemCard key={item.id} item={item} restaurantId={Number(id)} />)}
            {!menu.length && <div className="text-muted">No items.</div>}
          </div>
          <div className="col-md-4">
            <div className="card p-3 mb-3">
              <h6 className="mb-3">Add a review</h6>
              <div className="mb-2">
                <label className="form-label">Rating</label>
                <select className="form-select" value={rating} onChange={e=>setRating(Number(e.target.value))}>
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Comment</label>
                <textarea className="form-control" rows="3" value={comment} onChange={e=>setComment(e.target.value)} />
              </div>
              <button className="btn btn-primary" onClick={addReview} disabled={!comment.trim()}>Submit Review</button>
            </div>

            <div className="card p-3">
              <h6 className="mb-3">Recent reviews</h6>
              {!reviews.length && <div className="text-muted">No reviews yet.</div>}
              {reviews.map((r,i)=>(
                <div key={i} className="mb-2">
                  <strong>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</strong>
                  <div className="text-muted small">{new Date(r.createdAt).toLocaleString()}</div>
                  <div>{r.comment}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
