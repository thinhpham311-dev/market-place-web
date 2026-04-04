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
    <Card className="relative w-full overflow-hidden border border-amber-100/70 bg-gradient-to-br from-amber-50 via-orange-50/70 to-rose-50/60 px-3 shadow-none dark:border-amber-900/40 dark:from-stone-950 dark:via-stone-900 dark:to-orange-950/30 md:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.12),_transparent_55%)]" />
      <div className="pointer-events-none absolute -right-8 bottom-0 h-28 w-28 rounded-full bg-orange-200/30 blur-3xl dark:bg-orange-700/15" />
      {!compact ? (
        <CardHeader className="sr-only mb-0 p-0">
          <div className="flex-1">
            <CardTitle className="capitalize">{resolvedTitle}</CardTitle>
            <CardDescription className="mt-3 line-clamp-2">{resolvedDescription}</CardDescription>
          </div>
        </CardHeader>
      ) : null}

      <CardContent className="relative space-y-5 px-0 py-5 md:py-6">
        <BrandCarousel
          countLoadItems={compact ? 6 : 8}
          data={brands}
          isLoading={loading}
          error={error}
          logoOnly
        />
        <div className="flex justify-center">
          <SectionSeeMoreButton href="/brands" />
        </div>
      </CardContent>
    </Card>
  );
}
