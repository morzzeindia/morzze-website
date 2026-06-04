import CategoryBanner from '@/components/category/CategoryBanner';
import CategorySection from '@/components/category/CategorySection';
import { getCategories } from '@/helper';
import React, { Suspense } from 'react'
import SimpleCategoryBanner from '@/components/category/SimpleCategoryBanner'
import ScrollingRibbon from '@/components/category/ScrollingRibbon';
import { kitchenBathroomRestrictCategories } from '@/const/globalconst';



const page = async () => {
    const categories = await getCategories('kitchen');
    const filteredCat = categories.filter((cat) => !kitchenBathroomRestrictCategories.has(cat.slug));
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <CategoryBanner title="Our Kitchen Categories" description="Explore our diverse range of high-quality kitchen and bathroom products." />
                <CategorySection categories={filteredCat} />
            </Suspense>
            <SimpleCategoryBanner />
            <ScrollingRibbon />
        </div>
    )
}

export default page
