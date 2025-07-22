import { Skeleton } from "@/components/ui";

interface LoadingPlaceholderProps {
    count?: number; // default to 7
}

const LoadingPlaceholder = ({ count = 6 }: LoadingPlaceholderProps) => {
    return (
        <div className="grid grid-cols-5 gap-x-3 my-4">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px]  rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LoadingPlaceholder;
