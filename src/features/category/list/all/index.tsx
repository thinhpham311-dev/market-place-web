"use client";

import { useMemo } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/lib/hooks";
import CategoryCard from "@/features/category/components/CategoryCard";
import CategoryCardLoadingSkeleton from "@/features/category/components/CategoryCard/LoadingSkeleton";
import NotFound from "@/components/layout/notfound";
import { useFetchData } from "@/features/category/list/all/hooks";
import type { Category } from "@/features/category/types";

type CategoryGroup = {
  parent: Category;
  children: Category[];
};

export default function CategoryListPage() {
  const { categories, loading, error } = useFetchData();
  const { t } = useTranslation();
  const hasNoData = !categories?.length;
  const categoryGroups = useMemo<CategoryGroup[]>(() => {
    if (!categories?.length) {
      return [];
    }

    const parentCategories = categories.filter((category: Category) => !category.parent_id || category.level === 0);

    return parentCategories.map((parent: Category) => {
      const directChildren =
        parent.children?.length
          ? parent.children
          : categories.filter((category: Category) => category.parent_id === parent.category_id);

      return {
        parent,
        children: directChildren,
      };
    });
  }, [categories]);

  return (
    <Card className="border-none shadow-none rounded-none px-3 md:px-6">
      <CardHeader className="px-0">
        <CardTitle>{t("all_categories")}</CardTitle>
        <CardDescription>{t("all_categories_desc")}</CardDescription>
      </CardHeader>

      <CardContent className="px-0">
        {loading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <CategoryCardLoadingSkeleton key={index} />
            ))}
          </div>
        ) : hasNoData && error ? (
          <NotFound message={error} />
        ) : hasNoData ? (
          <NotFound />
        ) : (
          <div className="space-y-8">
            {categoryGroups.map(({ parent, children }) => {
              return (
                <section key={parent._id || parent.category_id} className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-semibold">{parent.category_name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {children.length > 0
                        ? `${children.length} ${t("category_subcategories_count")}`
                        : t("browse_this_category")}
                    </p>
                  </div>

                  {children.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
                      {children.map((category) => (
                        <CategoryCard key={category._id || category.category_id} item={category} />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
                      <CategoryCard item={parent} />
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
