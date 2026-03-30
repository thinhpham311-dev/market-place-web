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
      className="flex h-full cursor-pointer flex-col justify-center rounded-3xl border bg-background"
    >
      <CardContent className="mx-auto mt-4 w-20 overflow-hidden rounded-full border bg-white p-0 dark:bg-white">
        <CardImage
          src={imageSrc}
          alt={brand_name || "Brand"}
          className="aspect-square h-full w-full rounded-full object-cover"
        />
      </CardContent>
      <CardContent className="p-4">
        <CardTitle className="line-clamp-2 text-center text-sm font-semibold capitalize">
          {brand_name || "Brand"}
        </CardTitle>
      </CardContent>
    </Card>
  );
});
