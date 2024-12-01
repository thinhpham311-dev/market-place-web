import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react"

interface IListProps {
    title?: string,
    article?: string,
}
const List = ({ title, article }: IListProps) => {
    return (
        <div className="md:p-10 p-5 w-full">
            <Card className="border-0">
                <CardHeader className="flex-row justify-between items-center px-0 pb-5 space-x-3">
                    <div className="p-0 flex-1">
                        <CardTitle className="mb-3">{title}</CardTitle>
                        <CardDescription className="lg:w-1/3 w-full">{article}</CardDescription>
                    </div>
                    <Button variant="outline" size="icon" className="float-end">
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <Carousel className="w-full ">
                    <CarouselContent className="-ml-1">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <CarouselItem key={index} className="pl-1 md:basis-1/5  basis-1/3">
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <span className="text-2xl font-semibold">{index + 1}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className=" top-1/2 -translate-y-1/2 -left-3" />
                    <CarouselNext className=" top-1/2 -translate-y-1/2 -right-3" />
                </Carousel>
            </Card>
        </div>
    );
}


export default List