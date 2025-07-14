'use client'
import * as React from "react"

//components
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
    CarouselItem,
    Card
} from "@/components/ui"
import AdsCard from "./AdsCard"
import { NotFound } from "@/components/layout"
import LoadingPlaceholder from "./LoadingSkeleton"

//types
import { IImage } from "@/interfaces/banner"
import { cn } from "@/lib/utils";


interface AdsCarouselProps {
    data: IImage[];
    className?: string;
    isLoading?: boolean;
}


const AdsCarousel = ({ data, className, isLoading = false }: AdsCarouselProps) => {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    if (isLoading && (!data || data.length === 0)) {
        return <LoadingPlaceholder />;
    }

    if (!isLoading && (!data || data.length === 0)) {
        return <NotFound />;
    }
    return (
        <>
            <Card className="border-0 shadow-none md:px-6 px-3">
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full mx-auto "
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        {data.map((item) => (
                            <CarouselItem className={cn(" md:h-[400px] h-[270px] bg-slate-600", className)}>
                                <AdsCard key={item.title?.split("").join("-")} item={item} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className=" top-1/2 -translate-y-1/2 md:-left-5 -left-3 " />
                    <CarouselNext className=" top-1/2 -translate-y-1/2 md:-right-5 -right-3" />
                </Carousel>
            </Card>
        </>
    );
}

export default AdsCarousel;

