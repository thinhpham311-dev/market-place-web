"use client";
import * as React from "react";
import {
    Card,
    CardTitle,
    CardDescription,
    CardContent,
    CardHeader,
} from "@/components/ui";

interface IProductDescriptionContentProps {
    description?: string | React.ReactElement;
}


export default function ProDescriptionContent({ description }: IProductDescriptionContentProps) {

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
        <Card className="rounded-none">
            <CardHeader className="bg-sidebar-foreground  p-3">
                <CardTitle className="text-background">
                    Product Description
                </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
                {content}
            </CardContent>
        </Card>
    );
}
