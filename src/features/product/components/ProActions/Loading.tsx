import { Card, CardContent, Skeleton } from "@/components/ui";


const LoadingSkeleton = () => {
    return (
        <Card className="border-none shadow-none">
            <CardContent className="p-3 flex gap-3">
                <Skeleton className="h-[50px] w-[150px] rounded-xl " />
                <Skeleton className="h-[50px] w-[150px] rounded-xl " />
            </CardContent>
        </Card>
    );
};

export default LoadingSkeleton;
