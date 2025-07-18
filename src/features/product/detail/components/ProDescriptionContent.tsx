"use client";
import * as React from "react";
import {
    Card,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

interface ProductDescriptionContentProps {
    description?: string | React.ReactElement;
}

export default function ProDescriptionContent({
    description,
}: ProductDescriptionContentProps) {
    let content: React.ReactElement;

    if (!description) {
        content = <CardDescription>No product details available</CardDescription>;
    } else if (typeof description === "string") {
        content = (
            <CardDescription
                dangerouslySetInnerHTML={{ __html: description }}
            />
        );
    } else {
        content = <CardDescription>{description}</CardDescription>;
    }

    return (
        <Card>
            <CardContent className="p-0">
                <CardTitle className="bg-sidebar-foreground text-background p-3">
                    Product Description
                </CardTitle>
                {content}
            </CardContent>
        </Card>
    );
}
