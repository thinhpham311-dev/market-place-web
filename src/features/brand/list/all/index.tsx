"use client";

import SectionSeeMoreButton from "@/components/shared/SectionSeeMoreButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BrandCarousel from "@/features/brand/components/BrandCarousel";
import { useFetchData } from "@/features/brand/list/all/hooks";
import { useTranslation } from "@/lib/hooks";

interface BrandListSectionProps {
  title?: string;
  description?: string;
  compact?: boolean;
}

export default function BrandListSection({
  title = "Featured Brands",
  description = "Explore top brands available across the marketplace.",
  compact = false,
}: BrandListSectionProps) {
  const { brands, loading, error } = useFetchData();
  const { t } = useTranslation();
  const resolvedTitle =
    title === "Featured Brands"
      ? t("featured_brands")
      : title === "Shop By Brand"
        ? t("shop_by_brand")
        : title;
  const resolvedDescription =
    description === "Explore top brands available across the marketplace."
      ? t("featured_brands_desc")
      : description === "Browse products from the most popular brands in our marketplace."
        ? t("shop_by_brand_desc")
      : description;

  return (
    <Card className="w-full border-none px-3 shadow-none md:px-6">
      <CardHeader className="mb-3 flex-row items-center space-x-3 px-0">
        <div className="flex-1">
          <CardTitle className="mb-3 capitalize">{resolvedTitle}</CardTitle>
          <CardDescription className="line-clamp-2">{resolvedDescription}</CardDescription>
        </div>
        <SectionSeeMoreButton href="/search" />
      </CardHeader>

      <CardContent className="px-0">
        <BrandCarousel
          countLoadItems={compact ? 6 : 8}
          data={brands}
          isLoading={loading}
          error={error}
        />
      </CardContent>
    </Card>
  );
}
