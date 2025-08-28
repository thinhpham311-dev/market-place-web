"use client";
import * as React from "react";

// ui
import {
    Card
} from "@/components/ui";

const ProQuantitySelectorWrapper = ({ children }: { children: React.ReactNode }) => {

    return (
        <Card className="border-none shadow-none">
            <div className="grid grid-cols-12 items-center">
                {children}
            </div>
        </Card>
    );
}

export default ProQuantitySelectorWrapper
