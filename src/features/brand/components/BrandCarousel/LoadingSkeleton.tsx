import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton({
  count,
  logoOnly = false,
}: {
  count: number;
  logoOnly?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="aspect-square rounded-3xl border bg-background p-4"
        >
          {logoOnly ? (
            <Skeleton className="h-full w-full rounded-2xl" />
          ) : (
            <div className="flex h-full flex-col items-center justify-center">
              <Skeleton className="mx-auto aspect-square w-1/2 rounded-full" />
              <Skeleton className="mt-4 h-4 w-3/4 rounded-md" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
