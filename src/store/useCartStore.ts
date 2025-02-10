import { create } from "zustand";

// Define product type
interface Product {
  name: string;
  id: string;
  author: string;
  categoryId: string;
  description: string;
  imageUrl: string;
  price: number;
  category: {
    id: string;
    name: string;
  };
  quantity: number;
}

// Define the cart store state & actions
interface CartState {
  cart: Product[];
  totalPrice: number;
  addToCart: (product: Omit<Product, "quantity">, quantity: number) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  calculateTotal: () => void;
  clearCart: () => void;
}

// Create Zustand store
export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  totalPrice: 0,

  addToCart: (product, quantity) => {
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [...state.cart, { ...product, quantity }]; // ✅ Fix: Ensure quantity is added
      }
      return { cart: updatedCart };
    });
    get().calculateTotal();
  },

  increase: (id) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
    get().calculateTotal();
  },

  decrease: (id) => {
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    }));
    get().calculateTotal();
  },

  removeItem: (id) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
    get().calculateTotal();
  },

  calculateTotal: () => {
    set((state) => ({
      totalPrice: state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    }));
  },
  clearCart: () => {
    set({ cart: [], totalPrice: 0 }); // ✅ Reset cart and total price
  },
}));
