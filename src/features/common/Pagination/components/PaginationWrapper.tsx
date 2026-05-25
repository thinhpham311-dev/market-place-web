"use client";

import React from "react";
import { Pagination, PaginationContent } from "@/components/ui/pagination";

const PaginationWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Pagination>
      <PaginationContent>{children}</PaginationContent>
    </Pagination>
  );
};

export default React.memo(PaginationWrapper);
