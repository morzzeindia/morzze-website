import PromoCouponTabsCards from "@/components/promopage/allPromo";
import PromoCodesOfferHero from "@/components/promopage/herobanner";
import PromoStepsNewsletter from "@/components/promopage/howtouse";
import { getCoupons } from "@/helper/coupons/action";
import React from "react";

const Page = async () => {
  const coupons = await getCoupons();

  return (
    <div>
      <PromoCodesOfferHero />

      <PromoCouponTabsCards coupons={coupons} />

      <PromoStepsNewsletter />
    </div>
  );
};

export default Page;