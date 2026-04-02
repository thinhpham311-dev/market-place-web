import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto space-y-5 px-3 py-5 md:px-6">
      <Skeleton className="h-10 w-40" />
      <Skeleton className="h-72 w-full rounded-3xl" />
    </div>
  );
}
