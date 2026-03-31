"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FaRegCheckCircle } from "react-icons/fa";
import { useTranslation } from "@/lib/hooks";
import { useSortByContext } from "../hooks";
import type { Sort } from "../types";

interface SortOptionButtonProps {
  option: Sort;
}

const SortByOptionButton: React.FC<SortOptionButtonProps> = ({ option }) => {
  const { t } = useTranslation();
  const { setSortBy, sortBy } = useSortByContext();
  const { label, labelKey, value } = option;
  const isActive = sortBy?.value === value;

  return (
    <Button size="sm" className={`px-3 py-1 border rounded-md`} onClick={() => setSortBy(option)}>
      {isActive && <FaRegCheckCircle className=" inline" />}
      <span>{labelKey ? t(labelKey) : label}</span>
    </Button>
  );
};

export default SortByOptionButton;
