import { CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartTitleSkeleton() {
  return (
    <CardTitle className="flex flex-row space-x-2 text-lg">
      <Skeleton className="h-7 w-6" />
      <div className="flex space-x-2">
        <Skeleton className="h-7 w-12" />
        <Skeleton className="h-7 w-6" />
      </div>
    </CardTitle>
  );
}
