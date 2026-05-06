"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

const tabs = [
  "All",
  "Design",
  "Trends",
  "Sustainability",
  "Tips & Guides",
  "Care & Maintenance",
];

const blogs = [
  {
    cat: "Trends",
    title: "How to Choose the Right Kitchen Sink",
    desc: "A comprehensive guide to selecting the perfect sink for your kitchen...",
    author: "Rajesh Kumar",
    date: "2024-01-10",
    read: "7 min read",
    tab: "Trends",
  },
  {
    cat: "Sustainability",
    title: "Sustainable Bathroom Fittings That Save Water",
    desc: "Discover eco-friendly solutions for your bathroom without compromising on luxury...",
    author: "Anita Desai",
    date: "2024-01-05",
    read: "6 min read",
    tab: "Sustainability",
  },
  {
    cat: "Tips & Guides",
    title: "Granite vs Steel Sinks: Which is Better?",
    desc: "An in-depth comparison of the two most popular sink materials...",
    author: "Priya Sharma",
    date: "2023-12-28",
    read: "8 min read",
    tab: "Tips & Guides",
  },
  {
    cat: "Interior Design",
    title: "10 Design Ideas for Small Kitchens",
    desc: "Maximize your kitchen space with these smart design strategies...",
    author: "Vikram Mehta",
    date: "2023-12-20",
    read: "6 min read",
    tab: "Design",
  },
  {
    cat: "Care & Maintenance",
    title: "Essential Faucet Maintenance Tips",
    desc: "Keep your faucets gleaming and functional with these simple care routines...",
    author: "Rajesh Kumar",
    date: "2023-12-15",
    read: "5 min read",
    tab: "Care & Maintenance",
  },
  {
    cat: "Interior Design",
    title: "Complete Bathroom Renovation Guide",
    desc: "Everything you need to know before starting your bathroom makeover...",
    author: "Priya Sharma",
    date: "2023-12-10",
    read: "7 min read",
    tab: "Design",
  },
];

export default function BlogGridTabs() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = blogs.filter((b) => {
    const tabMatch = activeTab === "All" || b.tab === activeTab;
    const searchMatch = b.title.toLowerCase().includes(search.toLowerCase());
    return tabMatch && searchMatch;
  });

  return (
    <section className="w-full bg-black text-white px-4 md:px-8 lg:px-10 py-10 md:py-14">
      <div className="max-w-7xl mx-auto">
        {/* Top Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 md:gap-5 min-w-max pb-2">
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(tab)}
                  className={`px-7 h-10 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-[#e6aa12] text-black"
                      : "text-white hover:text-[#e6aa12]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full lg:w-[250px]">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full h-11 rounded-full bg-[#141414] border border-[#303030] pl-10 pr-4 text-[13px] outline-none placeholder:text-[#666666]"
            />
          </div>
        </div>

        {/* Blog Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + search}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10"
          >
            {filtered.map((blog, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="group"
              >
                <div className="relative w-full h-[210px] md:h-[230px] overflow-hidden rounded-[6px] mb-5">
                  <Image
                    src="/blogimg.png"
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                  />
                  <span className="absolute top-3 left-3 px-3 py-[4px] rounded-full bg-[#efefef] text-black text-[10px]">
                    {blog.cat}
                  </span>
                </div>

                <h3 className="text-[16px] font-semibold text-[#f5f2ea] mb-3 leading-7">
                  {blog.title}
                </h3>
                <p className="text-[13px] text-[#7b7b7b] leading-6 mb-6">
                  {blog.desc}
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#222222]" />
                  <div>
                    <p className="text-[13px] text-white">{blog.author}</p>
                    <p className="text-[11px] text-[#6d6d6d]">
                      {blog.date} · {blog.read}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
