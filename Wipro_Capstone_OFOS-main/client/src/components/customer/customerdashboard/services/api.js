import axios from 'axios'
import * as Mock from './mock.js'

const isDemo = import.meta.env.VITE_DEMO === 'true'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use((config)=>{
  const token = localStorage.getItem('ofos_token')
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Real implementations
const AuthReal = {
  login: (payload) => api.post('/api/auth/login', payload),
  register: (payload) => api.post('/api/auth/register', payload),
  profile: () => api.get('/api/users/profile')
}
const RestaurantReal = {
  list: (params) => api.get('/api/restaurants', { params }),
  getMenu: (restaurantId) => api.get(`/api/menus/${restaurantId}`),
  reviews: (restaurantId) => api.get(`/api/reviews/${restaurantId}`),
  addReview: (payload) => api.post('/api/reviews', payload)
}
const OrderReal = {
  place: (payload) => api.post('/api/orders', payload),
  getOne: (id) => api.get(`/api/orders/${id}`),
  userHistory: (userId) => api.get(`/api/orders/user/${userId}`)
}
const PaymentReal = {
  initiate: (payload) => api.post('/api/payments/initiate', payload),
  confirm: (payload) => api.post('/api/payments/confirm', payload),
  history: () => api.get('/api/payments/history')
}

export const AuthAPI = isDemo ? Mock.AuthAPI : AuthReal
export const RestaurantAPI = isDemo ? Mock.RestaurantAPI : RestaurantReal
export const OrderAPI = isDemo ? Mock.OrderAPI : OrderReal
export const PaymentAPI = isDemo ? Mock.PaymentAPI : PaymentReal
export const isDemoMode = isDemo

export default api
