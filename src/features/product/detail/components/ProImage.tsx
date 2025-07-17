"use client";
import Image from "next/image";

interface CarouselItemsProps {
    index: number;
    image: string;
}

export default function ProImage({
    index,
    image,
}: CarouselItemsProps) {
    return (
        <>
            <Image
                src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png"}
                alt={`Carousel  Image ${index + 1}`}
                height={500}
                width={500}
                loading="lazy"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
        </>
    );
}
