"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, ExternalLink, Clock3, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

type Coupon = {
  id: string;
  category: string;
  title: string;
  description: string;
  couponCode: string;
  discountValue: string;
  upto: string | null;
  minimumOrder: string | null;
  validUntil: Date | string | null;
  termsPdf: string | null;
  isActive: boolean;
};

const tabs = [
  "All",
  "New Customer",
  "Category",
  "Shipping",
  "Seasonal",
  "Trade",
];

export default function PromoCouponTabsCards({
  coupons,
}: {
  coupons: Coupon[];
}) {
  const [activeTab, setActiveTab] = useState("All");

  const activeCoupons = coupons.filter((coupon) => coupon.isActive);

  const filtered =
    activeTab === "All"
      ? activeCoupons
      : activeCoupons.filter((item) => item.category === activeTab);

  const copyCouponCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    toast.success("Coupon code copied!");
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "No expiry";
    return new Date(date).toLocaleDateString("en-IN");
  };

  return (
    <section className="w-full bg-black text-white px-4 md:px-8 lg:px-10 py-12 md:py-16 border-t border-[#1b1b1b]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3 md:gap-6 border-b border-[#1d1d1d] pb-5 mb-12">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(tab)}
              className={`px-6 h-10 rounded-full text-[13px] font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#e6aa12] text-black"
                  : "text-[#f5f2ea] hover:text-[#e6aa12]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.length === 0 ? (
              <p className="text-white/80 text-sm col-span-full">
                No coupons available.
              </p>
            ) : (
              filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="bg-[linear-gradient(90deg,#171717,#111111,#171717)] border border-[#202020] p-5 min-h-[210px]"
                >
                  <div className="flex justify-between items-center mb-5 gap-3">
                    <span className="px-2 py-[3px] rounded-[4px] bg-[#f5f2ea] text-black text-[10px]">
                      {item.category}
                    </span>

                    <span className="px-3 py-[4px] rounded-full bg-[#f4e6c5] text-[#9c5d00] text-[11px] font-semibold">
                      {item.discountValue}% OFF
                      {item.upto ? ` upto ${item.upto}` : ""}
                    </span>
                  </div>

                  <h3 className="text-[16px] font-semibold text-[#f5f2ea] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-[13px] leading-6 text-white/80 mb-5">
                    {item.description}
                  </p>

                  <div className="flex gap-2 mb-4">
                    <div className="flex-1 h-10 bg-[#efefef] text-black flex items-center px-4 text-[14px] tracking-[0.08em] rounded-[4px]">
                      {item.couponCode}
                    </div>

                    <button
                      onClick={() => copyCouponCode(item.couponCode)}
                      className="w-[78px] h-10 bg-[#1a1a1a] border border-[#262626] rounded-[4px] flex items-center justify-center gap-2 text-[13px] hover:border-[#3a3a3a]"
                    >
                      <Copy size={13} /> Copy
                    </button>
                  </div>

                  <div className="flex justify-between text-[12px] text-white/80 mb-4 gap-3">
                    <span className="flex items-center gap-1">
                      <ShoppingCart size={12} /> Min:{" "}
                      {item.minimumOrder || "No minimum"}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock3 size={12} /> Valid until:{" "}
                      {formatDate(item.validUntil)}
                    </span>
                  </div>

                  {item.termsPdf && (
                    <a
                      href={item.termsPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[12px] text-[#b97712] hover:text-[#e6aa12] transition-colors"
                    >
                      Terms & Conditions <ExternalLink size={12} />
                    </a>
                  )}
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}