import { Skeleton } from "@/components/ui/skeleton";

export default function HeaderLoadingSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto px-6">
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="hidden h-7 w-32 rounded-md md:block" />
          </div>

          <div className="hidden flex-1 items-center md:flex">
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        </div>
      </div>
    </header>
  );
}
