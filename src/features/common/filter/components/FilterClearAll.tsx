"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useFilterContext } from "@/features/common/filter/hooks";

const FilterClearAll = () => {
  const { handleResetAllFilters } = useFilterContext();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleResetAllFilters}
      className="text-primary hover:text-primary w-full"
    >
      Clear all
    </Button>
  );
};

export default FilterClearAll;
