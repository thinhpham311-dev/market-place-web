"use client";
import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselApi,
} from "@/components/ui";
import ProImage from "../ProImage";
import { cn } from "@/lib/utils";

interface GalleryCarouselProps {
    data: string[];
    className?: string;
    onSetApi?: (api: CarouselApi) => void;
    current?: number;
    onNavigate?: (index: number) => void;
}

const GalleryCarousel = ({
    data,
    className,
    onSetApi,
    current,
    onNavigate,
}: GalleryCarouselProps) => {
    const handleImageClick = (index: number) => {
        onNavigate?.(index);
    };


    return (
        <Carousel setApi={onSetApi}>
            <CarouselContent className="-ml-2">
                {data.map((image, i) => (
                    <CarouselItem
                        key={i}
                        className={cn(
                            "relative aspect-square w-full cursor-pointer pl-2",
                            className
                        )}
                        onMouseEnter={() => handleImageClick(i)}
                        onClick={() => handleImageClick(i)}
                    >
                        <div
                            className={cn(
                                "aspect-square",
                                current === i
                                    ? "border-2 border-blue-600"
                                    : ""
                            )}
                        >
                            <ProImage index={i} image={image} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};

export default React.memo(GalleryCarousel);
