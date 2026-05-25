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
  lastId?: string;
  isLoading?: boolean;
  className?: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  category,
  isActive,
  lastId,
  isLoading,
  className,
}) => {
  const router = useRouter();
  const hasValidCategory = Boolean(category && lastId);
  const { category_id, category_slug, category_name, ancestors } = category ?? {};
  const ancestorsPath =
    Array.isArray(ancestors) && ancestors.length > 0 ? `${ancestors.join(".")}.` : "";
  const href = hasValidCategory
    ? `/categories/${category_slug}-cat.${ancestorsPath}${category_id}`
    : "";
  const isCurrent = hasValidCategory ? category_id === lastId : false;

  React.useEffect(() => {
    if (!href || isCurrent) {
      return;
    }

    router.prefetch(href);
  }, [href, isCurrent, router]);

  if (!lastId) return null;

  if (isLoading) {
    return <LoadingSkeleton className="h-10" />;
  }

  if (!category) {
    return <NotFound />;
  }

  const handlePrefetch = () => {
    if (!isCurrent) {
      router.prefetch(href);
    }
  };

  return (
    <Button
      asChild
      className={cn(
        className,
        " line-clamp-1 text-md",
        isActive ? "font-bold underline text-primary" : "text-muted-foreground",
      )}
      variant="outline"
      disabled={isCurrent}
    >
      <Link
        href={href}
        prefetch={!isCurrent}
        onMouseEnter={handlePrefetch}
        onFocus={handlePrefetch}
      >
        {category_name}
      </Link>
    </Button>
  );
};

export default React.memo(CategoryButton);
