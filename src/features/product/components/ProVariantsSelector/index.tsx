"use client";

import * as React from "react";

import OptionSelector from "@/features/common/option-selector"
import { PRO_DETAIL } from "@/features/product/constants";
import LoadingSkeleton from "./Loading"
import NotFound from "./NotFound"
import { useSpuContext } from "@/features/spu/hooks"


const ProVariantsSelector = (() => {
    const { spu: data, loading: isLoading, error } = useSpuContext()

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
    const variants = data?.product_variations ?? []

    return (
        <OptionSelector
            layout="horizontal"
            reducerKey={PRO_DETAIL}
            storeKey={`${PRO_DETAIL}_${data?.product_id}`}
            initialOptions={variants}
            loading={isLoading}
            error={error}
        />
    );
});

export default ProVariantsSelector;
