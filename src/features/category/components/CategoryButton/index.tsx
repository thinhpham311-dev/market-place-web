"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Category } from "@/features/category/types";
import { cn } from "@/utils/styles";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";

interface CategoryButtonProps {
  category: Category;
  isActive: boolean;
  isLoading?: boolean;
  className?: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  category,
  isActive,
  isLoading,
  className,
}) => {
  const router = useRouter();

  const { category_id, category_slug, category_name, ancestors } = category ?? {};
  const ancestorsPath = ancestors?.length ? `${ancestors.join(".")}.` : "";
  const href = category_id ? `/categories/${category_slug}-cat.${ancestorsPath}${category_id}` : "";

  React.useEffect(() => {
    if (href && !isActive) {
      router.prefetch(href);
    }
  }, [href, isActive, router]);

  if (isLoading) {
    return <LoadingSkeleton className="h-10" />;
  }

  if (!category) {
    return <NotFound />;
  }

  const handlePrefetch = () => {
    if (href && !isActive) {
      router.prefetch(href);
    }
  };

  return (
    <Button
      asChild
      className={cn(
        className,
        "line-clamp-1 text-md",
        isActive ? "font-bold underline text-primary" : "text-muted-foreground",
      )}
      variant="outline"
      disabled={isActive}
    >
      <Link
        href={href}
        prefetch={!isActive}
        onMouseEnter={handlePrefetch}
        onFocus={handlePrefetch}
      >
        {category_name}
      </Link>
    </Button>
  );
};

export default React.memo(CategoryButton);
