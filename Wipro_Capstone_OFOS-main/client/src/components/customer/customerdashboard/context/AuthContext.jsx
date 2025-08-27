import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { AuthAPI } from '../services/api.js'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)
export const useAuth = ()=> useContext(AuthContext)

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    // if token exists, try fetch profile
    const t = localStorage.getItem('ofos_token')
    if(!t){ setLoading(false); return }
    AuthAPI.profile().then(res=> setUser(res.data)).catch(()=>{
      localStorage.removeItem('ofos_token')
    }).finally(()=> setLoading(false))
  }, [])

  const value = useMemo(()=> ({
    user,
    loading,
    async login(email, password){
      await AuthAPI.login({ email, password })
      const profile = await AuthAPI.profile()
      setUser(profile.data)
      navigate('/restaurants')
    },
    async register(name, email, password){
      await AuthAPI.register({ name, email, password })
      const profile = await AuthAPI.profile()
      setUser(profile.data)
      navigate('/restaurants')
    },
    logout(){
      localStorage.removeItem('ofos_token')
      setUser(null)
      navigate('/login')
    }
  }), [user, loading, navigate])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
