"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import FilterClearAll from "./FilterClearAll";
import { FaFilter } from "react-icons/fa";
import { useTranslation } from "@/lib/hooks";

const FilterWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardContent className="p-0">
        <CardHeader className="p-3">
          <CardTitle className="font-semibold text-lg inline-flex items-center gap-2">
            <FaFilter />
            <span>{t("filters")}</span>
          </CardTitle>
        </CardHeader>
        <hr />
        <CardContent className="p-3 space-y-5">{children}</CardContent>
        <hr />
        <CardFooter className="p-3">
          <FilterClearAll />
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default React.memo(FilterWrapper);
