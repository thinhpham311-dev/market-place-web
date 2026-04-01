import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Card className="rounded-none border-none px-3 shadow-none md:px-6">
      <CardHeader className="space-y-3 px-0">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 px-0 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="aspect-square rounded-3xl" />
        ))}
      </CardContent>
    </Card>
  );
}
