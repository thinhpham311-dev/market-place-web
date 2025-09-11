import { Skeleton } from "@/components/ui";


const LoadingSkeleton = () => {
    return (
        <div className="grid grid-cols-5 gap-5 my-4">
            <Skeleton className="h-[50px] rounded-xl col-span-5 my-3" />
            <div className="grid grid-cols-5 gap-5 col-span-5">
                <Skeleton className="h-[550px] col-span-2 rounded-xl" />
                <div className="space-y-2 col-span-3">
                    <Skeleton className="h-6 rounded-md w-full" />
                    <Skeleton className="h-6 rounded-md w-full" />
                    <Skeleton className="h-6 rounded-md w-full" />
                    <Skeleton className="h-6 rounded-md w-full" />
                    <Skeleton className="h-6 rounded-md w-full" />
                    <Skeleton className="h-6 rounded-md w-1/2" />
                </div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;
