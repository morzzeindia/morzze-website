import CategoryBanner from '@/components/category/CategoryBanner'
import CategorySection from '@/components/category/CategorySection'
import ScrollingRibbon from '@/components/category/ScrollingRibbon'
import SimpleCategoryBanner from '@/components/category/SimpleCategoryBanner'
import { getCategories } from '@/helper/category/action'
import React from 'react'

const page = async () => {
  const categories = await getCategories();
  const allowedCategoryNames = new Set([
    "granite sink",
    "steel sinks",
    "floor drainer",
    "food waste disposer",
    "bathroom faucets",
    "bathroom faucet",
    "electric towel warmer",
    "kitchen accessories",
    "airtap",
    "air tap",
  ]);

  const filteredCategories = categories.filter((cat) =>
    allowedCategoryNames.has(cat.name.trim().toLowerCase()),
  );

  return (
    <div>
      <CategoryBanner/>
      <CategorySection categories={filteredCategories}/>
      <SimpleCategoryBanner/>
      <ScrollingRibbon/>
    </div>
  )
}

export default page
