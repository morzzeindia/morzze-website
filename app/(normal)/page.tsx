import CategoryShowcase from '@/components/home/CategoryShowcase'
import Craftsmanship from '@/components/home/Craftsmanship'
import FeaturedInnovation from '@/components/home/FeaturedInnovation'
import HeroSection from '@/components/home/HeroSection'
import InstagramCarousel from '@/components/home/InstagramCarousel'
import JustArrived from '@/components/home/JustArrived'
import LookbookSection from '@/components/home/LookbookSection'
import NaturalElegance from '@/components/home/NaturalElegance'
import NewsletterSection from '@/components/home/NewsletterSection'
import PerformanceShowcase from '@/components/home/PerformanceShowcase'
import ShopCategory from '@/components/home/ShopCategory'
import SignaturePieces from '@/components/home/SignaturePieces'
import StoreLocator from '@/components/home/StoreLocator'
import TestimonialSlider from '@/components/home/TestimonialSlider'
import TheARTSection from '@/components/home/TheARTSection'
import TheStory from '@/components/home/TheStory'
import TouchlessInnovation from '@/components/home/TouchlessInnovation'
import TrendingNow from '@/components/home/TrendingNow'
import TrustSection from '@/components/home/TrustSection'
import WhereWaterMeet from '@/components/home/WhereWaterMeet'
import { getCategories, getCategoriesWithProducts } from '@/helper/category/action'
import { getSignatureProducts, getNewArrivalProducts, getTrendingProducts } from '@/helper/product/action'
import React from 'react'

const page = async () => {
  const categories = await getCategories();
  const categoriesWithProducts = await getCategoriesWithProducts(4);
  const signatureProducts = await getSignatureProducts(8);
  const newArrivalProducts = await getNewArrivalProducts(8);
  const trendingProducts = await getTrendingProducts(8);

  return (
    <main>
     
      <HeroSection/>
      <TheStory/>
      <SignaturePieces products={signatureProducts}/>
      <ShopCategory categories={categories}/>
      <TheARTSection/>
      <TrustSection/>
      <WhereWaterMeet/>
      <CategoryShowcase categories={categoriesWithProducts}/>
      <TrendingNow products={trendingProducts}/>
      <JustArrived products={newArrivalProducts}/>
      <Craftsmanship/>
      <TouchlessInnovation/>
      <NaturalElegance/>
      <PerformanceShowcase/>
      <TestimonialSlider/>
      <FeaturedInnovation/>
      <StoreLocator/>
      <InstagramCarousel/>
      <LookbookSection/>
      <NewsletterSection/>
    </main>
  )
}

export default page
