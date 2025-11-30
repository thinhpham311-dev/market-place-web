import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";


const LoadingSkeleton = () => {
    return (
        <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0 flex gap-3">
                <Skeleton className="h-[30px] w-1/3 rounded-xl " />
            </CardContent>
        </Card>
    );
};

export default LoadingSkeleton;
