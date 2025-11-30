import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils";

const Loading = ({ className }: { className?: string }) => (
    <Skeleton className={cn(className, "rounded-md")} />
);

export default Loading