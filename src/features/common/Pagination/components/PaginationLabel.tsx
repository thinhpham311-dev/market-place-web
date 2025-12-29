"use client";

import React from "react";
import { PaginationItem } from "@/components/ui/pagination";
import { Label } from "@/components/ui/label";

import { usePaginationContext } from "@/features/common/pagination/hooks";

export default function PaginationLabel() {
  const { currentPage, pages, totalItems, perPage, isShowLabel } = usePaginationContext();

  const current = currentPage ?? 1;
  const limit = perPage ?? (Array.isArray(pages) ? pages.length : 10); // ✅ fix here

  const startIndex = (current - 1) * limit + 1;
  const endIndex = Math.min(current * limit, totalItems ?? 0);

  if (isShowLabel) {
    return (
      <PaginationItem className="flex flex-1">
        <Label htmlFor="Showing">
          Showing {startIndex}–{endIndex} of {totalItems ?? 0}
        </Label>
      </PaginationItem>
    );
  }
}
