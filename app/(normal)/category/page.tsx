import CategoryBanner from '@/components/category/CategoryBanner'
import CategorySection from '@/components/category/CategorySection'
import ScrollingRibbon from '@/components/category/ScrollingRibbon'
import SimpleCategoryBanner from '@/components/category/SimpleCategoryBanner'
import { allowedCategoryNames } from '@/const/globalconst'
import { getCategories } from '@/helper/category/action'
import { Suspense } from 'react'

const page = async () => {
  const categories = await getCategories();

  const filterCat = categories.filter((cat) => allowedCategoryNames.has(cat.slug));

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryBanner title="Our Categories" description="Explore our diverse range of high-quality kitchen and bathroom products." />
        <CategorySection categories={filterCat} />
      </Suspense>
      <SimpleCategoryBanner />
      <ScrollingRibbon />
    </div>
  )
}

export default page
