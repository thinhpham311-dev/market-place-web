import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/utils/styles";
const LoadingSkeleton = (
    {
        className
    }: {
        className?: string,
    }) => (
    <div className={cn(className, "grid grid-cols-1 gap-3")}>
        <Card layout="horizontal" className=" justify-start h-full w-full col-span-1">
            <CardContent className="p-3 w-full space-y-2">
                <Skeleton className="h-4 w-full" />
            </CardContent>
        </Card>
    </div>
);

export default LoadingSkeleton