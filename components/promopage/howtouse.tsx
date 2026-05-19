"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Ticket, ScanLine, BadgeCheck } from "lucide-react";

const steps = [
  { icon: ShoppingBag, no: "1", text: "Add your favorite items to cart" },
  { icon: Ticket, no: "2", text: "Copy the promo code from above" },
  { icon: ScanLine, no: "3", text: "Paste code at checkout" },
  { icon: BadgeCheck, no: "4", text: "Discount applied automatically" },
];

export default function PromoStepsNewsletter() {
  return (
    <section className="w-full bg-black text-white border-t border-[#141414]">
      {/* How to Use */}
      <div className="px-4 md:px-8 py-16 md:py-20 bg-[#141414]">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-[42px] font-semibold tracking-[-0.03em] text-[#f5f2ea] mb-3"
          >
            How to Use Promo Codes
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-[14px] text-[white]/80 max-w-md mx-auto mb-12 leading-7"
          >
            Follow these simple steps to apply your discount
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {steps.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div className="relative mb-6">
                    <div className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-[#f4e8c7] flex items-center justify-center text-[#b97712]">
                      <Icon size={18} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#222222] text-[10px] text-white flex items-center justify-center border border-[#2e2e2e]">
                      {item.no}
                    </div>
                  </div>
                  <p className="text-[14px] text-[#d9d9d9] leading-6 max-w-[160px]">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="px-4 md:px-8 py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-[44px] font-semibold tracking-[-0.03em] text-[#f5f2ea] mb-3"
          >
            Never Miss a Deal
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-[14px] text-[white]/70 max-w-xl mx-auto mb-8 leading-7"
          >
            Subscribe to our newsletter and be the first to know about exclusive
            offers and new promo codes
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-[430px] mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-11 bg-[#151515] border border-[#2c2c2c] px-4 text-[14px] text-white outline-none placeholder:text-[#666666]"
            />
            <button className="w-full sm:w-[120px] h-11 bg-[#e6aa12] text-black text-[13px] font-semibold rounded-[3px] hover:bg-[#d39b10] transition-colors">
              Subscribe
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
