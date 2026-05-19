"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

const explore = [
  {
    cat: "Sustainability",
    title: "Sustainable Furniture: Making Eco-Conscious Choices",
  },
  {
    cat: "Tips & Guides",
    title: "Small Space Solutions: Maximizing Compact Living",
  },
  {
    cat: "Interior Design",
    title: "The Perfect Dining Room: Entertaining in Style",
  },
];

export default function MoreToExploreSection() {
  return (
    <section className="w-full bg-[#141414] text-white px-4 md:px-8 lg:px-10 py-12 md:py-14">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-[34px] font-semibold tracking-[-0.03em]"
          >
            More to Explore
          </motion.h2>

          <Link href="/blogs">
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-[13px] text-[#e6aa12] font-medium hover:gap-3 transition-all"
            >
              View All Articles <MoveRight size={14} />
            </motion.button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {explore.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative w-full h-[180px] md:h-[200px] overflow-hidden rounded-[4px] mb-4">
                <Image
                  src="/related.png"
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
              </div>

              <p className="text-[11px] text-[#d39b10] font-medium mb-2">
                {item.cat}
              </p>
              <h3 className="text-[16px] leading-7 text-[#f5f2ea] max-w-[95%]">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
