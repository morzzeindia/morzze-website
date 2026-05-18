"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";

const tabs = [
  "All",
  "Bathroom & Kitchen Products",
  "Experience Centers",
  "Manufacturing",
  "Events & Launches",
];
const images = new Array(12).fill("/gallery-item.png");

export default function ProductPhotographyGallery() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <section className="w-full bg-black text-white px-4 md:px-8 lg:px-10 py-16 md:py-20">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-[10px] uppercase tracking-[0.42em] text-[#d39b10] font-medium mb-4">
          Visual Assets
        </p>
        <h2 className="text-[38px] md:text-[52px] font-semibold tracking-[-0.03em] mb-8">
          Product Photography Gallery
        </h2>

        {/* Tabs */}
        <div className="overflow-x-auto scrollbar-hide mb-10">
          <div className="flex gap-5 justify-center min-w-max px-2">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(tab)}
                className={`px-7 h-10 rounded-full text-[13px] whitespace-nowrap ${activeTab === tab ? "bg-[#e6aa12] text-black" : "text-white"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-10"
          >
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="relative w-full h-[180px] md:h-[240px] lg:h-[210px] overflow-hidden group cursor-pointer"
              >
                <Image
                  src={img}
                  alt="gallery"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>



        {/* <button className="px-8 h-10 border border-[#d39b10] text-[#d39b10] text-[12px] inline-flex items-center gap-2 hover:bg-[#d39b10] hover:text-black transition">
          <Download size={13} /> Download Image Guidelines
        </button> */}
      </div>
    </section>
  );
}
