'use client'
//components
import { Banner, List } from '@/components'

//datas
import { productData } from '@/constants/data';

export default function Home() {
  return (
    <div className="space-y-10">
      <Banner />
      <List type="carousel" title="Popular products" article='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id' data={productData} />
      <List type="grid" title="Suggestion today" data={productData} />
    </div>
  );
}


