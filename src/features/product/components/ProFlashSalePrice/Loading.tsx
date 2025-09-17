import { Card, CardContent, Skeleton } from "@/components/ui";


const LoadingSkeleton = () => {
    return (
        <Card className="border-none shadow-none">
            <CardContent className="p-0 flex gap-3">
                <Skeleton className="h-[55px] w-full rounded-xl " />
            </CardContent>
        </Card>
    );
};

export default LoadingSkeleton;
