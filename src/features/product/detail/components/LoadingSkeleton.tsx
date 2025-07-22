import { Skeleton } from "@/components/ui";


const LoadingPlaceholder = () => {
    return (
        <div className="grid grid-cols-5 gap-5 my-4">
            <Skeleton className="h-[100px] rounded-xl col-span-5 my-3" />
            <div className="grid grid-cols-5 gap-5 col-span-5">
                <Skeleton className="h-[660px] col-span-2 rounded-xl" />
                <div className="space-y-2 col-span-3">
                    <Skeleton className="h-6 rounded-md w-full" />
                    <Skeleton className="h-6 rounded-md w-full" />
                    <Skeleton className="h-6 rounded-md w-full" />
                    <Skeleton className="h-6 rounded-md w-full" />
                    <Skeleton className="h-6 rounded-md w-full" />
                    <Skeleton className="h-6 rounded-md w-1/2" />
                </div>
            </div>
            <div className="col-span-3" >
                <Skeleton className="h-6 rounded-md w-full" />
                <Skeleton className="h-6 rounded-md w-full" />
                <Skeleton className="h-6 rounded-md w-full" />
                <Skeleton className="h-6 rounded-md w-full" />
                <Skeleton className="h-6 rounded-md w-full" />
                <Skeleton className="h-6 rounded-md w-1/2" />
            </div>
            <div className="col-span-2" >
                <Skeleton className="h-6 rounded-md w-full" />
                <Skeleton className="h-6 rounded-md w-full" />
                <Skeleton className="h-6 rounded-md w-full" />
                <Skeleton className="h-6 rounded-md w-full" />
                <Skeleton className="h-6 rounded-md w-full" />
                <Skeleton className="h-6 rounded-md w-1/2" />
            </div>
        </div>
    );
};

export default LoadingPlaceholder;
