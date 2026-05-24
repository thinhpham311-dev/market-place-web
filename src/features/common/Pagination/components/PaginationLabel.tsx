"use client";

import React from "react";
import { PaginationItem } from "@/components/ui/pagination";
import { Label } from "@/components/ui/label";
import { usePaginationContext } from "@/features/common/pagination/hooks";

export default function PaginationLabel() {
  const { currentPage, totalItems, limit, isShowLabel } = usePaginationContext();

  const hasItems = totalItems > 0;
  const startIndex = hasItems ? (currentPage - 1) * limit + 1 : 0;
  const endIndex = hasItems ? Math.min(currentPage * limit, totalItems) : 0;

  if (isShowLabel) {
    return (
      <PaginationItem className="flex flex-1">
        <Label>
          Showing {startIndex}–{endIndex} of {totalItems}
        </Label>
      </PaginationItem>
    );
  }
}
