"use client"
import React from 'react'

const OrderReview = () => {
  return (
    <div className="w-full">
      <h2 className="text-white text-2xl font-medium mb-8  font-montserrat">Order Review</h2>
      
      <div className="space-y-4 mb-10">
        {/* Contact Info Box */}
        <div className="bg-[#0F0F0F] border border-zinc-900 p-6 rounded-md font-inter">
          <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-2 font-inter">Contact</p>
          <p className="text-zinc-300 text-sm font-light">
            John Doe - 8585858585 - you@gmail.com
          </p>
        </div>

        {/* Shipping Address Box */}
        <div className="bg-[#0F0F0F] border border-zinc-900 p-6 rounded-md">
          <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-2 font-inter ">Ship To</p>
          <p className="text-zinc-300 text-sm font-light leading-relaxed">
            999 PT, Mansarovar, Jaipur, Rajasthan — 302022
          </p>
        </div>
      </div>

      {/* Product List Section */}
      <div className="border-b border-zinc-900 pb-8 mb-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-zinc-900 rounded overflow-hidden shrink-0">
             <img src="/sink1.png" alt="product" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h4 className="text-white text-sm font-medium">AeroMix Tall Faucet</h4>
            <p className="text-zinc-500 text-xs font-light mt-1">Chrome × 1</p>
          </div>
          <div className="text-white text-sm font-medium">
            ₹8,500
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <button className="w-full font-montserrat bg-[#FFB800] hover:bg-[#E6A600] text-black font-bold py-4 rounded-md transition-all uppercase tracking-widest text-xs">
        Continue to Payment
      </button>
    </div>
  )
}

export default OrderReview