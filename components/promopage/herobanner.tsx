"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PromoCodesOfferHero() {
  return (
    <section className="relative w-full min-h-[320px] md:min-h-[420px] lg:min-h-[500px] overflow-hidden flex items-center justify-center bg-black">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/promo.png"
          alt="Promo Offers"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.42),rgba(84,25,0,0.28),rgba(0,0,0,0.22))]" />
      </motion.div>

      {/* Warm Ambient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.10),transparent_65%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-[10px] md:text-xs uppercase tracking-[0.45em] text-[#d29a18] font-semibold mb-4"
        >
          Coupons
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          viewport={{ once: true }}
          className="text-[34px] md:text-[52px] lg:text-[60px] font-semibold text-white tracking-[-0.03em] leading-[1.08] mb-4"
        >
          Get Discount on Our Products
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-[14px] md:text-[17px] text-[#f1f1f1]/90 leading-7"
        >
          Unlock exclusive savings on luxury furniture. Copy a code and apply at
          checkout.
        </motion.p>
      </div>
    </section>
  );
}
