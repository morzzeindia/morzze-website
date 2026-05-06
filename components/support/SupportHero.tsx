"use client";
import React from "react";
import { motion } from "framer-motion";

const SupportHero = () => {
  return (
    <section className="relative h-[450px] md:h-[450px] w-full overflow-hidden flex items-center justify-center font-inter">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('/support-bg.png')`, // Replace with your actual image path
        }}
      >
        {/* Dark Tint Overlay to match the image style */}
        <div className="absolute inset-0 bg-black/70 md:bg-black/60 shadow-inner"></div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          {/* Subheading/Tag */}
          <span className="text-[#FDB813] text-[10px] md:text-xs font-bold uppercase tracking-[4px] block mb-2">
            Support
          </span>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight">
            How Can We Help?
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-sm md:text-base font-light max-w-xl mx-auto opacity-90 leading-relaxed">
            Seamless support for all your bathroom and kitchen solutions
          </p>
        </motion.div>
      </div>

      {/* Subtle Bottom Gradient Fade */}
    </section>
  );
};

export default SupportHero;