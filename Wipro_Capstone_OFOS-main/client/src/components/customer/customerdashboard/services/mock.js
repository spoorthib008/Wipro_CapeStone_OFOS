// Mock APIs with images for DEMO mode
function uid(){ return Math.random().toString(36).slice(2,10) }

// royalty-free unsplash images
const pics = {
  indian: 'https://images.unsplash.com/photo-1628294895950-9808a0c94338?q=80&w=1200&auto=format&fit=crop',
  italian: 'https://images.unsplash.com/photo-1546549039-49cc1f5b2c6f?q=80&w=1200&auto=format&fit=crop',
  chinese: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop',
  american: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop',
  mexican: 'https://images.unsplash.com/photo-1604467715878-83e57e8bc094?q=80&w=1200&auto=format&fit=crop',
  healthy: 'https://images.unsplash.com/photo-1526312426976-593c128eea49?q=80&w=1200&auto=format&fit=crop',
  dish_paneer: 'https://images.unsplash.com/photo-1604908554027-474eb2f7f3e2?q=80&w=800&auto=format&fit=crop',
  dish_pizza: 'https://images.unsplash.com/photo-1548365328-9f547fb0957f?q=80&w=800&auto=format&fit=crop',
  dish_noodles: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
  dish_burger: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop',
  dish_tacos: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=800&auto=format&fit=crop',
  dish_bowl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop'
}

const seedRestaurants = [
  { id: 1,  name: 'Spice Symphony',     cuisine: 'Indian',  rating: 4.5, eta: '30-40', address: 'MG Road, Bengaluru',        img: pics.indian },
  { id: 2,  name: 'Pasta Fresca',       cuisine: 'Italian', rating: 4.2, eta: '25-35', address: 'Indiranagar, Bengaluru',    img: pics.italian },
  { id: 3,  name: 'Dragon Wok',         cuisine: 'Chinese', rating: 4.3, eta: '20-30', address: 'Koramangala, Bengaluru',    img: pics.chinese },
  { id: 4,  name: 'Burger Forge',       cuisine: 'American',rating: 4.1, eta: '20-30', address: 'HSR Layout, Bengaluru',     img: pics.american },
  { id: 5,  name: 'Taco Casa',          cuisine: 'Mexican', rating: 4.0, eta: '25-35', address: 'BTM, Bengaluru',             img: pics.mexican },
  { id: 6,  name: 'Green Bowl',         cuisine: 'Healthy', rating: 4.6, eta: '15-25', address: 'JP Nagar, Bengaluru',       img: pics.healthy },
  { id: 7,  name: 'Curry Leaf',         cuisine: 'Indian',  rating: 4.4, eta: '20-30', address: 'Whitefield, Bengaluru',     img: pics.indian },
  { id: 8,  name: 'Molto Bene',         cuisine: 'Italian', rating: 4.3, eta: '25-35', address: 'Brigade Road, Bengaluru',   img: pics.italian },
  { id: 9,  name: 'Wok & Roll',         cuisine: 'Chinese', rating: 4.2, eta: '20-30', address: 'Marathahalli, Bengaluru',   img: pics.chinese },
  { id: 10, name: 'Grill Nation',       cuisine: 'American',rating: 4.0, eta: '25-35', address: 'Electronic City, Bengaluru',img: pics.american },
  { id: 11, name: 'Casa Del Taco',      cuisine: 'Mexican', rating: 4.1, eta: '20-30', address: 'Bellandur, Bengaluru',      img: pics.mexican },
  { id: 12, name: 'Fit Feast',          cuisine: 'Healthy', rating: 4.7, eta: '15-25', address: 'Domlur, Bengaluru',         img: pics.healthy },
  { id: 13, name: 'Biryani Boulevard',  cuisine: 'Indian',  rating: 4.6, eta: '30-40', address: 'RT Nagar, Bengaluru',       img: pics.indian },
  { id: 14, name: 'Trattoria Uno',      cuisine: 'Italian', rating: 4.5, eta: '25-35', address: 'UB City, Bengaluru',        img: pics.italian },
  { id: 15, name: 'Sichuan Spice',      cuisine: 'Chinese', rating: 4.4, eta: '20-30', address: 'Banashankari, Bengaluru',   img: pics.chinese },
  { id: 16, name: 'Patty Planet',       cuisine: 'American',rating: 4.2, eta: '20-30', address: 'Jayanagar, Bengaluru',      img: pics.american },
  { id: 17, name: 'Nacho Libre',        cuisine: 'Mexican', rating: 4.3, eta: '25-35', address: 'Church Street, Bengaluru',  img: pics.mexican },
  { id: 18, name: 'Pure Greens',        cuisine: 'Healthy', rating: 4.8, eta: '15-20', address: 'Sarjapur Road, Bengaluru',  img: pics.healthy },
  { id: 19, name: 'Masala Mela',        cuisine: 'Indian',  rating: 4.3, eta: '20-30', address: 'Vijayanagar, Bengaluru',    img: pics.indian },
  { id: 20, name: 'Bella Pasta',        cuisine: 'Italian', rating: 4.4, eta: '25-35', address: 'Kalyan Nagar, Bengaluru',   img: pics.italian }
]

