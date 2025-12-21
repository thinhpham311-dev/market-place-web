import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/utils/styles";

const LoadingSkeleton = ({ className }: { className?: string }) => (
    <Skeleton className={cn(className, "rounded-md")} />
);

export default LoadingSkeleton