"use client"
import React from 'react'

const ShippingDetails = ({onNext}: any) => {
  return (
    <div className="w-full">
      <h2 className="text-white text-2xl font-medium mb-8 font-montserrat">Shipping Details</h2>
      
      <div className="space-y-4 font-montserrat">
        {/* Name & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            type="text" placeholder="Full Name" 
            className="w-full bg-[#0F0F0F] border border-zinc-800 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-600"
          />
          <input 
            type="text" placeholder="Phone no." 
            className="w-full bg-[#0F0F0F] border border-zinc-800 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-600"
          />
        </div>

        {/* Address Lines */}
        <input 
          type="text" placeholder="Address Lane 1" 
          className="w-full bg-[#0F0F0F] border border-zinc-800 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-600"
        />
        <input 
          type="text" placeholder="Address Lane 2 (Optional)" 
          className="w-full bg-[#0F0F0F] border border-zinc-800 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-600"
        />

        {/* City & State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            type="text" placeholder="City" 
            className="w-full bg-[#0F0F0F] border border-zinc-800 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-600"
          />
          <input 
            type="text" placeholder="State" 
            className="w-full bg-[#0F0F0F] border border-zinc-800 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-600"
          />
        </div>

        {/* Pincode */}
        <input 
          type="text" placeholder="Pincode" 
          className="w-full bg-[#0F0F0F] border border-zinc-800 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-600"
        />

        {/* Action Button */}
        <button onClick={onNext} className="w-full font-montserrat bg-[#FDB813] hover:bg-[#E6A600] text-black font-bold py-4 rounded-md mt-6 transition-all uppercase tracking-widest text-xs">
          Review Order
        </button>
      </div>
    </div>
  )
}

export default ShippingDetails