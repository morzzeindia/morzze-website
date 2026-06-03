import CategoryBanner from '@/components/category/CategoryBanner'
import CategorySection from '@/components/category/CategorySection'
import ScrollingRibbon from '@/components/category/ScrollingRibbon'
import SimpleCategoryBanner from '@/components/category/SimpleCategoryBanner'
import { getCategories } from '@/helper/category/action'
import React, { Suspense } from 'react'

const page = async () => {
  const categories = await getCategories();
  const allowedCategoryNames = new Set([
    "granite sink",
    "steel sinks",
    "kitchen faucet",
    "bathroom faucets",
    "wash basin",
    "towel warmer",
    "food waste disposers",
    "floor drainer",
    "air tap",
  ]);

  const filteredCategories = categories.filter((category) =>
    allowedCategoryNames.has(category.name.toLowerCase())
  );

  return (
    <div>
      <CategoryBanner />
      <Suspense fallback={<div>Loading...</div>}>
        <CategorySection categories={filteredCategories} />
      </Suspense>
      <SimpleCategoryBanner />
      <ScrollingRibbon />
    </div>
  )
}

export default page
