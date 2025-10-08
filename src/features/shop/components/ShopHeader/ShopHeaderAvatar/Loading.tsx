import { Skeleton } from "@/components/ui";

const LoadingSkeleton = () => {
    return (
        <Skeleton
            className="w-16 h-16 md:w-20 md:h-20 rounded-xl col-span-5 my-3"
        />
    );
};

export default LoadingSkeleton;
