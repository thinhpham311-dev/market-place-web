"use client";

import React, { memo } from "react";

import { Card, CardContent } from "@/components/ui/card";
import OptionSelector from "@/features/common/option-selector";
import { PRO_DETAIL } from "@/features/product/constants";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import { useSpuDetailData } from "@/features/spu/hooks";
import { useTranslation } from "@/lib/hooks/use-translation";

const EMPTY_VARIANTS: any[] = [];
const DEFAULT_OPTION_IDX: number[] = [];

const ProVariantsSelector = () => {
  const { t } = useTranslation();
  const { spu: data, showLoading, showError, showNotFound, errorMessage } = useSpuDetailData();

  if (showLoading) {
    return <LoadingSkeleton />;
  }

  if (showError) {
    return <NotFound message={errorMessage} />;
  }

  if (showNotFound) {
    return <NotFound message={t("common_no_data_found")} />;
  }
  const variants = data?.product_variations ?? EMPTY_VARIANTS;

  return (
    <Card className="border-none shadow-none rounded-none">
      <CardContent className="p-3 flex flex-col gap-1">
        <OptionSelector
          layout="horizontal"
          storeKey={`${PRO_DETAIL}_${data?.product_id}`}
          initialValue={{
            initialOptions: variants,
            defaultOptionIdx: DEFAULT_OPTION_IDX,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default memo(ProVariantsSelector);
