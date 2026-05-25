import { getCoupons } from '@/helper/coupons/action';
import React from 'react'
import PromoCouponTabsCards from './allPromo';

const PromocodeServer = async () => {
    const coupons = await getCoupons();

    return (
        <PromoCouponTabsCards coupons={coupons} />

    )
}

export default PromocodeServer