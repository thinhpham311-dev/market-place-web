"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardImage, CardTitle } from "@/components/ui/card";

import type { Brand } from "@/features/brand/types";

interface BrandCardProps {
  item: Brand;
  logoOnly?: boolean;
}

export default memo(function BrandCard({ item, logoOnly = false }: BrandCardProps) {
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
      className="aspect-square flex flex-col items-center justify-center rounded-3xl"
    >
      <CardContent
        className={
          logoOnly
            ? "w-full overflow-hidden rounded-2xl border bg-white p-4 dark:bg-white"
            : "w-1/2 overflow-hidden rounded-full border bg-white p-0 dark:bg-white"
        }
      >
        <CardImage
          src={imageSrc}
          alt={brand_name || "Brand"}
          className="h-full w-full cursor-pointer object-contain"
        />
      </CardContent>
      {!logoOnly ? (
        <CardContent className="p-3">
          <CardTitle className="text-md line-clamp-1 cursor-pointer text-center capitalize text-black dark:text-white xl:line-clamp-2">
            {brand_name || "Brand"}
          </CardTitle>
        </CardContent>
      ) : null}
    </Card>
  );
});
