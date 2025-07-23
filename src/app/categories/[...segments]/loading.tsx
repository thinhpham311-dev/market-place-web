import { Skeleton } from "@/components/ui";

export default function Loading() {
    return (
        <div className="space-y-6 p-4 container mx-auto">
            <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                    {[...Array(7)].map((_, i) => (
                        <Skeleton key={i} className="h-12 rounded-md" />
                    ))}
                </div>
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-2">
                        <div className=" space-y-6">
                            <Skeleton className="h-12 rounded-md" />
                        </div>
                        <div className=" space-y-3">
                            {[...Array(12)].map((_, i) => (
                                <Skeleton key={i} className="h-10 rounded-md" />
                            ))}
                        </div>
                    </div>
                    <div className="col-span-10">
                        <div className=" grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                            {[...Array(15)].map((_, i) => (
                                <Skeleton key={i} className="h-24 rounded-md" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

