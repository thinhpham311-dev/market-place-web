import { Skeleton, CardTitle } from "@/components/ui"
const LoadingSkeleton = () => (
    <CardTitle className="text-lg flex flex-row space-x-2">
        <Skeleton className="h-7 w-6" />
        <div className="flex space-x-2">
            <Skeleton className="h-7 w-12" />
            <Skeleton className="h-7 w-6" />
        </div>
    </CardTitle>
);

export default LoadingSkeleton