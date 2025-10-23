import { Skeleton, Card, CardContent, CardHeader } from "@/components/ui"
import { cn } from "@/lib/utils";
const Loading = (
    {
        className,
        count
    }: {
        className?: string,
        count: number,
    }) => (
    <div className={cn(className, "grid grid-cols-1 gap-3")}>
        {
            Array.from({ length: count }).map((_, index) => (
                <Card layout="horizontal" key={index} className=" justify-start h-full w-full col-span-1">
                    <CardHeader className="p-3">
                        <Skeleton className="aspect-square h-full w-full rounded-t-lg " />
                    </CardHeader>
                    <CardContent className="p-3 w-full space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/3" />
                    </CardContent>
                </Card>
            ))
        }
    </div>
);

export default Loading