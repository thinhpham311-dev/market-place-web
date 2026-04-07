"use client";

import ProductListSection from "@/features/product/components/ProductListSection";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShopVoucherSectionLoading() {
  return (
    <ProductListSection
      title={<Skeleton className="h-7 w-48" />}
      description={<Skeleton className="h-4 w-72 max-w-full" />}
    >
      <div className="grid gap-3 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="border-stone-200 shadow-none">
            <CardContent className="space-y-3 p-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-7 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    </ProductListSection>
  );
}
