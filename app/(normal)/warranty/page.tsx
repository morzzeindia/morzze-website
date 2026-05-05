import FeaturesGrid from '@/components/warranty/FeaturesGrid'
import HowWarrantyWorks from '@/components/warranty/HowWarrantyWorks'
import NeedHelp from '@/components/warranty/NeedHelp'
import WarrantyBanner from '@/components/warranty/WarrantyBanner'
import WarrantyCoverageGrid from '@/components/warranty/WarrantyCoverageGrid'
import WarrantyServices from '@/components/warranty/WarrantyServices'
import WarrantyTermsSection from '@/components/warranty/WarrantyTermsSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <WarrantyBanner/>
      <WarrantyCoverageGrid/>
      <HowWarrantyWorks/>
      <WarrantyTermsSection/>
      <WarrantyServices/>
      <FeaturesGrid/>
      <NeedHelp/>
    </div>
  )
}

export default page
