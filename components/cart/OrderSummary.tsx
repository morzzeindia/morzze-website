"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useCart } from '@/context/CartContext'

const OrderSummary = () => {
  const { cartItems, appliedCoupon, setAppliedCoupon, clearCoupon } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isApplying, setIsApplying] = useState(false)

  // Subtotal = sum of (basePrice × quantity) — no GST
  const subtotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        const unitPrice = item.price ?? 0
        return sum + unitPrice * item.quantity
      }, 0),
    [cartItems]
  )

  // Discount helpers
  const parseDiscountPercent = (discountValue: string): number | null => {
    const normalized = discountValue.trim()
    if (normalized.includes("%")) {
      const percent = parseFloat(normalized.replace("%", ""))
      return Number.isFinite(percent) ? percent : null
    }
    return null
  }

  const calculateDiscount = (base: number, discountValue: string): number => {
    const normalized = discountValue.trim()
    if (!normalized) return 0

    if (normalized.includes("%")) {
      const percent = parseFloat(normalized.replace("%", ""))
      if (Number.isFinite(percent)) {
        return Math.round((base * percent) / 100)
      }
    }

    const fixed = parseFloat(normalized)
    return Number.isFinite(fixed) ? Math.round(fixed) : 0
  }

  // Discount applies ONLY to subtotal (ignores GST)
  const discountAmount = appliedCoupon
    ? calculateDiscount(subtotal, appliedCoupon.discountValue)
    : 0

  const discountedSubtotal = subtotal - discountAmount
  const gst = Math.round(discountedSubtotal * 0.18)
  const total = Math.max(discountedSubtotal + gst, 0)

  // Derive the display label for the discount (prefer % format)
  const discountLabel = appliedCoupon
    ? (() => {
      const pct = parseDiscountPercent(appliedCoupon.discountValue)
      return pct !== null ? `${pct}% off` : `₹${discountAmount.toLocaleString("en-IN")} off`
    })()
    : ""

  useEffect(() => {
    if (!appliedCoupon) return
    const amount = calculateDiscount(subtotal, appliedCoupon.discountValue)
    if (amount <= 0) {
      setMessage({ type: 'error', text: 'Coupon is not valid for this cart.' })
      clearCoupon()
    }
  }, [appliedCoupon, subtotal])

  const handleApplyCoupon = async () => {
    const value = couponCode.trim().toUpperCase()
    if (!value) {
      setMessage({ type: 'error', text: 'Please enter a promo code.' })
      return
    }

    setIsApplying(true)
    setMessage(null)

    try {
      const response = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: value }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        setMessage({ type: 'error', text: data.message || 'Invalid coupon code.' })
        clearCoupon()
        return
      }

      setAppliedCoupon({
        code: data.coupon.couponCode,
        discountValue: data.coupon.discountValue,
        title: data.coupon.title,
      })

      const pct = parseDiscountPercent(data.coupon.discountValue)
      const label = pct !== null ? `${pct}% off` : `${data.coupon.discountValue}%off`
      setMessage({ type: 'success', text: `Coupon applied: ${label}` })
      toast.success('Coupon applied successfully')
    } catch {
      setMessage({ type: 'error', text: 'Unable to apply coupon. Please try again.' })
      clearCoupon()
    } finally {
      setIsApplying(false)
    }
  }

  const handleRemoveCoupon = () => {
    clearCoupon()
    setCouponCode("")
    setMessage({ type: 'success', text: 'Coupon removed.' })
  }

  return (
    <div className="bg-[#141414] border border-[#454545] rounded-md p-8 sticky top-24 font-montserrat">
      <h2 className="text-white text-xl font-medium mb-8">Order Summary</h2>

      <div className="space-y-4 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500 font-light">Subtotal</span>
          <span className="text-zinc-300">₹{subtotal.toLocaleString("en-IN")}</span>
        </div>

        {appliedCoupon && discountAmount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500 font-light">
              Discount&nbsp;
              {/* <span className="text-emerald-400 font-semibold">
                {parseDiscountPercent(appliedCoupon.discountValue) !== null
                  ? `${parseDiscountPercent(appliedCoupon.discountValue)}%`
                  : appliedCoupon.discountValucle}
              </span> */}
              &nbsp;· {appliedCoupon.code}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400">{discountAmount.toLocaleString("en-IN")}%</span>
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-zinc-500 font-light">Shipping</span>
          <span className="text-green-500 uppercase text-xs font-bold tracking-widest">Free</span>
        </div>
        <div className="flex justify-between text-sm border-b pb-4">
          <span className="text-zinc-500 font-light">GST (18%)</span>
          <span className="text-zinc-300">₹{gst.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div className="border-t border-zinc-900 mb-5">
        <div className="flex justify-between items-center pt-4">
          <span className="text-white font-medium">Total</span>
          <span className="text-white text-xl font-semibold">₹{total.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div className="mb-8">
        <label className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-3 block">
          Promo Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Enter Code"
            className="flex-1 bg-black border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A88B4A] transition-colors"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            disabled={isApplying || cartItems.length === 0}
            className="border border-[#A88B4A] text-[#A88B4A] px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#A88B4A] hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isApplying ? 'Applying' : 'Apply'}
          </button>
        </div>
        {message && (
          <p className={`mt-3 text-sm ${message.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
            {message.text}
          </p>
        )}
      </div>

      <Link href={"/checkout"}>
        <button
          disabled={cartItems.length === 0}
          className="w-full bg-[#FFB800] hover:bg-[#E6A600] text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed to Checkout
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </Link>
    </div>
  )
}

export default OrderSummary