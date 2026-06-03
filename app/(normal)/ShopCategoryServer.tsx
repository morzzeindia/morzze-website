import ShopCategory from '@/components/home/ShopCategory'
import { getCategories } from '@/helper';
import React from 'react'

const ShopCategoryServer = async () => {
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
        <ShopCategory categories={filteredCategories} />
    )
}

export default ShopCategoryServer