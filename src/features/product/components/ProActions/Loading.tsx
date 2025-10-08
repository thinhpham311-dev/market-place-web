import { Card, CardContent, Skeleton } from "@/components/ui";


const LoadingSkeleton = () => {
    return (
        <Card className="border-none shadow-none lg:static md:fixed sm:fixed fixed bottom-0 left-0 z-50 w-full">
            <CardContent className="container mx-auto py-3 px-6 flex gap-3">
                <Skeleton className="h-[50px] w-[150px] rounded-xl " />
                <Skeleton className="h-[50px] w-[150px] rounded-xl " />
            </CardContent>
        </Card>
    );
};

export default LoadingSkeleton;
