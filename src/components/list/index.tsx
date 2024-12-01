import * as React from "react"
import { Suspense } from "react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react"
import SkeletonItem from "./itemSkeleton"

const ItemComponent = React.lazy(() => import('./item'));

interface IListProps {
    title?: string | React.ReactNode | undefined,
    article?: string | React.ReactNode | undefined,
    isCarousel?: boolean,
    isViewMore?: boolean
}
const List = ({ title, article, isCarousel, isViewMore }: IListProps) => {
    return (
        <div className="md:p-10 p-5 w-full">
            <Card className="border-0">
                <CardHeader className="flex-row  items-center px-2  space-x-3 mb-3">
                    <div className="p-0 flex-1">
                        <CardTitle className="mb-3 capitalize">{title}</CardTitle>
                        <CardDescription className="normal-case">{article}</CardDescription>
                    </div>
                    {
                        isViewMore && <Button variant="outline" size="icon" className="float-end">
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    }
                </CardHeader>
                {isCarousel ? <Carousel className="w-full ">
                    <CarouselContent className="-ml-1">
                        {Array.from({ length: 19 }).map((_, index) => (
                            <CarouselItem key={index} className="px-2 lg:basis-1/6  md:basis-1/3 basis-1/2">
                                <ItemComponent title="product" promotionPrice="1000" price="1200" />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className=" top-1/2 -translate-y-1/2 -left-3" />
                    <CarouselNext className=" top-1/2 -translate-y-1/2 -right-3" />
                </Carousel>
                    :
                    <div className="grid grid-cols-6 w-full gap-3 px-2">
                        {Array.from({ length: 18 }).map((_, index) => (
                            <div key={index}>
                                <Suspense fallback={<SkeletonItem />}>
                                    <ItemComponent title="product" promotionPrice="1000" price="1200" />
                                </Suspense>
                            </div>
                        ))}
                        <div className="col-span-6 my-10">
                            <Button variant="outline" className="block mx-auto text-xs">See More...</Button>
                        </div>
                    </div>
                }

            </Card>
        </div>
    );
}


export default List