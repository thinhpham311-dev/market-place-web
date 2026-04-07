"use client";

// ui
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// components
import CategoryButtons from "@/features/category/components/CategoryButtons";

import { useTranslation } from "@/lib/hooks";
import { useFetchData } from "@/features/category/list/by-category-id/hooks";

// icons
import { BiCategory } from "react-icons/bi";

const CatByCategoryId = ({ ids }: { ids: string[] }) => {
  const { t } = useTranslation();
  const {
    categories = [],
    loading = false,
    error = null,
    validIds,
  } = useFetchData({ ids });

  return (
    <Card className="md:mx-6 mx-3 grid grid-cols-12 items-center sticky left-0 top-[60px] bg-white z-10">
      <CardHeader className="py-2 px-3 lg:col-span-2 md:col-span-12 col-span-12">
        <CardTitle className="text-lg font-semibold inline-flex items-center space-x-1">
          <BiCategory />
          <span>{t("all_categories")}:</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 lg:col-span-10 md:col-span-12 col-span-12">
        <CategoryButtons isLoading={loading} data={categories} ids={validIds} error={error} />
      </CardContent>
    </Card>
  );
};

export default CatByCategoryId;
