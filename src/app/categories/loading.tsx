import CategoryCardLoadingSkeleton from "@/features/category/components/CategoryCard/LoadingSkeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto my-5 space-y-5">
      <Card className="border-none shadow-none rounded-none px-3 md:px-6">
        <CardHeader className="px-0">
          <CardTitle>All Categories</CardTitle>
          <CardDescription>Loading categories...</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <CategoryCardLoadingSkeleton key={index} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
