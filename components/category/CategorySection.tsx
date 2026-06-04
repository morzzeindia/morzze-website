"use client";
import { allowedCategoryNames } from "@/const/globalconst";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  bannerImage: string | null;
  description: string | null;
  type: string | null;
}

interface CategorySectionProps {
  categories: CategoryItem[];
}

// Grid span patterns for the bento layout — cycles every 9 items
const SPAN_PATTERNS = [
  "lg:col-span-5 lg:row-span-2",  // 0 – hero (big card)
  "lg:col-span-4 lg:row-span-1",  // 1
  "lg:col-span-3 lg:row-span-1",  // 2
  "lg:col-span-3 lg:row-span-1",  // 3
  "lg:col-span-4 lg:row-span-1",  // 4
  "lg:col-span-4 md:col-span-6",  // 5
  "lg:col-span-2 md:col-span-6",  // 6
  "lg:col-span-2 md:col-span-6",  // 7
  "lg:col-span-4 md:col-span-6",  // 8
];

const CategorySection = ({ categories }: CategorySectionProps) => {

  return (
    <section
      id="category-section"
      className="bg-black py-16 px-6 md:px-10 font-montserrat "
    >
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-12 md:mb-16">
          <nav className="flex items-center gap-2 text-[10px] md:text-xs text-white/50 mb-4 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            <Link
              href="/category"
              className="hover:text-[#EDEBE9] transition-colors"
            >
              Category
            </Link>
            <span>&gt;</span>
          </nav>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#EDEBE9]">
            Browse by Category
          </h2>
        </div>

        {categories.length === 0 ? (
          <p className="text-white/50 text-center py-20 text-lg">
            No categories found.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 auto-rows-[300px]">
            {categories.map((cat, index) => {
              const spanClass =
                SPAN_PATTERNS[index % SPAN_PATTERNS.length] ??
                "lg:col-span-3 md:col-span-6";

              return (
                <Link
                  href={`/${cat.type}/${cat.slug}`}
                  key={cat.id}
                  className={`relative group group cursor-pointer overflow-hidden rounded-sm bg-zinc-900 ${spanClass}`}
                >
                  {cat.bannerImage ? (
                    <Image
                      src={cat.bannerImage}
                      alt={cat.name}
                      width={900}
                      height={900}
                      className="w-full h-full object-cover opacity-60 transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-800" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <h3 className="text-xl md:text-2xl translate-y-10 group-hover:translate-y-0 transition-all duration-300 font-medium text-white group-hover:text-[#FFBF3F]">
                      {cat.name}
                    </h3>
                    {cat.description && (
                      <p className="text-white/50 translate-y-16 group-hover:translate-y-0 transition-all duration-300 text-xs md:text-sm mt-2 font-inter line-clamp-2">
                        {cat.description}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
