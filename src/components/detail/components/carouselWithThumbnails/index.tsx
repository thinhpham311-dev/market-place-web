"use client"
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const images = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
];

const CarouselWithThumbnails = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleThumbnailClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="space-y-4">
            <div className="relative w-full overflow-hidden rounded-lg">
                <Image
                    src={images[activeIndex]}
                    alt={`Slide ${activeIndex + 1}`}
                    className="w-full h-auto rounded-lg"
                    width={500}
                    height={1000}
                />
            </div>

            {/* Thumbnails */}
            <div className="flex justify-center gap-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={cn(
                            "w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                            index === activeIndex
                                ? "border-blue-500 scale-105"
                                : "border-transparent"
                        )}
                    >
                        <Image
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="object-cover w-full h-full"
                            height={100}
                            width={100}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CarouselWithThumbnails;
