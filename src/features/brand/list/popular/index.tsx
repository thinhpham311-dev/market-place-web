"use client";

import BrandListSection from "@/features/brand/list/all";

export default function BrandListPopular() {
  return (
    <BrandListSection
      titleKey="featured_brands"
      descriptionKey="featured_brands_desc"
      compact={false}
      logoOnly={true}
      showSeeMore={true}
      countLoadItems={8}
    />
  );
}
