import ShopCategory from '@/components/home/ShopCategory'
import { getCategories } from '@/helper';
import React from 'react'

const ShopCategoryServer = async () => {
    const categories = await getCategories();

    return (
        <ShopCategory categories={categories} />
    )
}

export default ShopCategoryServer