const seedMenus = {
  1:  [
    { id: 101, name: 'Paneer Butter Masala', price: 240, desc: 'Creamy tomato gravy', veg: true,  img: pics.dish_paneer },
    { id: 102, name: 'Chicken Biryani',      price: 280, desc: 'Aromatic basmati & spices', veg: false, img: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop' },
    { id: 103, name: 'Garlic Naan',          price: 60,  desc: 'Tandoor baked', veg: true, img: 'https://images.unsplash.com/photo-1604908177078-70a5539b1f47?q=80&w=800&auto=format&fit=crop' },
  ],
  2:  [
    { id: 201, name: 'Margherita Pizza', price: 299, desc: 'Tomato, basil, mozzarella', veg: true, img: pics.dish_pizza },
    { id: 202, name: 'Alfredo Pasta',    price: 349, desc: 'Creamy sauce', veg: true, img: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=800&auto=format&fit=crop' },
    { id: 203, name: 'Penne Arrabbiata', price: 329, desc: 'Spicy tomato sauce', veg: true, img: 'https://images.unsplash.com/photo-1543351611-58f69d8bf00b?q=80&w=800&auto=format&fit=crop' },
  ],
  3:  [
    { id: 301, name: 'Veg Hakka Noodles', price: 199, desc: 'Wok tossed', veg: true, img: pics.dish_noodles },
    { id: 302, name: 'Chili Chicken',     price: 259, desc: 'Spicy & tangy', veg: false, img: 'https://images.unsplash.com/photo-1625944198234-3de5146a3df3?q=80&w=800&auto=format&fit=crop' },
    { id: 303, name: 'Spring Rolls',      price: 149, desc: 'Crispy veggie rolls', veg: true, img: 'https://images.unsplash.com/photo-1604908812751-7c7200ebdc82?q=80&w=800&auto=format&fit=crop' },
  ],
  4:  [
    { id: 401, name: 'Classic Cheeseburger', price: 219, desc: 'Grilled patty & cheese', veg: false, img: pics.dish_burger },
    { id: 402, name: 'Cajun Fries',          price: 129, desc: 'Spiced fries', veg: true, img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop' },
    { id: 403, name: 'BBQ Wings',            price: 259, desc: 'Smoky glaze', veg: false, img: 'https://images.unsplash.com/photo-1617155093730-d07c20bdb6a6?q=80&w=800&auto=format&fit=crop' },
  ],
  5:  [
    { id: 501, name: 'Chicken Tacos',  price: 249, desc: 'Salsa & lime', veg: false, img: pics.dish_tacos },
    { id: 502, name: 'Veg Quesadilla', price: 229, desc: 'Cheese loaded', veg: true, img: 'https://images.unsplash.com/photo-1601050690597-9d235c6be3a0?q=80&w=800&auto=format&fit=crop' },
    { id: 503, name: 'Loaded Nachos',  price: 199, desc: 'Beans, cheese, jalapenos', veg: true, img: 'https://images.unsplash.com/photo-1541599188778-cdc73298e8f3?q=80&w=800&auto=format&fit=crop' },
  ],
  6:  [
    { id: 601, name: 'Quinoa Bowl',    price: 279, desc: 'With roasted veggies', veg: true, img: pics.dish_bowl },
    { id: 602, name: 'Avocado Toast',  price: 199, desc: 'Seed mix', veg: true, img: 'https://images.unsplash.com/photo-1542878635-6e21a95a1b09?q=80&w=800&auto=format&fit=crop' },
    { id: 603, name: 'Grilled Paneer', price: 239, desc: 'High protein', veg: true, img: 'https://images.unsplash.com/photo-1615485737651-7a6fd95e4bb8?q=80&w=800&auto=format&fit=crop' },
  ]
  // (Remaining restaurants reuse cuisine images; if needed, extend similarly)
}

const keyUser = 'ofos_mock_user'
const keyOrders = 'ofos_mock_orders'

function ensureInit(){
  if(!localStorage.getItem(keyOrders)) localStorage.setItem(keyOrders, JSON.stringify([]))
}

export const AuthAPI = {
  async login(payload){
    const user = { id: 'u_' + uid(), name: (payload.email || 'user').split('@')[0], email: payload.email, role:'Customer' }
    localStorage.setItem('ofos_mock_user', JSON.stringify(user))
    localStorage.setItem('ofos_token', 'demo-token-' + uid())
    return { data: { token: localStorage.getItem('ofos_token') } }
  },
  async register(payload){ return this.login(payload) },
  async profile(){
    const raw = localStorage.getItem('ofos_mock_user')
    if(!raw) throw new Error('Not logged in')
    return { data: JSON.parse(raw) }
  }
}

export const RestaurantAPI = {
  async list(params){
    let list = seedRestaurants
    if(params){
      const q = (params.q || '').toLowerCase()
      const cuisine = params.cuisine || 'all'
      if(q){ list = list.filter(r => r.name.toLowerCase().includes(q)) }
      if(cuisine !== 'all'){ list = list.filter(r => r.cuisine.toLowerCase() === cuisine.toLowerCase()) }
    }
    return { data: list }
  },
  async getMenu(restaurantId){
    return { data: seedMenus[restaurantId] || [
      // generic fallback items for restaurants without explicit menus
      { id: Number(restaurantId)*100+1, name: 'Chef Special', price: 249, desc: 'Seasonal favorite', veg: true, img: pics.dish_bowl },
      { id: Number(restaurantId)*100+2, name: 'House Classic', price: 299, desc: 'Signature dish', veg: true, img: pics.dish_pizza }
    ] }
  },
  async reviews(restaurantId){
    const key = 'ofos_reviews_' + restaurantId
    const raw = localStorage.getItem(key)
    return { data: raw ? JSON.parse(raw) : [] }
  },
  async addReview(payload){
    const key = 'ofos_reviews_' + payload.restaurantId
    const raw = localStorage.getItem(key)
    const list = raw ? JSON.parse(raw) : []
    list.push({ id: uid(), rating: payload.rating, comment: payload.comment, createdAt: new Date().toISOString() })
    localStorage.setItem(key, JSON.stringify(list))
    return { data: { ok: true } }
  }
}

export const OrderAPI = {
  async place(payload){
    ensureInit()
    const orders = JSON.parse(localStorage.getItem(keyOrders))
    const id = 'o_' + uid()
    const now = new Date().toISOString()
    const order = { id, status:'Preparing', createdAt: now, items: payload.items, restaurantId: payload.restaurantId, total: payload.total }
    orders.unshift(order)
    localStorage.setItem(keyOrders, JSON.stringify(orders))
    return { data: { id, status: order.status } }
  },
  async getOne(id){
    ensureInit()
    const orders = JSON.parse(localStorage.getItem(keyOrders))
    const o = orders.find(x => x.id === id)
    return { data: o || null }
  },
  async userHistory(userId){
    ensureInit()
    const orders = JSON.parse(localStorage.getItem(keyOrders))
    return { data: orders }
  }
}

export const PaymentAPI = {
  async initiate(payload){ return { data: { paymentId: 'pay_' + uid(), requires_confirmation: true, amount: payload.amount } } },
  async confirm(payload){ return { data: { success: true, paymentId: payload.paymentId } } },
  async history(){ return { data: [] } }
}
