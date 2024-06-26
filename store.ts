import {create } from  'zustand'
import { persist } from 'zustand/middleware'

type CartItem = {
    id: number
    name: string
    image?: string
    description?: string
    price: number
    quantity: number
}
type CartState = {
    isOpen: boolean
    cart: CartItem[]
}
export const useCartStore = create<CartState>()(
    persist((set) => ({
        cart: [],
        isOpen: false,
    }),
    {name: 'cart-store'}
)
)