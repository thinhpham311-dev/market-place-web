"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <Card className="space-y-2 border-none shadow-none">
      <CardContent className="w-full p-0">
        <Skeleton className="aspect-square w-full rounded-2xl" />
      </CardContent>

      <CardFooter className="grid grid-cols-6 gap-2 p-0">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="aspect-square w-full rounded-xl" />
        ))}
      </CardFooter>
    </Card>
  );
}
