import { create } from "zustand";

interface StoreState {
  count: number;
  selectedCategory: string | null;
  phoneNumber: string;
  shopName: string;
  selectedCity: string;
  selectedAddress: string;
  selectedLong: number[];
  setSelectedCategory: (categoryId: string | null) => void;
  setSelectedCity: (city: string) => void;
  setSelectedPhone: (phone: string) => void;
  setSelectedShopName: (phone: string) => void;
  setSelectedAddress: (address: string) => void;
  setSelectedLong: (value: number[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  count: 0,
  selectedCategory: null,
  phoneNumber: "",
  shopName: "",
  selectedCity: "",
  selectedAddress: "",
  selectedLong: [],
  setSelectedCategory: (value: string | null) =>
    set(() => ({
      selectedCategory: value,
    })),
  setSelectedCity: (value: string) =>
    set(() => ({
      selectedCity: value,
    })),
  setSelectedPhone: (value: string) =>
    set(() => ({
      phoneNumber: value,
    })),
  setSelectedShopName: (value: string) =>
    set(() => ({
      shopName: value,
    })),
  setSelectedAddress: (value: string) =>
    set(() => ({
      selectedAddress: value,
    })),
  setSelectedLong: (value: number[]) =>
    set(() => ({
      selectedLong: value,
    })),
}));
