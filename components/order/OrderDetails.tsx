"use client"
import React from 'react'

export default function OrderDetails({ order }:any) {
  if (!order) return null

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6 text-white font-inter bg-black overflow-x-hidden">
      <h1 className="text-2xl font-semibold font-montserrat mb-8">Recent Orders</h1>

      {/* Top Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#111111] border border-zinc-900 rounded-xl p-6 md:p-10">
        
        {/* Order Summary */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium font-montserrat text-zinc-300">Order Summary</h2>
          <div className="space-y-2 text-sm text-zinc-400">
            
            <div className="flex justify-between">
              <span>{order.product}</span>
              <span className="text-white">{order.price}</span>
            </div>

            <div className="flex justify-between pt-2 border-t border-zinc-800">
              <span>Subtotal</span>
              <span className="text-white">{order.price}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-500">Free</span>
            </div>

            <div className="flex justify-between">
              <span>GST</span>
              <span className="text-white">Included</span>
            </div>

            <div className="flex justify-between pt-4 border-t border-zinc-800 text-lg font-bold text-white font-montserrat">
              <span>Total</span>
              <span>{order.price}</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex flex-col items-center md:items-center text-center space-y-4">
          <h2 className="text-lg font-medium font-montserrat text-zinc-300">Payment Method</h2>
          <p className="text-sm text-zinc-400">Cash on Delivery (COD)</p>
        </div>

        {/* Address Section */}
        <div className="flex flex-col items-end text-right space-y-3">
          <h2 className="text-lg font-medium font-montserrat text-zinc-300">Address</h2>
          <div className="flex gap-2 justify-end">
            <span className="bg-[#DBEAFE] text-[#0066FF] border border-blue-500/20 px-3 py-0.5 rounded-full text-[10px] font-bold">Home</span>
            <span className="bg-[#FEF3C7] text-[#BA5309] border border-orange-500/20 px-3 py-0.5 rounded-full text-[10px] font-bold">Default</span>
          </div>
          <div className="space-y-1">
            <p className="font-bold text-white">John Doe</p>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-[200px]">
              123, palm Residency, Sector 45, Jaipur, Rajasthan, 302022
            </p>
          </div>
        </div>
      </div>

      {/* Order Item Card */}
      <div className="bg-[#111111] border border-zinc-900 rounded-xl overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-zinc-800/50">
          <div className="flex gap-8 md:gap-16">
            
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Order ID</p>
              <p className="text-sm font-medium">{order.id}</p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Date</p>
              <p className="text-sm font-medium">{order.date}</p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Total</p>
              <p className="text-sm font-medium">{order.price}</p>
            </div>

          </div>

          <span className="bg-[#DCFCE7] text-[#06C31F] border border-green-500/20 px-4 py-1 rounded-full text-[10px] font-bold">
            {order.status}
          </span>
        </div>

        {/* Item Content */}
        <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-6 w-full">
            <div className="w-24 h-24 bg-[#181818] border border-zinc-800 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
              <div className="w-12 h-16 bg-zinc-800 rounded opacity-40 shadow-2xl rotate-6" />
            </div>

            <div className="space-y-1 min-w-0">
              <h3 className="text-lg font-semibold font-montserrat truncate tracking-wide">
                {order.product}
              </h3>

              <p className="text-xs text-zinc-500 uppercase tracking-tighter">
                {order.variant}
              </p>

              <p className="text-xs text-zinc-500">
                Qty: {order.qty}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 w-full md:w-auto justify-end">
            <button className="flex-1 md:flex-none border border-[#FFB800] text-[#FFB800] hover:bg-[#FFB800]/5 px-8 py-3 rounded-md text-[11px] font-bold uppercase tracking-widest transition-all">
              Request Return
            </button>
            <button className="flex-1 md:flex-none bg-[#FFB800] hover:bg-[#e6a600] text-black px-8 py-3 rounded-md text-[11px] font-bold uppercase tracking-widest transition-all">
              Download Invoice
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}