import {
    Card, CardContent
} from "@/components/ui/card"
import {
    Skeleton
} from "@/components/ui/skeleton"
import { cn } from "@/lib/utils";

const LoadingSkeleton = (
    {
        count,
        className
    }: {
        count: number,
        className?: string
    }) => (
    <Card className="border-none shadow-none">
        <CardContent className="p-3">
            <div className="flex w-max space-x-2">
                {Array.from({ length: count }).map((_, index) => (
                    <Skeleton key={index} className={cn(className, "rounded-md")} />
                ))}
            </div>
        </CardContent>
    </Card>
);

export default LoadingSkeleton