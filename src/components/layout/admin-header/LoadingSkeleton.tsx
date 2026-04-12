import { Skeleton } from "@/components/ui/skeleton";

export default function AdminHeaderLoadingSkeleton() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between gap-4 bg-background px-6 py-1">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-28 rounded-md" />
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-5 w-24 rounded-md" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </div>
    </header>
  );
}
