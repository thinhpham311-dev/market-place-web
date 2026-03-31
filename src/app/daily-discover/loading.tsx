import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto my-5 space-y-5 px-3 md:px-6">
      <Skeleton className="h-72 w-full rounded-[28px]" />
      <Skeleton className="h-[720px] w-full rounded-[28px]" />
    </div>
  );
}
