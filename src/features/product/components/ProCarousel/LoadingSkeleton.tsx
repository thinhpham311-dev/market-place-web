import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/utils/styles";
const LoadingSkeleton = (
    {
        className,
        count
    }: {
        className?: string,
        count: number,
    }) => (
    <div className={cn(className, "grid grid-cols-6 gap-x-3")}>
        {
            Array.from({ length: count }).map((_, index) => (
                <Card key={index} className="flex flex-col justify-start h-full w-full col-span-1">
                    <Skeleton className="aspect-square rounded-t-lg " />
                    <CardContent className="p-3 w-full">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                </Card>
            ))
        }
    </div>
);

export default LoadingSkeleton