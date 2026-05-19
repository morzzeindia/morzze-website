"use client";

import React from "react";
import { motion } from "framer-motion";
import { Store, Crown, ShieldCheck, MapPin } from "lucide-react";

const types = [
  {
    icon: Store,
    title: "Flagship Store",
    desc: "Our largest locations featuring the complete Morzze collection, interior design services, and immersive brand experiences.",
    cities: "Gurugram, Bangalore",
    iconBg: "bg-[#f4e8c7]",
    iconColor: "text-[#9b5d00]",
  },
  {
    icon: Crown,
    title: "Experience Studio",
    desc: "Curated showrooms with personalized design consultations. By appointment for a focused, private shopping experience.",
    cities: "Mumbai, Hyderabad",
    iconBg: "bg-[#eadcff]",
    iconColor: "text-[#6b3eb1]",
  },
  {
    icon: ShieldCheck,
    title: "Authorized Dealer",
    desc: "Partner locations offering selected collections, order placement, and local delivery services.",
    cities: "Chennai, Kolkata, Pune, Ahmedabad",
    iconBg: "bg-[#dfe8ff]",
    iconColor: "text-[#3a5ca8]",
  },
];

export default function StoreTypesSection() {
  return (
    <section className="w-full bg-black text-white px-4 md:px-8 lg:px-10 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-[42px] md:text-[50px] font-semibold tracking-[-0.03em] text-[#f5f2ea] mb-3">
            Our Store Types
          </h2>
          <p className="text-[14px] text-[white]/80">
            Choose the right location for your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {types.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="border border-[#4a4a4a] bg-[#141414] rounded-[8px] px-5 py-6 min-h-[210px] hover:border-[#666666] transition-all duration-400"
              >
                <div
                  className={`w-11 h-11 rounded-full ${item.iconBg} flex items-center justify-center mb-5`}
                >
                  <Icon size={18} className={item.iconColor} />
                </div>

                <h3 className="text-[16px] md:text-[18px] font-semibold text-[#f5f2ea] mb-4">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-7 text-[white]/70 mb-5">
                  {item.desc}
                </p>

                <p className="flex items-center gap-2 text-[12px] text-[white]/80">
                  <MapPin size={12} /> {item.cities}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
