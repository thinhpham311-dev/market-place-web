import ProductCardGridSkeleton from "@/components/shared/feedback/ProductCardGridSkeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto my-5 space-y-5">
      <Card className="z-10 mx-3 grid grid-cols-12 items-center bg-white md:mx-6">
        <CardHeader className="col-span-12 px-3 py-2 lg:col-span-2 md:col-span-12">
          <Skeleton className="h-7 w-40" />
        </CardHeader>
        <CardContent className="col-span-12 p-3 lg:col-span-10 md:col-span-12">
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-9 w-28 rounded-full" />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-none px-3 shadow-none md:px-6">
        <CardContent className="grid items-stretch gap-3 px-0 md:grid-cols-12">
          <div className="space-y-3 md:col-span-3 lg:col-span-2">
            <Skeleton className="h-[400px] w-full" />
          </div>

          <div className="flex h-full flex-col md:col-span-9 lg:col-span-10">
            <Card className="flex h-full flex-col">
              <CardHeader className="p-3">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <Skeleton className="h-10 w-full md:max-w-sm" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-3">
                <ProductCardGridSkeleton
                  count={20}
                  className="grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5"
                />
              </CardContent>

              <div className="mt-auto border-t p-3">
                <div className="flex justify-center">
                  <Skeleton className="h-10 w-72" />
                </div>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
