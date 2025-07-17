"use client";
import * as React from "react";
import { Card, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ProSpecificationsProps {
    specs: { label: string; value: string }[];
}

const ProSpecifications = ({
    specs,
}: ProSpecificationsProps) => {
    if (specs.length > 0) {
        return (
            <CardContent className="p-3">
                <CardDescription>No specifications available</CardDescription>
            </CardContent>
        )
    }

    return (
        <Card>
            <CardTitle className="bg-sidebar-foreground text-background p-3">
                Product Specifications
            </CardTitle>

            {specs?.map((spec, index) => (
                <CardContent className="p-0" key={index}>
                    <CardDescription className="grid grid-cols-2 px-3">
                        <strong className="col-span-1">{spec.label}</strong>
                        <span className="col-span-1">{spec.value}</span>
                    </CardDescription>
                    {index < specs.length - 1 && <Separator />}
                </CardContent>
            ))}
        </Card>
    );
}

export default ProSpecifications