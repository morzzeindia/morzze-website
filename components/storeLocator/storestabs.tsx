"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Clock3,
  Phone,
  Star,
  X,
  Calendar,
  Navigation,
} from "lucide-react";
import Image from "next/image";

const cities = [
  "All Cities",
  "Gurugram",
  "Mumbai",
  "Bangalore",
  "Tips & Chennai",
  "Hyderabad",
  "Pune",
];

const stores = [
  {
    name: "Morzze Flagship Store",
    city: "Gurugram",
    state: "Haryana",
    hours: "10:00 AM - 9:00 PM (Mon-Sun)",
    type: "Flagship",
    badge: "bg-[#f4e8c7] text-[#9b5d00]",
  },
  {
    name: "Morzze Mumbai Studio",
    city: "Mumbai",
    state: "Maharashtra",
    hours: "11:00 AM - 8:00 PM (Tue-Sun)",
    type: "Studio",
    badge: "bg-[#eadcff] text-[#6b3eb1]",
  },
  {
    name: "Morzze Bangalore Experience Center",
    city: "Bangalore",
    state: "Karnataka",
    hours: "10:00 AM - 9:00 PM (Mon-Sun)",
    type: "Flagship",
    badge: "bg-[#f4e8c7] text-[#9b5d00]",
  },
  {
    name: "Authorized Dealer - Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    hours: "10:30 AM - 8:30 PM (Mon-Sat)",
    type: "Dealer",
    badge: "bg-[#dfe8ff] text-[#3a5ca8]",
  },
  {
    name: "Authorized Dealer - Kolkata",
    city: "Kolkata",
    state: "West Bengal",
    hours: "10:30 AM - 8:00 PM (Mon-Sun)",
    type: "Dealer",
    badge: "bg-[#dfe8ff] text-[#3a5ca8]",
  },
  {
    name: "Morzze Hyderabad Studio",
    city: "Hyderabad",
    state: "Telangana",
    hours: "11:00 AM - 8:00 PM (Mon-Sun)",
    type: "Studio",
    badge: "bg-[#eadcff] text-[#6b3eb1]",
  },
];

export default function StoreLocatorSection() {
  const [activeCity, setActiveCity] = useState("All Cities");
  const [activeStore, setActiveStore] = useState(stores[0]);

  const filtered =
    activeCity === "All Cities"
      ? stores
      : stores.filter((s) => s.city.includes(activeCity));

  return (
    <section className="w-full bg-black text-white px-4 md:px-8 lg:px-10 py-10 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Top */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7">
          <div className="relative w-full lg:w-[290px]">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]"
            />
            <input
              placeholder="Search"
              className="w-full h-11 rounded-full bg-[#141414] border border-[#383838] pl-10 pr-4 text-[13px] outline-none"
            />
          </div>

          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 min-w-max pb-2">
              {cities.map((city, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCity(city)}
                  className={`px-6 h-10 rounded-full text-[13px] whitespace-nowrap ${activeCity === city ? "bg-[#e6aa12] text-black" : "text-white"}`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-[350px_1fr] gap-7">
          {/* Left Store List */}
          <div className="max-h-[640px] overflow-y-auto pr-2 space-y-3">
            {filtered.map((store, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveStore(store)}
                whileHover={{ x: 4 }}
                className="w-full text-left bg-[#121212] border border-[#2a2a2a] p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-[14px] font-semibold max-w-[75%]">
                    {store.name}
                  </h3>
                  <span
                    className={`px-2 py-[3px] rounded-full text-[10px] ${store.badge}`}
                  >
                    {store.type}
                  </span>
                </div>
                <p className="text-[12px] text-[#7a7a7a] mb-2">
                  {store.city}, {store.state}
                </p>
                <p className="text-[11px] text-[#666666]">{store.hours}</p>
              </motion.button>
            ))}
          </div>

          {/* Right Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStore.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.45 }}
              className="border border-[#2a2a2a] bg-[#141414] overflow-hidden"
            >
              <div className="relative w-full h-[210px] md:h-[260px] bg-[#1a1a1a]">
                <iframe
                  src="https://www.google.com/maps?q=28.6358556,77.1374196&z=15&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className="p-5 md:p-6 relative">
                <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#ececec] text-black flex items-center justify-center">
                  <X size={14} />
                </button>

                <h2 className="text-[30px] font-semibold mb-2">
                  {activeStore.name}
                </h2>
                <span
                  className={`inline-block px-3 py-[4px] rounded-full text-[11px] mb-6 ${activeStore.badge}`}
                >
                  {activeStore.type} Store
                </span>

                <div className="grid md:grid-cols-2 gap-y-6 gap-x-8 text-[13px] text-[#d0d0d0]">
                  <div>
                    <p className="flex items-center gap-2 text-[#e6aa12] mb-2">
                      <MapPin size={13} /> Address
                    </p>
                    <p className="text-[#7a7a7a] leading-6">
                      Ground Floor, DLF Cyber Hub, Phase 2 Gurugram, Haryana -
                      122002
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-[#e6aa12] mb-2">
                      <Clock3 size={13} /> Hours
                    </p>
                    <p className="text-[#7a7a7a] leading-6">
                      10:00 AM - 9:00 PM (Mon-Sun)
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-[#e6aa12] mb-2">
                      <Phone size={13} /> Contact
                    </p>
                    <p className="text-[#7a7a7a] leading-6">
                      +91 124 467 8900
                      <br />
                      gurugram@morzze.com
                    </p>
                    <button className="sm:w-[170px] mt-8 h-11 border border-[#d39b10] text-[#d39b10] flex items-center justify-center gap-2 text-[13px]">
                      <Navigation size={14} /> Get Directions
                    </button>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-[#e6aa12] mb-2">
                      <Star size={13} /> Features
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "Full Collection",
                        "Interior Design Services",
                        "Custom Orders",
                        "Parking Available",
                      ].map((f, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-[11px]"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <button className="sm:w-[170px] mt-4 h-11 bg-[#e6aa12] text-black flex items-center justify-center gap-2 text-[13px] font-medium">
                      <Calendar size={14} /> Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
