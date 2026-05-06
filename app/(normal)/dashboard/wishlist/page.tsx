"use client";

import React, { useState } from 'react';
import { IconShoppingBag, IconStarFilled, IconX } from "@tabler/icons-react";

const WishlistPage = () => {
  // Simple state for UI testing
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Farmhouse Apron Sink",
      category: "ROSE GOLD",
      price: "20,300",
      oldPrice: "27,000",
      rating: 4,
      reviews: 47,
      image: "/granite-basin.png", // replace with your path
      isNew: true
    }
  ]);

  const removeItem = (id: number) => setItems(items.filter(i => i.id !== id));

  return (
    <div className="min-h-screen bg-black text-white p-2 font-inter">
      <h2 className="text-2xl mb-8 font-medium">Wishlist</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-[#111] border border-white/5 rounded-sm overflow-hidden group">
            
            {/* Image Section */}
            <div className="relative aspect-square bg-[#0A0A0A]">
              {item.isNew && (
                <span className="absolute top-3 left-3 z-10 bg-[#CBA14D]/80 text-black text-[10px] font-bold px-2 py-0.5 rounded-sm">
                  NEW
                </span>
              )}
              <button 
                onClick={() => removeItem(item.id)}
                className="absolute top-3 right-3 z-10 text-white/50 hover:text-white"
              >
                <IconX size={20} />
              </button>
              <img src={item.image} alt="" className="w-full h-full object-cover" />
            </div>

            {/* Content Section */}
            <div className="p-4 space-y-1.5">
              <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">{item.category}</p>
              <h3 className="text-sm font-medium text-gray-200">{item.name}</h3>
              
              {/* Stars */}
              <div className="flex items-center gap-1 py-1">
                {[...Array(5)].map((_, i) => (
                  <IconStarFilled key={i} size={12} className={i < item.rating ? "text-[#FFBF3F]" : "text-gray-800"} />
                ))}
                <span className="text-[10px] text-gray-600">({item.reviews})</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 pb-4">
                <span className="text-base font-bold">₹{item.price}</span>
                <span className="text-xs text-gray-600 line-through">₹{item.oldPrice}</span>
              </div>

              {/* Add to Cart Button (Exact Image Style) */}
              <button className="w-full bg-[#FFBF3F] hover:bg-[#ffb31f] text-black font-bold py-3 px-4 rounded-md flex items-center justify-center gap-2 text-sm transition-all active:scale-95">
                <IconShoppingBag size={18} />
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;