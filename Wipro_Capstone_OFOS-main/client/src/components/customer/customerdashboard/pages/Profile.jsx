import React, { useEffect, useState } from 'react'
import { AuthAPI } from '../services/api.js'

export default function Profile(){
  const [me, setMe] = useState(null)
  useEffect(()=>{
    AuthAPI.profile().then(res => setMe(res.data))
  },[])
  if(!me) return <div>Loading...</div>
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card p-3">
          <h5 className="mb-3">Profile</h5>
          <div className="mb-2"><strong>Name:</strong> {me.name}</div>
          <div className="mb-2"><strong>Email:</strong> {me.email}</div>
          <div className="mb-2"><strong>Role:</strong> {me.role}</div>
        </div>
      </div>
    </div>
  )
}
