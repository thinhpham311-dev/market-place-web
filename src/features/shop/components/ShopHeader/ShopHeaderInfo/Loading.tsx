import { Skeleton } from "@/components/ui";

const LoadingSkeleton = () => {
    return (
        <>
            {Array.from({ length: 3 }).map((_, idx) => (
                <Skeleton
                    key={idx}
                    className="h-[30px] rounded-xl col-span-5 my-3"
                />
            ))}
        </>
    );
};

export default LoadingSkeleton;
