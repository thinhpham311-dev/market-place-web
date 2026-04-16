"use client";

import { Card,CardHeader, CardContent } from "@/components/ui/card";
import {  Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">
    <Card className="grid grid-cols-5 grid-rows-2 items-center gap-x-3 p-3 md:grid-cols-4">
        <CardHeader className="col-span-2 row-span-2 p-0 md:col-span-1">
          <Skeleton className="h-[80px] w-[80px] rounded-md" />
        </CardHeader>
        <CardContent className="col-span-3 row-span-3 space-y-3 p-0 md:col-span-3">
          <div className="grid grid-cols-6 grid-rows-3 items-center gap-2">
            <Skeleton className="col-span-6 h-5 rounded-md" />
            <Skeleton className="col-span-3 h-4 rounded-md" />
            <Skeleton className="col-span-3 h-4 rounded-md" />
            <Skeleton className="col-span-2 col-start-4 row-span-2 row-end-4 h-9 rounded-md" />
            <Skeleton className="col-start-6 row-span-2 row-end-4 h-6 w-6 rounded-md justify-self-end" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
