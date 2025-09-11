"use client";
import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface BreadcrumbItemProps {
    label: string;
    value: string | React.ReactNode;
    hasSeparator?: boolean;
}

export default function BreadcrumbItem({
    label,
    value,
}: BreadcrumbItemProps) {
    return (
        <>
            <Card layout="horizontal" className="border-none shadow-none rounded-none">
                {label && (<CardHeader className="p-3">
                    {label}
                </CardHeader>)}
                <CardContent className="p-3">
                    {value}
                </CardContent>
            </Card>
        </>
    );
}
