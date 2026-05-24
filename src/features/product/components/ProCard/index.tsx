"use client";

import { memo } from "react";
import Link from "next/link";
import LoadingSkeleton from "./LoadingSkeleton";
import { Card, CardContent, CardTitle, CardDescription, CardImage } from "@/components/ui/card";
import { ISpuModel } from "@/models/spu";
import NotFound from "./NotFound";
import { formatToCurrency } from "@/utils/formats";
import { cn } from "@/utils/styles";

interface ISpuCardProps {
  item: ISpuModel;
  isLoading?: boolean;
  orientation?: "vertical" | "horizontal";
}

const ProCard = ({ item, isLoading, orientation = "vertical" }: ISpuCardProps) => {
  if (isLoading) {
    return <LoadingSkeleton orientation={orientation} />;
  }

  if (!item) {
    return <NotFound message="Product not found." />;
  }

  const { product_name, product_image, product_price, product_id, product_shop, product_slug } =
    item;

  const productHref = `/products/${product_slug}-i.${product_shop.shop_id}.${product_id}`;
  const formattedPrice = formatToCurrency(product_price);
  const isHorizontal = orientation === "horizontal";

  return (
    <Link href={productHref} className="block h-full">
      <Card
        className={cn(
          "h-full w-full col-span-1 overflow-hidden transition-shadow hover:shadow-md",
          isHorizontal ? "flex flex-row items-stretch" : "flex flex-col justify-start",
        )}
      >
        <CardImage
          src={
            product_image ??
            "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png"
          }
          alt={product_name || "Product image"}
          className={cn(
            "cursor-pointer",
            isHorizontal ? "h-full w-24 shrink-0 rounded-l-lg object-cover" : "aspect-square rounded-t-lg",
          )}
        />
        <CardContent className={cn("w-full p-3", isHorizontal && "flex min-w-0 flex-col justify-center")}>
          <CardTitle className="text-md capitalize line-clamp-2 cursor-pointer">
            <p>{product_name}</p>
          </CardTitle>
          <CardDescription className="mb-2 inline space-x-3">
            {formattedPrice && <p>{formattedPrice}</p>}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default memo(ProCard);
