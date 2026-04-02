"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function VoucherDetailLoading() {
  return (
    <div className="container mx-auto space-y-5 px-0 py-5">
      <Skeleton className="h-10 w-40" />
      <Card className="border-none shadow-sm">
        <CardHeader className="space-y-3">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </CardHeader>
        <CardContent className="grid gap-5 lg:grid-cols-3">
          <Skeleton className="h-64 rounded-3xl lg:col-span-2" />
          <Skeleton className="h-64 rounded-3xl" />
        </CardContent>
      </Card>
    </div>
  );
}
