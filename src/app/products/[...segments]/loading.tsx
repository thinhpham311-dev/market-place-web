import { Skeleton } from "@/components/ui";

export default function Loading() {
    return (
        <div className="space-y-6 p-4 container mx-auto">
            <div className="p-4 md:flex md:space-x-6 space-y-6 md:space-y-0">
                {/* Product Image */}
                <Skeleton className="h-64 w-full md:w-1/3 rounded-lg" />
                <div className="grid grid-cols-6 gap-3">
                    {[...Array(12)].map((_, i) => (
                        <Skeleton key={i} className="h-10 rounded-md" />
                    ))}
                </div>
                {/* Product Info */}
                <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                </div>
            </div>
            <div className="grid grid-cols-5 gap-3">
                <div className="col-span-3 space-y-3">

                    {[...Array(12)].map((_, i) => (
                        <Skeleton key={i} className="h-10 rounded-md" />
                    ))}

                </div>
                <div className="col-span-2">
                    <div className="space-y-3">
                        {[...Array(15)].map((_, i) => (
                            <Skeleton key={i} className="h-24 rounded-md" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


