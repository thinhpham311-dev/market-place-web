
import * as React from "react"

//components
import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
    CarouselItem
} from "@/components/ui/molecules"
import CardItem from "./Item"

//types
import { IProduct } from "@/types/product"

import { cn } from "@/lib/utils"


type ICarouselListProps = {
    data: Array<IProduct>,
    itemsPerPage?: number;
    className?: string
}

export const CarouselList = ({ data, itemsPerPage = 12, className }: ICarouselListProps) => {

    return (
        <Carousel>
            <CarouselContent className="-ml-2">
                {data?.slice(0, itemsPerPage).map((item, index) => {
                    if (item.quantity > 0) {
                        return (
                            <CarouselItem key={index} className={cn("pl-2 ", className)}>
                                <CardItem item={item} />
                            </CarouselItem>
                        )
                    }
                })}
            </CarouselContent>
            <CarouselPrevious className=" top-1/2 -translate-y-1/2 md:-left-5 -left-3 " />
            <CarouselNext className=" top-1/2 -translate-y-1/2 md:-right-5 -right-3" />
        </Carousel >
    );
}
