"use client"
import React from 'react'

const CheckoutSummary = () => {
  return (
    <div className="bg-[#0A0A0A] border border-zinc-900 rounded-lg p-8">
      <h2 className="text-white text-lg font-medium mb-8">Summary</h2>
      
      <div className="space-y-6">
        {/* Product Line Item */}
        <div className="flex justify-between items-start gap-4">
          <span className="text-zinc-500 text-sm font-light leading-snug">
            AeroMix Tall Faucet...
          </span>
          <span className="text-zinc-300 text-sm font-medium text-nowrap">₹8,500</span>
        </div>

        <div className="space-y-3 pt-6 border-t border-zinc-900">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 font-light">Subtotal</span>
            <span className="text-zinc-300">₹8,500</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 font-light">Shipping</span>
            <span className="text-zinc-300">Free</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 font-light">GST</span>
            <span className="text-zinc-300">₹1,530</span>
          </div>
        </div>

        {/* Grand Total */}
        <div className="flex justify-between items-center pt-6 border-t border-zinc-900">
          <span className="text-white font-medium">Total</span>
          <span className="text-white text-xl font-semibold tracking-tight">₹10,030</span>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary