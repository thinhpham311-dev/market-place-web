"use client";
import * as React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
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
            <Card className="border-none shadow-none rounded-none">
                <CardContent className="p-3 grid grid-cols-5 ">
                    <CardTitle className="text-md col-span-2">{label}</CardTitle>
                    <CardDescription className="col-span-3">{value} </CardDescription>
                </CardContent>
            </Card>
            {hasSeparator && <Separator />}
        </>
    );
}
