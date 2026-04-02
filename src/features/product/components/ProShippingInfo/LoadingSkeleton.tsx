import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="space-y-3 rounded-2xl border border-stone-200/80 bg-stone-50/60 p-4">
      <Skeleton className="h-5 w-28" />
      <Skeleton className="h-4 w-52" />
      <Skeleton className="h-4 w-44" />
      <Skeleton className="h-4 w-56" />
    </div>
  );
}
