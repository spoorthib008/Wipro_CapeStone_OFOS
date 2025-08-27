import React, { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)
export const useCart = ()=> useContext(CartContext)

export function CartProvider({ children }){
  const [items, setItems] = useState([]) // {id,name,price,qty,restaurantId}

  const value = useMemo(()=>{
    const total = items.reduce((sum, it)=> sum + it.price * it.qty, 0)
    return {
      items, total,
      addItem(item, restaurantId){
        setItems(prev => {
          const idx = prev.findIndex(p => p.id === item.id)
          if(idx >= 0){
            const next = [...prev]
            next[idx] = { ...next[idx], qty: next[idx].qty + 1 }
            return next
          }
          return [...prev, { ...item, qty: 1, restaurantId }]
        })
      },
      removeItem(id){
        setItems(prev => prev.filter(p => p.id !== id))
      },
      setQty(id, qty){
        setItems(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, qty) } : p))
      },
      clear(){ setItems([]) }
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
