import { Skeleton } from "@/components/ui"

const LoadingPlaceholder = () => (
    <div className="grid grid-cols-7 gap-x-3 py-2">
        <Skeleton className=" h-10 rounded-md" />
        <Skeleton className=" h-10 rounded-md" />
        <Skeleton className=" h-10 rounded-md" />
        <Skeleton className=" h-10 rounded-md" />
        <Skeleton className=" h-10 rounded-md" />
        <Skeleton className=" h-10 rounded-md" />
        <Skeleton className=" h-10 rounded-md" />
    </div>
);

export default LoadingPlaceholder