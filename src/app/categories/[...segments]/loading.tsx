import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import ProductCardGridSkeleton from "@/components/shared/feedback/ProductCardGridSkeleton";

export default function Loading() {
  return (
    <div className="space-y-5 container mx-auto my-5">
      {/* Category buttons header skeleton */}
      <Card className="md:mx-6 mx-3 grid grid-cols-12 items-center bg-white border border-stone-100 p-2 rounded-md">
        <div className="py-2 px-3 lg:col-span-2 md:col-span-12 col-span-12">
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="p-0 lg:col-span-10 md:col-span-12 col-span-12 flex space-x-2">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      </Card>

      {/* Main product list layout skeleton */}
      <Card className="border-none px-3 shadow-none md:px-6">
        <CardContent className="grid items-stretch gap-3 px-0 md:grid-cols-12">
          {/* Filters Sidebar Skeleton */}
          <div className="space-y-3 md:col-span-3 lg:col-span-2">
            <Skeleton className="h-[400px] w-full" />
          </div>
          {/* Products Grid Skeleton */}
          <div className="flex h-full flex-col md:col-span-9 lg:col-span-10">
            <Card className="flex h-full flex-col border border-stone-100">
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
    </div>
  );
}
