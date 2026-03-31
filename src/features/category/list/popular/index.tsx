"use client";
// Components
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import SectionSeeMoreButton from "@/components/shared/SectionSeeMoreButton";
import CategoryCarousel from "@/features/category/components/CategoryCarousel";
import { useTranslation } from "@/lib/hooks";

// hooks
import { useFetchData } from "@/features/category/list/popular/hooks";

const CatPopularList: React.FC = () => {
  const { categories, loading, error } = useFetchData();
  const { t } = useTranslation();

  return (
    <Card className="border-none shadow-nonee rounded-none md:px-6 px-3 w-full">
      <CardHeader className="flex-row items-center px-0 space-x-3 mb-3">
        <div className="flex-1">
          <CardTitle className="mb-3 capitalize">{t("popular_categories")}</CardTitle>
          <CardDescription className="md:line-clamp-2 line-clamp-1">
            {t("popular_categories_desc")}
          </CardDescription>
        </div>
        <SectionSeeMoreButton href="/categories" />
      </CardHeader>

      <CardContent className="px-0">
        <CategoryCarousel
          countLoadItems={6}
          data={categories}
          isLoading={loading}
          error={error}
          className="lg:basis-1/6 md:basis-1/4 basis-1/3"
        />
      </CardContent>
    </Card>
  );
};

export default CatPopularList;
