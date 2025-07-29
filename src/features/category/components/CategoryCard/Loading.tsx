import { Skeleton, Card, CardContent } from "@/components/ui";


const Loading = () => {
    return (
        <Card className="rounded-3xl  aspect-square flex flex-col justify-center items-center ">
            <CardContent className="p-0 rounded-full bg-white dark:bg-white  w-1/2 border  overflow-hidden">
                <Skeleton className="w-full h-full aspect-square rounded-t-lg" />
            </CardContent>
            <CardContent className="p-3">
                <Skeleton className="h-4 w-1/2" />
            </CardContent>
        </Card>
    );
};

export default Loading;
