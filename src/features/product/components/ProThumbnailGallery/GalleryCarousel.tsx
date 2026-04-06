"use client";
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel";
import ProImage from "../ProImage";
import { cn } from "@/utils/styles";

interface GalleryCarouselProps {
  data: string[];
  className?: string;
  onSetApi?: (api: CarouselApi) => void;
  current?: number;
  onNavigate?: (index: number) => void;
  onImageClick?: (index: number) => void;
}

const GalleryCarousel = ({
  data,
  className,
  onSetApi,
  current,
  onNavigate,
  onImageClick,
}: GalleryCarouselProps) => {
  return (
    <Carousel setApi={onSetApi}>
      <CarouselContent className="-ml-2">
        {data.map((image, i) => (
          <CarouselItem
            key={i}
            className={cn("relative w-full cursor-pointer pl-2 grid place-items-center", className)}
            onMouseEnter={() => onNavigate?.(i)}
            onClick={() => onImageClick?.(i)}
          >
            <div className={cn("w-full h-full ", current === i ? "border-2 border-blue-600" : "")}>
              <ProImage index={i} image={image} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default React.memo(GalleryCarousel);
