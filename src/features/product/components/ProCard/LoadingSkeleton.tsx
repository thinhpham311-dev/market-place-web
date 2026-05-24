"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/styles";

interface LoadingSkeletonProps {
  orientation?: "vertical" | "horizontal";
}

const LoadingSkeleton = ({ orientation = "vertical" }: LoadingSkeletonProps) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <Card
      className={cn(
        "h-full w-full col-span-1",
        isHorizontal ? "flex flex-row items-stretch overflow-hidden" : "flex flex-col justify-start",
      )}
    >
      <Skeleton className={cn(isHorizontal ? "h-full w-24 shrink-0 rounded-l-lg" : "aspect-square rounded-t-lg")} />
      <CardContent className={cn("w-full p-3 space-y-1", isHorizontal && "flex min-w-0 flex-col justify-center")}>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  );
};

export default LoadingSkeleton;
