import { Skeleton } from "@/components/ui"
import { cn } from "@/lib/utils";

const LoadingPlaceholder = (
    {
        count,
        className
    }: {
        count: number,
        className?: string
    }) => (
    <div className="grid grid-cols-6 gap-x-3">
        {Array.from({ length: count }).map((_, index) => (
            <Skeleton key={index} className={cn(className, "rounded-md")} />
        ))}
    </div>
);

export default LoadingPlaceholder