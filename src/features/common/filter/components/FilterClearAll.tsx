"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useFilterContext } from "@/features/common/filter/hooks";
import { useTranslation } from "@/lib/hooks";

const FilterClearAll = () => {
  const { handleResetAllFilters } = useFilterContext();
  const { t } = useTranslation();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleResetAllFilters}
      className="text-primary hover:text-primary w-full"
    >
      {t("clear_all")}
    </Button>
  );
};

export default FilterClearAll;
