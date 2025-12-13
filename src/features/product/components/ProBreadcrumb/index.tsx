"use client";
import * as React from "react";
import {
    Card,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import BreadcrumbItem from "./BreadcrumbItem";
import { useSpuContext } from "@/features/spu/hooks";
import { breadcrumbs } from "@/features/product/constants"
import LoadingSkeleton from "./LoadingSkeleton"
import NotFound from "./NotFound"

export default function ProBreadcrumb() {
    const { spu, loading, error } = useSpuContext();
    const hasNoData = !spu || Object.keys(spu).length === 0;
    if (loading && hasNoData) {
        return <LoadingSkeleton />;
    }

    if (!loading && hasNoData && error) {
        return <NotFound message={error || "Something went wrong."} />;
    }

    if (!loading && hasNoData) {
        return <NotFound />;
    }
    const breadcrumbsList = breadcrumbs(spu)
    if (!breadcrumbsList || breadcrumbsList.length === 0) {
        return (
            <CardContent className="p-3">
                <CardDescription>No specifications available</CardDescription>
            </CardContent>
        );
    }
    return (
        <Card className=" rounded-none">
            <CardContent className="p-0" >
                {breadcrumbsList.map((breadcrumb, index) => (
                    <BreadcrumbItem
                        key={index}
                        label={breadcrumb.label}
                        value={breadcrumb.value}
                        hasSeparator={index < breadcrumbs.length - 1}
                    />
                ))}
            </CardContent>
        </Card>
    );
}
