"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

const CART_STORAGE_KEY = "morzze_cart";

export type CartItem = {
  slug: string;
  quantity: number;
  // Rich product snapshot (set at add-to-cart time)
  name?: string;
  price?: number;        // basePrice in ₹
  oldPrice?: number;     // strikethroughPrice in ₹
  image?: string;        // bannerImage URL
  sku?: string;
  productId?: string;    // DB uuid
};

export type AppliedCoupon = {
  code: string;
  discountValue: string; // e.g. "10" or "500" (always percentage from admin)
  title?: string;
  discountPercent?: number; // parsed % if applicable
  upto?: string | null;        // max discount cap e.g. "₹1000"
  minimumOrder?: string | null; // min order value e.g. "₹15000"
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (slug: string, quantity?: number, productData?: Partial<CartItem>) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (slug: string) => number;
  totalItems: number;
  appliedCoupon: AppliedCoupon | null;
  setAppliedCoupon: (coupon: AppliedCoupon | null) => void;
  clearCoupon: () => void;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getItemQuantity: () => 0,
  totalItems: 0,
  appliedCoupon: null,
  setAppliedCoupon: () => {},
  clearCoupon: () => {},
});

export const useCart = () => useContext(CartContext);

function getLocalCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setLocalCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    setCartItems(getLocalCart());
    setLoaded(true);
  }, []);

  // Persist to localStorage whenever cart changes (after initial load)
  useEffect(() => {
    if (loaded) {
      setLocalCart(cartItems);
    }
  }, [cartItems, loaded]);

  const addToCart = useCallback(
    (slug: string, quantity: number = 1, productData?: Partial<CartItem>) => {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.slug === slug);
        if (existing) {
          toast.success("Cart updated");
          return prev.map((item) =>
            item.slug === slug
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  // Refresh rich data if provided
                  ...(productData ? productData : {}),
                }
              : item
          );
        } else {
          toast.success("Added to cart");
          return [...prev, { slug, quantity, ...(productData ?? {}) }];
        }
      });
    },
    []
  );

  const removeFromCart = useCallback((slug: string) => {
    setCartItems((prev) => prev.filter((item) => item.slug !== slug));
    toast.success("Removed from cart");
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.slug !== slug));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.slug === slug ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setAppliedCoupon(null);
  }, []);

  const clearCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  const getItemQuantity = useCallback(
    (slug: string) => {
      return cartItems.find((item) => item.slug === slug)?.quantity ?? 0;
    },
    [cartItems]
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        totalItems,
        appliedCoupon,
        setAppliedCoupon,
        clearCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
