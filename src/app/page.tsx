'use client'

import { Banner, List } from '@/components'
export default function Home() {
  return (
    <div>
      <Banner />
      <List isCarousel isViewMore title="Popular Products" article='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id urna non sem accumsan dictum.' />
      <List title={<span className="block text-center">tip today</span>} article={<span className="block text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>} />
    </div>
  );
}


