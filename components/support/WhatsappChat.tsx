"use client";
import React from "react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

const WhatsappChat = () => {
  return (
    <div className="max-w-xl mx-auto bg-[#0D0D0D] p-16 text-center border border-white/5 shadow-2xl">
      <div className="w-24 h-24 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(37,211,102,0.2)]">
        <IconBrandWhatsapp size={48} color="white" stroke={1.5} />
      </div>
      <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">WhatsApp Chat</h2>
      <p className="text-[#928E87] text-sm mb-12">Instant messaging support for quick queries</p>
      
      <button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-5 rounded-sm transition-all flex items-center justify-center gap-3 group">
        <span>Chat on WhatsApp</span>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse group-hover:scale-125 transition-transform" />
      </button>
    </div>
  );
};

export default WhatsappChat;