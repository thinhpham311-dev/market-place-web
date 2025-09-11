"use client";
import * as React from "react";
import {
    Card,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import BreadcrumbItem from "./BreadcrumbItem";


interface SpuBreadcrumbProps {
    breadcrumbs: {
        label: string;
        value: string | React.ReactNode
    }[];
}

export default function ProBreadcrumb({ breadcrumbs }: SpuBreadcrumbProps) {
    if (!breadcrumbs || breadcrumbs.length === 0) {
        return (
            <CardContent className="p-3">
                <CardDescription>No specifications available</CardDescription>
            </CardContent>
        );
    }
    return (
        <Card className=" rounded-none">
            <CardContent className="p-0" >
                {breadcrumbs.map((breadcrumb, index) => (
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
