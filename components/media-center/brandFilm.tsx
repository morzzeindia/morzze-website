"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, PlayCircle } from "lucide-react";

const films = [
  {
    title: "The Art of Water",
    desc: "Brand film showcasing our shower systems and water experience",
    time: "3:45",
  },
  {
    title: "Crafted in India",
    desc: "Behind-the-scenes of our bathroom fittings manufacturing",
    time: "4:20",
  },
  {
    title: "Kitchen Stories",
    desc: "How our kitchen solutions transform everyday cooking",
    time: "2:55",
  },
];

export default function BrandFilmsProductDemos() {
  return (
    <section className="w-full bg-[#121212] text-white px-4 md:px-8 lg:px-10 py-16 md:py-20">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-[10px] uppercase tracking-[0.42em] text-[#d39b10] font-medium mb-4">
          Watch Our Story
        </p>
        <h2 className="text-[38px] md:text-[52px] font-semibold tracking-[-0.03em] mb-4">
          Brand Films & Product Demos
        </h2>
        <p className="max-w-3xl mx-auto text-[14px] leading-7 text-[#777777] mb-10">
          Explore our collection of brand films showcasing bathroom and kitchen
          innovations manufacturing excellence, and design philosophy.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 text-left mb-10">
          {films.map((film, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative w-full h-[190px] overflow-hidden rounded-[4px] mb-4">
                <Image
                  src="/films.png"
                  alt={film.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center">
                    <Play size={18} className="fill-white ml-1 text-white" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-[10px] px-2 py-1 rounded">
                  {film.time}
                </span>
              </div>
              <h3 className="text-[22px] font-medium mb-2">{film.title}</h3>
              <p className="text-[13px] leading-6 text-[#777777]">
                {film.desc}
              </p>
            </motion.div>
          ))}
        </div>
        {/* 
        <button className="px-10 h-11 bg-[#e6aa12] text-black text-[12px] font-medium inline-flex items-center gap-2 hover:bg-[#d39b10] transition">
          <PlayCircle size={14} /> VIEW COMPLETE VIDEO LIBRARY
        </button> */}
      </div>
    </section>
  );
}
