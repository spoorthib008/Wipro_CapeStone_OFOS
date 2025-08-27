const WS_BASE = import.meta.env.VITE_WS_BASE_URL || null
const DEMO = import.meta.env.VITE_DEMO === 'true'

let socket = null
const listeners = new Map() // event -> Set(callback)

export function connectRealtime() {
  if (DEMO) {
    // start simulated status churn
    startDemoTicker()
    return
  }
  if (!WS_BASE || socket) return
  socket = new WebSocket(WS_BASE)
  socket.addEventListener('open', ()=>{/* connected */})
  socket.addEventListener('message', (evt)=>{
    try {
      const data = JSON.parse(evt.data)
      const set = listeners.get(data.type)
      if(set){ set.forEach(cb => cb(data)) }
    } catch(e){/* ignore */}
  })
  socket.addEventListener('close', ()=>{
    socket = null
    setTimeout(connectRealtime, 3000)
  })
}

export function on(event, cb){
  if(!listeners.has(event)) listeners.set(event, new Set())
  listeners.get(event).add(cb)
  return () => listeners.get(event)?.delete(cb)
}

export function emit(event, payload){
  const set = listeners.get(event)
  if(set){ set.forEach(cb => cb(payload)) }
}

// Polling util (usable by pages)
export function startPolling(fn, intervalMs=10000){
  const id = setInterval(fn, intervalMs)
  return ()=> clearInterval(id)
}

// ---------- DEMO simulation ----------
const steps = ['Preparing', 'Out for Delivery', 'Delivered']

function startDemoTicker(){
  setInterval(()=>{
    try{
      const raw = localStorage.getItem('ofos_mock_orders')
      if(!raw) return
      const orders = JSON.parse(raw)
      let changed = false
      orders.forEach(o => {
        const idx = steps.indexOf(o.status)
        if(idx >= 0 && idx < steps.length - 1){
          // 50% chance to advance
          if(Math.random() > 0.5){
            o.status = steps[idx+1]
            emit('ORDER_STATUS', { type:'ORDER_STATUS', orderId: o.id, status: o.status })
            changed = true
          }
        }
      })
      if(changed){
        localStorage.setItem('ofos_mock_orders', JSON.stringify(orders))
      }
    }catch(e){}
  }, 7000)
}
