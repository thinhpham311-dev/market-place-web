"use client";
import Image from "next/image";
import { cn } from "@/lib/utils"

interface CarouselItemsProps {
    index: number;
    image: string;
    className?: string;
}

export default function ProImage({
    index,
    image,
    className
}: CarouselItemsProps) {
    return (
        <>
            <Image
                src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png"}
                alt={`Carousel  Image ${index + 1}`}
                height={500}
                width={500}
                loading="lazy"
                className={cn(className)}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
        </>
    );
}
