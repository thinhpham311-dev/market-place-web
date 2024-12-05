'use client'
//components
import { Banner } from '@/components/ui/templates'
import { CarouselList, GridList } from '@/components/ui/organisms';

//datas
import { productData } from '@/constants/data';

export default function Home() {
  return (
    <div className="space-y-10">
      <Banner />
      <CarouselList
        title="Popular products"
        article='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id'
        data={productData}
        isViewMore />
      <GridList
        title="Suggestion today"
        data={productData}
      />
    </div>
  );
}


