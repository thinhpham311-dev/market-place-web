"use client";

import type { ReactNode } from "react";

import SectionSeeMoreButton from "@/components/shared/SectionSeeMoreButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/utils/styles";

interface ProductListSectionProps {
  title: ReactNode;
  description: ReactNode;
  children: ReactNode;
  seeMoreHref?: string;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  titleWrapperClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export default function ProductListSection({
  title,
  description,
  children,
  seeMoreHref,
  className,
  headerClassName,
  contentClassName,
  titleWrapperClassName,
  titleClassName,
  descriptionClassName,
}: ProductListSectionProps) {
  return (
    <Card className={cn("grid grid-cols-12 border-none shadow-none", className)}>
      <CardHeader className={cn("col-span-12 mb-3 flex-row items-center", headerClassName)}>
        <div className={cn("flex-1 p-0", titleWrapperClassName)}>
          <CardTitle className={cn("mb-3 capitalize", titleClassName)}>{title}</CardTitle>
          <CardDescription className={cn("md:line-clamp-2 line-clamp-1", descriptionClassName)}>
            {description}
          </CardDescription>
        </div>

        {seeMoreHref ? <SectionSeeMoreButton href={seeMoreHref} /> : null}
      </CardHeader>

      <CardContent className={cn("col-span-12", contentClassName)}>{children}</CardContent>
    </Card>
  );
}
