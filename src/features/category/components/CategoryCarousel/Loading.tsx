import { Skeleton, Card, CardContent } from "@/components/ui"

const LoadingPlaceholder = (
    {
        count
    }: {
        count: number,
    }) => (
    <div className="grid grid-cols-6 gap-x-3">
        {
            Array.from({ length: count }).map((_, index) => (
                <Card key={index} className="rounded-3xl  aspect-square flex flex-col justify-center items-center ">
                    <CardContent className="p-0 rounded-full bg-white dark:bg-white  w-1/2 border  overflow-hidden">
                        <Skeleton className="w-full h-full aspect-square rounded-t-lg" />
                    </CardContent>
                    <CardContent className="p-3">
                        <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                </Card>)
            )
        }
    </div>
);

export default LoadingPlaceholder