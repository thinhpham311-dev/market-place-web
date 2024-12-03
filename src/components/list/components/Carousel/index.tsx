
import * as React from "react"

//components
import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Item from "./Item"

//icons
import { ArrowRight } from "lucide-react"

//types
import { IProduct } from "@/types/product"

interface ICarouselListProps {
    title?: string,
    article?: string,
    data: Array<IProduct>
}

const CarouselList = ({ title, article, data }: ICarouselListProps) => {
    return (
        <div className="md:px-12 px-6">
            <Card className="border-0">
                <CardHeader className="flex-row  items-center px-0 space-x-3 mb-3">
                    <div className="p-0 flex-1">
                        <CardTitle className="mb-3 capitalize">{title}</CardTitle>
                        <CardDescription className="normal-case">{article}</CardDescription>
                    </div>
                    <Button variant="outline" size="icon" className="float-end">
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="px-0">
                    <Carousel>
                        <CarouselContent className="-ml-2">
                            {data?.map((item, index) => (
                                <Item key={index} item={item} />
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className=" top-1/2 -translate-y-1/2 md:-left-5 -left-3 " />
                        <CarouselNext className=" top-1/2 -translate-y-1/2 md:-right-5 -right-3" />
                    </Carousel >
                </CardContent>
            </Card>
        </div>
    );
}
export default CarouselList