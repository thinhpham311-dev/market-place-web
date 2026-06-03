"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3">
      <Card layout="horizontal" className=" justify-start h-full w-full col-span-1 gap-2">
        <CardHeader className="p-2">
          <Skeleton className="aspect-square h-full w-full rounded-t-lg " />
        </CardHeader>
        <CardContent className="p-2 w-full space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/3" />
        </CardContent>
      </Card>
    </div>
  );
}
