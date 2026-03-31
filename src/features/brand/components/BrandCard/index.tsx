"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardImage, CardTitle } from "@/components/ui/card";

import type { Brand } from "@/features/brand/types";

interface BrandCardProps {
  item: Brand;
}

export default memo(function BrandCard({ item }: BrandCardProps) {
  const router = useRouter();

  if (!item) {
    return null;
  }

  const { brand_id, brand_slug, brand_name, image, logo } = item;
  const imageSrc =
    image ??
    logo ??
    "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png";

  const handleNavigation = () => {
    const target = brand_slug || brand_id;
    if (!target) return;

    router.push(`/search?brand=${target}`);
  };

  return (
    <Card
      onClick={handleNavigation}
      className="rounded-3xl aspect-square flex flex-col justify-center items-center"
    >
      <CardContent className="p-0 rounded-full bg-white dark:bg-white w-1/2 border overflow-hidden">
        <CardImage
          src={imageSrc}
          alt={brand_name || "Brand"}
          className="w-full h-full aspect-square rounded-t-lg cursor-pointer object-cover"
        />
      </CardContent>
      <CardContent className="p-3">
        <CardTitle className="text-md capitalize cursor-pointer text-black dark:text-white text-center xl:line-clamp-2 line-clamp-1">
          {brand_name || "Brand"}
        </CardTitle>
      </CardContent>
    </Card>
  );
});
