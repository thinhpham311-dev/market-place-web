"use client";

import * as React from "react";
import {
    BreadcrumbItem,
    BreadcrumbPage,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadcrumbContext } from "../hooks/useBreadcrumbContext";

export default function BreadcrumbItemsList() {
    const { items, getLabel, getHref, isDisableLast = false } = useBreadcrumbContext();
    if (!items) return null;
    if (!Array.isArray(items)) {
        return (
            <BreadcrumbItem>
                <BreadcrumbPage>{getLabel(items)}</BreadcrumbPage>
            </BreadcrumbItem>
        );
    }
    if (Array.isArray(items)) {
        return (
            <>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <React.Fragment key={index}>
                            {isLast && isDisableLast ? (
                                <BreadcrumbPage>{getLabel(item)}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={getHref(item)}>
                                        {getLabel(item)}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            )}

                            {!isLast && <BreadcrumbSeparator />}
                        </React.Fragment>
                    );
                })}
            </>
        );
    }

}
