"use client"
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const images = [
    "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg",
    "https://images2.thanhnien.vn/528068263637045248/2024/1/25/c3c8177f2e6142e8c4885dbff89eb92a-65a11aeea03da880-1706156293184503262817.jpg",
    "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg",
];

export const SliderWithThumbnails = () => {
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
