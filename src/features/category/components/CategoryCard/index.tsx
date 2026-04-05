"use client";

import * as React from "react";
import { memo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// components
import { Card, CardContent, CardTitle, CardImage } from "@/components/ui/card";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";

// types
import { Category } from "@/features/category/types";

interface IItemProps {
  item: Category;
  isLoading?: boolean;
}

const CategoryCard = ({ item, isLoading }: IItemProps) => {
  const router = useRouter();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!item) {
    return <NotFound />;
  }

  const { parent_id, category_id, category_slug, category_name, image } = item;
  const parentPath = parent_id ? `${parent_id}.` : "";
  const categoryHref = `/categories/${category_slug}-cat.${parentPath}${category_id}`;

  React.useEffect(() => {
    router.prefetch(categoryHref);
  }, [categoryHref, router]);

  const handlePrefetch = () => {
    router.prefetch(categoryHref);
  };

  return (
    <Link
      href={categoryHref}
      prefetch
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
      className="block"
    >
      <Card className="rounded-3xl aspect-square flex flex-col justify-center items-center transition-shadow hover:shadow-md">
        <CardContent className="p-0 rounded-full bg-white dark:bg-white w-1/2 border overflow-hidden">
          <CardImage
            src={
              image ??
              "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png"
            }
            alt={category_name}
            className="w-full h-full aspect-square rounded-t-lg cursor-pointer"
          />
        </CardContent>
        <CardContent className="p-3">
          <CardTitle className="text-md capitalize cursor-pointer text-black dark:text-white text-center xl:line-clamp-2 line-clamp-1">
            {category_name}
          </CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
};

export default memo(CategoryCard);
