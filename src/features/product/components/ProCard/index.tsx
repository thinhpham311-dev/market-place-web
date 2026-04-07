"use client";

import { memo } from "react";
import Link from "next/link";
import LoadingSkeleton from "./LoadingSkeleton";
import { Card, CardContent, CardTitle, CardDescription, CardImage } from "@/components/ui/card";
import { ISpuModel } from "@/models/spu";
import NotFound from "./NotFound";
import { formatToCurrency } from "@/utils/formats";

interface ISpuCardProps {
  item: ISpuModel;
  isLoading?: boolean;
}

const ProCard = ({ item, isLoading }: ISpuCardProps) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!item) {
    return <NotFound message="Product not found." />;
  }

  const { product_name, product_image, product_price, product_id, product_shop, product_slug } =
    item;

  const productHref = `/products/${product_slug}-i.${product_shop.shop_id}.${product_id}`;
  const formattedPrice = formatToCurrency(product_price);

  return (
    <Link href={productHref} className="block h-full">
      <Card className="flex flex-col justify-start h-full w-full col-span-1 overflow-hidden transition-shadow hover:shadow-md">
        <CardImage
          src={
            product_image ??
            "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png"
          }
          alt={product_name || "Product image"}
          className="aspect-square rounded-t-lg cursor-pointer"
        />
        <CardContent className="p-3 w-full">
          <CardTitle className="text-md capitalize line-clamp-2 cursor-pointer">
            <p>{product_name}</p>
          </CardTitle>
          <CardDescription className="space-x-3 mb-2 inline">
            {formattedPrice && <p>{formattedPrice}</p>}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default memo(ProCard);
