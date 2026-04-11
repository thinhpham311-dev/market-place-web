import { Suspense } from "react";
import { notFound } from "next/navigation";
import CatByCategoryId from "@/features/category/list/by-category-id";
import BrandListSection from "@/features/brand/list/all";
import ProListByCategoryId from "@/features/product/list/by-category-id";
import ProductCardGridSkeleton from "@/components/shared/feedback/ProductCardGridSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PageProps {
  params: { segments?: string[] };
}

function ProListSkeleton() {
  return (
    <Card className="border-none px-3 shadow-none md:px-6">
      <CardContent className="grid items-stretch gap-3 px-0 md:grid-cols-12">
        <div className="space-y-3 md:col-span-3 lg:col-span-2">
          <Skeleton className="h-[400px] w-full" />
        </div>
        <div className="flex h-full flex-col md:col-span-9 lg:col-span-10">
          <Card className="flex h-full flex-col">
            <CardContent className="p-3">
              <ProductCardGridSkeleton
                count={20}
                className="lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2"
              />
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Page({ params }: PageProps) {
  const fullSlug = params?.segments?.join("/") || "";

  const match = fullSlug.match(/(.*)-cat\.([\w.]+)/);

  if (!match) {
    notFound();
  }

  // ✅ Lấy các id
  const ids = match![2].split(".");
  const lastId = ids.at(-1);

  if (!lastId) {
    notFound();
  }

  return (
    <div className="space-y-5 container mx-auto my-5">
      <CatByCategoryId ids={ids} />
      <Suspense fallback={<ProListSkeleton />}>
        <ProListByCategoryId lastId={lastId} />
      </Suspense>
      <BrandListSection titleKey="shop_by_brand" descriptionKey="shop_by_brand_desc" compact />
    </div>
  );
}
