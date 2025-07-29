import { Skeleton } from "@/components/ui"
import { cn } from "@/lib/utils";

const Loading = ({ className }: { className?: string }) => (
    <Skeleton className={cn(className, "rounded-md")} />
);

export default Loading