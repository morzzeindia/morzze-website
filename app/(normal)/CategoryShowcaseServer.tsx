import CategoryShowcase from '@/components/home/CategoryShowcase';
import { getCategoriesWithProducts } from '@/helper/category/action';
import React from 'react'

const CategoryShowcaseServer = async () => {
    const categoriesWithProducts = await getCategoriesWithProducts(4);

    return (
        <CategoryShowcase categories={categoriesWithProducts} />
    )
}

export default CategoryShowcaseServer