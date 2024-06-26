import { create } from "zustand";
import { persist } from "zustand/middleware";
import formatPrice from "./util/PriceFormat";

type CartItem = {
  id: number;
  name: string;
  image?: string;
  description?: string;
  price: number;
  quantity: number;
  total: number | null;
};
type CartState = {
  isOpen: boolean;
  cart: CartItem[];
  toggleCart: () => void;
  addProduct: (item: CartItem) => void;
  removeProduct: (id: CartItem) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingItem) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                const totalPrice = cartItem.price * (cartItem.quantity + 1);
                return {
                  ...cartItem,
                  quantity: cartItem.quantity + 1,
                  total: formatPrice(totalPrice),
                };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            return {
              cart: [
                ...state.cart,
                { ...item, quantity: 1, total: formatPrice(item.price) },
              ],
            };
          }
        }),
      removeProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingItem && existingItem.quantity > 1) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                const totalPrice = cartItem.price * (cartItem.quantity - 1);
                return {
                  ...cartItem,
                  quantity: cartItem.quantity - 1,
                  total: formatPrice(totalPrice),
                };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            const filteredCart = state.cart.filter(
              (cartItem) => cartItem.id !== item.id
            );
            return { cart: filteredCart };
          }
        }),
    }),
    { name: "cart-store" }
  )
);
