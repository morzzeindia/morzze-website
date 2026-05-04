"use client"
import React from 'react'

export const AddressCard = () => {
  return (
    <div className="bg-[#0F0F0F] rounded-2xl border border-zinc-900 p-8 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-sm font-medium uppercase tracking-wider">Default Address</h2>
        <button className="text-[10px] text-[#FFB800] underline">Manage</button>
      </div>
      <div className="flex gap-2 mb-4">
        <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] rounded uppercase">Home</span>
        <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-[10px] rounded uppercase font-bold">Default</span>
      </div>
      <h3 className="text-white font-medium text-lg">John Doe</h3>
      <p className="text-zinc-500 text-sm mt-3 leading-relaxed">
        123, palm Residency, Sector 45, <br />
        Jaipur, Rajasthan, 302022
      </p>
    </div>
  )
}