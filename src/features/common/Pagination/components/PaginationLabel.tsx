"use client";

import React from "react";
import { PaginationItem } from "@/components/ui/pagination";
import { Label } from "@/components/ui/label";
import { usePaginationContext } from "@/features/common/pagination/hooks";

export default function PaginationLabel() {
  const { currentPage, totalItems, perPage, isShowLabel } = usePaginationContext();

  const startIndex = (currentPage - 1) * perPage + 1;
  const endIndex = Math.min(currentPage * perPage, totalItems);
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
