import {
    Skeleton, Card, CardContent
} from "@/components/ui"
import { cn } from "@/lib/utils";

const LoadingPlaceholder = (
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

export default LoadingPlaceholder