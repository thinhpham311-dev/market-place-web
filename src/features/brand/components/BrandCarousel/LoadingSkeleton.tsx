import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-3xl border bg-background p-4">
          <Skeleton className="mx-auto h-20 w-20 rounded-full" />
          <Skeleton className="mt-4 h-4 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
}
