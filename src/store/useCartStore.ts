import { create } from "zustand";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],

  addToCart: (item) =>
    set((state) => {
      const existing = state.cartItems.find((i) => i.id === item.id);

      if (existing) {
        // already in cart — bump the quantity instead of adding a duplicate row
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }

      // new item — add it with qty starting at 1
      return {
        cartItems: [...state.cartItems, { ...item, qty: 1 }],
      };
    }),

  removeFromCart: (itemId) =>
    set((state) => {
      const existing = state.cartItems.find((i) => i.id === itemId);

      if (existing && existing.qty > 1) {
        // more than 1 left — decrement instead of removing the whole row
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === itemId ? { ...i, qty: i.qty - 1 } : i
          ),
        };
      }

      // qty is 1 — remove the row entirely
      return {
        cartItems: state.cartItems.filter((i) => i.id !== itemId),
      };
    }),

  clearCart: () => set({ cartItems: [] }),

  getTotal: () => get().cartItems.reduce((sum, i) => sum + i.price * i.qty, 0),
}));

export default useCartStore;