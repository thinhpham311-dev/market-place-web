import { Skeleton } from "@/components/ui/skeleton"

const LoadingSkeleton = () => (
    <div className="flex flex-col gap-y-2">
        <Skeleton className="h-10 w-[120px]" />
        <Skeleton className="h-6 w-[120px]" />
    </div>
);

export default LoadingSkeleton