"use client";
import ProductListSection from "@/features/product/components/ProductListSection";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function LoadingSkeleton() {
  return (
        <ProductListSection
      title={<Skeleton className="h-7 w-48" />}
      description={<Skeleton className="h-4 w-72 max-w-full" />}
    >
      <div className="grid gap-3 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="overflow-hidden border-stone-200 shadow-none">
          <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-5">
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-2xl bg-orange-100" />
              <div className="space-y-2">
                <div className="h-5 w-48 rounded bg-stone-200" />
                <div className="h-4 w-72 max-w-full rounded bg-stone-100" />
                <div className="h-4 w-40 rounded bg-stone-100" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="ml-auto h-4 w-28 rounded bg-stone-100" />
              <div className="ml-auto h-7 w-24 rounded bg-orange-100" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
      </ProductListSection>
  );
}
