"use client";
import * as React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ProSpecificationItemProps {
    label: string;
    value: string | React.ReactNode;
    hasSeparator?: boolean;
}

export default function ProSpecificationItem({
    label,
    value,
    hasSeparator = true,
}: ProSpecificationItemProps) {
    return (
        <>
            <Card className="border-none shadow-none rounded-none grid grid-cols-5 ">
                <CardHeader className="p-3 col-span-2">
                    <CardTitle className="text-md ">{label}</CardTitle>
                </CardHeader>
                <CardContent className="p-3 col-span-3">
                    {value}
                </CardContent>
            </Card>
            {hasSeparator && <Separator />}
        </>
    );
}
