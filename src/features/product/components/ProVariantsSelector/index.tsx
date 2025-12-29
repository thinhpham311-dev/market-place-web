"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import OptionSelector from "@/features/common/option-selector";
import { PRO_DETAIL } from "@/features/product/constants";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import { useSpuContext } from "@/features/spu/hooks";

const ProVariantsSelector = () => {
  const { spu: data, loading: isLoading, error } = useSpuContext();

  const hasNoData = !data || Object.keys(data).length === 0;
  if (isLoading && hasNoData) {
    return <LoadingSkeleton />;
  }

  if (!isLoading && hasNoData && error) {
    return <NotFound message={error || "Something went wrong."} />;
  }

  if (!isLoading && hasNoData) {
    return <NotFound />;
  }
  const variants = data?.product_variations ?? [];

  return (
    <Card className="border-none shadow-none rounded-none">
      <CardContent className="p-3 flex flex-col gap-1">
        <OptionSelector
          layout="horizontal"
          storeKey={`${PRO_DETAIL}_${data?.product_id}`}
          initialValue={{
            initialOptions: variants,
            defaultOptionIdx: [],
          }}
          loading={isLoading}
          error={error}
        />
      </CardContent>
    </Card>
  );
};

export default ProVariantsSelector;
