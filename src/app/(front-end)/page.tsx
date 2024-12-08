'use client'
//components
import { Banner, PopularProductList, SuggestProductsList } from '@/components/ui/templates'

export default function Home() {
  return (
    <div className="space-y-10">
      <Banner />
      <PopularProductList />
      <SuggestProductsList />
    </div>
  );
}


