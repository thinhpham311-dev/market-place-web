import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/utils/styles";

type ProductCardGridSkeletonProps = {
  count: number;
  className?: string;
};

export default function ProductCardGridSkeleton({
  count,
  className,
}: ProductCardGridSkeletonProps) {
  return (
    <div className={cn("grid grid-cols-6 gap-x-3", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="col-span-1 flex h-full w-full flex-col justify-start">
          <Skeleton className="aspect-square rounded-t-lg" />
          <CardContent className="w-full p-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
