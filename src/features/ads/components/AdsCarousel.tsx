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
} from "@/components/ui/carousel"
import AdsCard from "./AdsCard"
import { NotFound } from "@/components/layout"
import LoadingPlaceholder from "./LoadingSkeleton"

//types
import { IAds } from "@/features/ads/types"
import { cn } from "@/utils/styles";


interface AdsCarouselProps {
    data: IAds[];
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
            <Carousel
                plugins={[plugin.current]}
                className="w-full mx-auto "
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {data.map((item) => (
                        <CarouselItem key={item.title?.split("").join("-")} className={cn(" md:h-[400px] h-[270px] bg-slate-600", className)}>
                            <AdsCard item={item} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className=" top-1/2 -translate-y-1/2 md:-left-5 -left-3 " />
                <CarouselNext className=" top-1/2 -translate-y-1/2 md:-right-5 -right-3" />
            </Carousel>
        </>
    );
}

export default AdsCarousel;

