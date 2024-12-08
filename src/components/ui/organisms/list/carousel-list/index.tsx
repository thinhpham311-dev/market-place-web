
import * as React from "react"

//components
import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/molecules"
import CarouselListItem from "./Item"

//types
import { IProduct } from "@/types/product"

type ICarouselListProps = {
    data: Array<IProduct>,
    itemsPerPage?: number;
}

export const CarouselList = ({ data, itemsPerPage = 12 }: ICarouselListProps) => {

    return (
        <Carousel>
            <CarouselContent className="-ml-2">
                {data?.slice(0, itemsPerPage).map((item, index) => (
                    <CarouselListItem key={index} item={item} />
                ))}
            </CarouselContent>
            <CarouselPrevious className=" top-1/2 -translate-y-1/2 md:-left-5 -left-3 " />
            <CarouselNext className=" top-1/2 -translate-y-1/2 md:-right-5 -right-3" />
        </Carousel >
    );
}
