"use client"
import React from 'react'

const orders = [
  { id: "MOR-24-012203", date: "28 Feb, 2024", price: "₹23,250", status: "Delivered", name: "Aeromix Sensor", detail: "Brushed Gold | Qty: 2" },
  { id: "MOR-24-012202", date: "12 Feb, 2024", price: "₹23,600", status: "Delivered", name: "Robe Wash Basin", detail: "Brushed Gold | Qty: 2" }
]

export const RecentOrders = () => {
  return (
    <div className="bg-[#0F0F0F] border border-zinc-900 rounded-2xl p-5 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-lg font-medium">Recent Orders</h2>
        <button className="text-[10px] text-[#FFB800] uppercase tracking-widest font-bold">View All</button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border border-zinc-900 rounded-xl p-5 bg-[#141414]/50 relative">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-wider">
                  <span>{order.id}</span>
                  <span className="text-zinc-800">|</span>
                  <span>{order.date}</span>
                </div>
                <div className="text-white text-lg font-semibold mt-1">{order.price}</div>
              </div>
              <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[9px] font-medium lowercase">
                {order.status}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <div className="w-20 h-20 bg-zinc-900 rounded-lg overflow-hidden shrink-0 border border-zinc-800/50">
                <img src="/api/placeholder/80/80" alt={order.name} className="w-full h-full object-cover opacity-60" />
              </div>
              <div className="flex-1 flex flex-col justify-between h-20 py-1">
                <div>
                  <h4 className="text-white text-[13px] font-medium leading-tight">{order.name}</h4>
                  <p className="text-zinc-600 text-[11px] mt-1 font-light">{order.detail}</p>
                </div>
                <button className="self-end text-[#FFB800] text-[10px] font-bold uppercase tracking-widest">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}