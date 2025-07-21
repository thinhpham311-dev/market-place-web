"use client";

import * as React from "react";
import {
    Card,
    CardTitle,
    CardContent,
    CardDescription
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ProSpecificationsProps {
    specs: { label: string; value: string | React.ReactNode }[];
}

const ProSpecifications = ({ specs }: ProSpecificationsProps) => {
    if (!specs || specs.length === 0) {
        return (
            <CardContent className="p-3">
                <CardDescription>No specifications available</CardDescription>
            </CardContent>
        );
    }

    return (
        <Card className="sticky top-[60px] rounded-none">
            <CardTitle className="bg-sidebar-foreground text-background p-3">
                Product Specifications
            </CardTitle>

            {specs.map((spec, index) => (
                <>
                    <CardContent className="grid grid-cols-5 items-center p-3" key={index}>
                        <CardTitle className="col-span-2 text-md">{spec.label}</CardTitle>
                        <CardDescription className="col-span-3">
                            {spec.value}
                        </CardDescription>
                    </CardContent>
                    <CardContent className="p-0 col-span-5">
                        {index < specs.length - 1 && <Separator />}
                    </CardContent>
                </>
            ))}
        </Card>
    );
};

export default ProSpecifications;
