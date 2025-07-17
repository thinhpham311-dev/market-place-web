"use client";
import * as React from "react";
import { CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ProSpecificationItemProps {
    label: string;
    value: string;
    hasSeparator?: boolean;
}

export default function ProSpecificationItem({
    label,
    value,
    hasSeparator = true,
}: ProSpecificationItemProps) {
    return (
        <>
            <CardDescription className="grid grid-cols-2 px-3">
                <strong className="col-span-1">{label}</strong>
                <span className="col-span-1">{value}</span>
            </CardDescription>
            {hasSeparator && <Separator />}
        </>
    );
}
