"use client";
import React from "react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

const WhatsappChat = () => {
  return (
    <section className="w-full h-full bg-black py-10">
      <div className="max-w-xl mx-auto bg-[#171717] p-14 text-center border border-white/10 rounded-lg shadow-2xl">
      {/* Icon Container with Radial Gradient Glow */}
      <div className="relative w-40 h-40 mx-auto mb-10 flex items-center justify-center">
        <div className="absolute inset-0 bg-[#25D366] opacity-20 blur-3xl rounded-full" />
        <div className="relative w-36 h-36 bg-gradient-to-b from-[#32FF4A1A] to-[#47C756] rounded-full flex items-center justify-center shadow-inner">
          <IconBrandWhatsapp size={72} color="white" stroke={1.5} />
        </div>
      </div>  

      {/* Typography */}
      <h2 className="text-3xl font-semibold text-white mb-3 tracking-tight">
        WhatsApp Chat
      </h2>
      <p className="text-gray-400 text-sm font-light mb-12">
        Instant messaging support
      </p>
      
      {/* Action Button */}
      <button className="w-full sm:w-80 mx-auto bg-[#4AC959] hover:bg-[#22c55e] text-[#0D0D0D] font-semibold py-3 px-6 rounded-md transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg flex items-center justify-center">
        <span className="text-lg">Chat on WhatsApp</span>
      </button>
    </div>
    </section>
  );
};

export default WhatsappChat;