import TrendingNow from '@/components/home/TrendingNow';
import { getTrendingProducts } from '@/helper/product/action';
import React from 'react'

const TrendingNowServer = async () => {
    const trendingProducts = await getTrendingProducts(8);

    return (
        <TrendingNow products={trendingProducts} />
    )
}

export default TrendingNowServer