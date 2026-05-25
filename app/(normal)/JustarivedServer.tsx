import JustArrived from '@/components/home/JustArrived';
import { getNewArrivalProducts } from '@/helper/product/action';
import React from 'react'

const JustarivedServer = async () => {
    const newArrivalProducts = await getNewArrivalProducts(8);

    return (
        <JustArrived products={newArrivalProducts} />
    )
}

export default JustarivedServer