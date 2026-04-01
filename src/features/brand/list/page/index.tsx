"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import NotFound from "@/components/layout/notfound";
import BrandCard from "@/features/brand/components/BrandCard";
import LoadingSkeleton from "@/features/brand/components/BrandCarousel/LoadingSkeleton";
import { useFetchData } from "@/features/brand/list/all/hooks";
import { useTranslation } from "@/lib/hooks";

export default function BrandListPage() {
  const { brands, loading, error } = useFetchData();
  const { t } = useTranslation();

  return (
    <Card className="container mx-auto rounded-none border-none px-3 shadow-none md:px-6">
      <CardHeader className="px-0">
        <CardTitle>{t("all_brands")}</CardTitle>
        <CardDescription>{t("all_brands_desc")}</CardDescription>
      </CardHeader>

      <CardContent className="px-0">
        {loading ? (
          <LoadingSkeleton count={12} logoOnly={false} />
        ) : error ? (
          <NotFound message={error} />
        ) : !brands?.length ? (
          <NotFound />
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
            {brands.map((brand) => (
              <BrandCard key={brand._id || brand.brand_id} item={brand} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
