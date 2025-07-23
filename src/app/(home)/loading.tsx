import { Skeleton } from "@/components/ui";

export default function Loading() {
    return (
        <div className="space-y-6 p-4 container mx-auto">
            {/* Banner / Ads */}
            <Skeleton className="h-40 w-full rounded-lg" />

            {/* Category List */}
            <div className="space-y-3">
                <Skeleton className="h-6 w-32" />
                <div className="flex space-x-3">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className="h-20 w-20 rounded-md" />
                    ))}
                </div>
            </div>

            {/* Product Popular List */}
            <div className="space-y-3">
                <Skeleton className="h-6 w-44" />
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-32 w-full rounded-md" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

