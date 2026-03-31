"use client";

import React from "react";
import FilterSection from "./FilterSection";
import FilterCheckBox from "./FilterCheckBox";
import type { Filter } from "../types";
import { useFilterContext } from "../hooks";
import { useTranslation } from "@/lib/hooks";

interface FilterRendererProps {
  filter: Filter;
}

const FilterRenderer: React.FC<FilterRendererProps> = ({ filter }) => {
  const { t } = useTranslation();
  switch (filter.type) {
    case "checkbox":
      return (
        <FilterCheckBox filterKey={filter.key} options={filter.items} initialItemsToShow={5} />
      );

    default:
      return (
        <p className="text-gray-500">
          {t("not_supported_filter_type")}: {filter.type ?? "unknown"}
        </p>
      );
  }
};

const FilterOptions = () => {
  const { t } = useTranslation();
  const { data } = useFilterContext();
  return (
    <>
      {data?.map((filter: Filter) => (
        <FilterSection
          key={filter.key}
          title={filter.labelKey ? t(filter.labelKey) : filter.label}
          filterKey={filter.key}
        >
          <FilterRenderer filter={filter} />
        </FilterSection>
      ))}
    </>
  );
};

export default React.memo(FilterOptions);
