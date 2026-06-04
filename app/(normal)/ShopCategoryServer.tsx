import ShopCategory from '@/components/home/ShopCategory'
import { allowedCategoryNames } from '@/const/globalconst';
import { getCategories } from '@/helper';
import React from 'react'

const ShopCategoryServer = async () => {
    const categories = await getCategories();
    const filteredCategories = categories.filter((category) =>
        allowedCategoryNames.has(category.slug)
    );

    return (
        <ShopCategory categories={filteredCategories} />
    )
}

export default ShopCategoryServer