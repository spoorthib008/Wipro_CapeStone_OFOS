import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute(){
  const { user, loading } = useAuth()
  const loc = useLocation()
  if(loading) return <div className="text-center p-5">Loading...</div>
  if(!user) return <Navigate to="/login" replace state={{ from: loc.pathname }} />
  return <Outlet />
}
