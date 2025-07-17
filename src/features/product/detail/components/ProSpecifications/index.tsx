"use client";
import * as React from "react";
import {
    Card,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import ProSpecificationItem from "./ProSpecificationItem";

interface ProSpecificationsProps {
    specs: { label: string; value: string }[];
}

export default function ProSpecifications({ specs }: ProSpecificationsProps) {
    return (
        <Card>
            <CardTitle className="bg-sidebar-foreground text-background p-3">
                Product Specifications
            </CardTitle>

            {specs.map((spec, index) => (
                <CardContent className="p-0" key={index}>
                    <ProSpecificationItem
                        label={spec.label}
                        value={spec.value}
                        hasSeparator={index < specs.length - 1}
                    />
                </CardContent>
            ))}
        </Card>
    );
}
