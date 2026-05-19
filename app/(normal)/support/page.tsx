import SupportHero from "@/components/support/SupportHero";
import SupportTabs from "@/components/support/SupportTabs";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <SupportHero />

      <Suspense fallback={null}>
        <SupportTabs />
      </Suspense>
    </div>
  );
};

export default page;