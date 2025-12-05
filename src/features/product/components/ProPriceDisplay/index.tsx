"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

import { useSpuContext } from "@/features/spu/hooks";

import LoadingSkeleton from "./Loading";
import NotFound from "./NotFound";
import ProSkuPriceDisplay from "./ProSkuPriceDisplay";

export default function ProPriceDisplay() {
    const { spu, loading: spuLoading, error: spuError } = useSpuContext();

    const hasNoData = !spu || Object.keys(spu).length === 0;

    if (spuLoading && hasNoData) {
        return <LoadingSkeleton />;
    }

    if (!spuLoading && hasNoData && spuError) {
        return <NotFound message={spuError || "Something went wrong."} />;
    }

    if (!spuLoading && hasNoData) {
        return <NotFound />;
    }

    return (
        <Card className="border-none shadow-none rounded-none bg-sidebar-primary-foreground">
            <CardContent className="p-3 flex flex-col gap-1">
                <ProSkuPriceDisplay spu={spu} />
            </CardContent>
        </Card>
    );
}
