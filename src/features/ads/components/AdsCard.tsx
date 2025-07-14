'use client'
import * as React from "react"
import Image from "next/image"

//types
import { IImage } from "@/interfaces/banner"


interface IItemProps {
    item: IImage
}

const AdsCard = ({ item: {
    image
} }: IItemProps) => {
    return (
        <Image src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png"} overrideSrc={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png"} alt="" width={200} height={200} className="w-full h-full object-contain rounded-t-sm" />
    );
}

export default AdsCard