"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, HardDrive, CalendarDays, Download } from "lucide-react";

export type CatalogueGridItem = {
  id: string;
  title: string;
  shortDescription: string;
  image: string;
  pdfFile: string;
  totalPages: number;
  fileSize: string;
  publishYear: string;
  category: string;
  isFeatured: boolean;
};

type Props = {
  items: CatalogueGridItem[];
};

const PLACEHOLDER_IMG = "/video.png";

export default function CatalogueGridDownloads({ items }: Props) {
  const tabs = useMemo(() => {
    const categories = [
      ...new Set(items.map((c) => c.category).filter(Boolean)),
    ].sort((a, b) => a.localeCompare(b));
    return ["All", ...categories];
  }, [items]);

  const [activeTab, setActiveTab] = useState("All");

  const filtered = useMemo(() => {
    if (activeTab === "All") return items;
    return items.filter((c) => c.category === activeTab);
  }, [activeTab, items]);

  return (
    <section className="w-full bg-black text-white">
      <div className="px-4 md:px-8 lg:px-10 py-10 md:py-14 max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="overflow-x-auto scrollbar-hidden  border-b border-[#1d1d1d] pb-5 mb-12">
          <div className="flex  min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-7 h-10 rounded-full text-[13px] whitespace-nowrap ${activeTab === tab ? "bg-[#e6aa12] text-black" : "text-white"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {items.length === 0 ? (
          <p className="text-center text-[white]/80 text-sm py-16 border border-dashed border-[#2a2a2a] rounded-lg">
            No catalogues available yet. Please check back soon.
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-[white]/80 text-sm py-16">
            No catalogues in this category.
          </p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="group"
                >
                  <div className="relative w-full h-[260px] overflow-hidden rounded-[2px] mb-4 bg-[#efefef]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image || PLACEHOLDER_IMG}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      onError={(e) => {
                        e.currentTarget.src = PLACEHOLDER_IMG;
                      }}
                    />
                    {item.isFeatured ? (
                      <span className="absolute top-3 left-3 rounded-full bg-[#e6aa12] text-black text-[10px] font-semibold px-2.5 py-0.5">
                        Featured
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-[15px] font-medium text-[#f5f2ea] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[12px] leading-6 text-[white]/80 mb-4 line-clamp-4">
                    {item.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-3 text-[10px] text-[white]/80 mb-4">
                    <span className="flex items-center gap-1">
                      <FileText size={11} /> {item.totalPages} pages
                    </span>
                    <span className="flex items-center gap-1">
                      <HardDrive size={11} /> {item.fileSize}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays size={11} /> {item.publishYear}
                    </span>
                  </div>

                  <a
                    href={item.pdfFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-10 border border-[#d39b10] text-[#d39b10] text-[12px] flex items-center justify-center gap-2 hover:bg-[#d39b10] hover:text-black transition"
                  >
                    <Download size={13} /> Download PDF
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
