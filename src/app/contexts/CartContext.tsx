"use client";

import { createContext, useContext, useState, ReactNode, JSX } from "react";
import type { Product as ProductType } from "@/data/product";
import toast from "react-hot-toast";

export interface CartProduct extends ProductType {
  quantity?: number;
}

interface CartContextType {
  cart: CartProduct[];
  addToCart: (product: ProductType) => void;
  setCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  updateQuantity: any;
  clearCart: any;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<CartProduct[]>([]);

  const addToCart = (product: ProductType) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity ?? 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) => {
      const updated = prev
        .map((item) => {
          if (item.id === id) {
            const newQuantity = (item.quantity ?? 1) + delta;
            if (newQuantity <= 0) {
              return null;
            }
            if (item.inventory !== undefined && newQuantity > item.inventory) {
              return item;
            }

            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item): item is (typeof prev)[number] => item !== null);

      return updated;
    });
    const currentItem = cart.find((i) => i.id === id);
    if (
      currentItem &&
      //@ts-ignore
      currentItem.quantity + delta > (currentItem.inventory ?? Infinity)
    ) {
      toast.error(
        `Sản phẩm "${currentItem.name}" chỉ còn ${currentItem.inventory} trong kho`
      );
    }
  };

  // xoá sạch sản phẩm khỏi giỏ hàng
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, setCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart phải được dùng trong CartProvider");
  }
  return context;
}
