import React from "react";
import Image from "next/image";
import { cn } from "@/utils/styles";

interface CartItemImageProps {
  _w: number;
  _h: number;
  src?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png";

const CartItemImage: React.FC<CartItemImageProps> = ({
  src = DEFAULT_IMAGE,
  alt,
  imgClassName,
  _w,
  _h,
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      className={cn(imgClassName, "aspect-square")}
      priority
      width={_w}
      height={_h}
    />
  );
};

export default CartItemImage;
